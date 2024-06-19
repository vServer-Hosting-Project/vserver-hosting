const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { exec } = require('child_process');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.post('/api/order', (req, res) => {
  const { instanceType, os, osVersion, storage, fileName } = req.body;

  const orderId = uuidv4();
  const resourceName = `vServer_${orderId.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 16)}`;
  const orderDir = path.join(__dirname, 'bestellungen', orderId);

  const terraformConfig = `
provider "aws" {
  region     = "eu-central-1"
  access_key = "###"
  secret_key = "###"
  token      = "###"
  }

resource "aws_instance" "${resourceName}" {
  ami           = "${getAmiId(os, osVersion)}"
  instance_type = "${instanceType}"

  root_block_device {
    volume_size = ${storage}
  }

  tags = {
    Name = "${resourceName}"
  }
}
`;

  if (!fs.existsSync(orderDir)) {
    fs.mkdirSync(orderDir, { recursive: true });
  }

  const filePath = path.join(orderDir, `${fileName}`);

  fs.writeFile(filePath, terraformConfig, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      res.status(500).send('Error writing file');
    } else {
      exec(`cd ${orderDir} && terraform init && terraform apply -auto-approve`, (err, stdout, stderr) => {
        if (err) {
          console.error('Error executing Terraform:', err);
          console.error('stderr:', stderr);
          res.status(500).send(`Error executing Terraform: ${stderr}`);
        } else {
          console.log(stdout);
          res.send('Terraform file created and executed successfully');
        }
      });
    }
  });
});

const getAmiId = (os, osVersion) => {
  const amiMap = {
    'Linux': {
      'Ubuntu': 'ami-01e444924a2233b07', // Ubuntu 20.04 LTS in eu-central-1
      'Red Hat Enterprise Linux': 'ami-007c3072df8eb6584', // Red Hat Enterprise Linux 8 in eu-central-1
      'Debian': 'ami-042e6fdb154c830c5', // Debian 10 in eu-central-1
      'Suse': 'ami-0a8d4ba68a33e8421', // SUSE Linux Enterprise Server 15 SP5 in eu-central-1
      'Amazon Linux': 'ami-00cf59bc9978eb266' // Amazon Linux 2 in eu-central-1
    },
    'Windows': {
      'Windows Server 2016': 'ami-00fca5fcad9817075', // Windows Server 2016 in eu-central-1
      'Windows Server 2019': 'ami-0e538cb1c15bd97e4', // Windows Server 2019 in eu-central-1
      'Windows Server 2022': 'ami-034de56da2366e342' // Windows Server 2022 in eu-central-1
    }
  };

  return amiMap[os][osVersion] || 'ami-01e444924a2233b07'; // Standardwert, falls keine passende AMI-ID gefunden wird
};

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

import express from "express";
import fetch from "node-fetch";
import "dotenv/config";
import path from "path";

const { AdwJzCiFVqAx0VBAL7gMcEsht0PNGhYv8SclCeC9WImGLKYmMbIK, KCnm0cf0AiL2RUAnhA0kmX3uotT, EMja0zAtWfgZc9t4L7zhc5oe6d-RFua7snByZCnVdxGkNpFJlyXUUEZyWwq9llXJvcR-b_L2pWAmJANO, PORT = 8888 } = process.env;
  const base = "https://api-m.sandbox.paypal.com";
  const paypal = express();

// host static files
app.use(express.static("client"));

// parse post params sent in body in json format
app.use(express.json());

/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
const createOrder = async (cart) => {
  // use the cart information passed from the front-end to calculate the purchase unit details
  console.log(
    "shopping cart information passed from the frontend createOrder() callback:",
    cart
  );

  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;

  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "100",
        },
      },
    ],
  };
  

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only).
      // Documentation: https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

// createOrder route
app.post("/api/orders", async (req, res) => {
  try {
    // use the cart information passed from the front-end to calculate the order amount detals
    const { cart } = req.body;
    const { jsonResponse, httpStatusCode } = await createOrder(cart);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
}); 
/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (orderID) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only).
      // Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
  });

  return handleResponse(response);
};

// captureOrder route
app.post("/api/orders/:orderID/capture", async (req, res) => {
  try {
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
}); // serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.resolve("./checkout.html"));
});

app.listen(PORT, () => {
  console.log(`Node server listening at http://localhost:${PORT}/`);
}); 


