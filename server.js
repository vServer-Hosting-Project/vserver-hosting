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
      'Ubuntu 20.04 LTS': 'ami-01e444924a2233b07', // Ubuntu 20.04 LTS in eu-central-1
      'Red Hat Enterprise Linux 8': 'ami-007c3072df8eb6584', // Red Hat Enterprise Linux 8 in eu-central-1
      'Debian 10': 'ami-042e6fdb154c830c5', // Debian 10 in eu-central-1
      'CentOS 7': 'ami-0a4a70bd98c6d6442', // CentOS 7 in eu-central-1
      'AlmaLinux 8': 'ami-07d0cf3af28718ef8' // AlmaLinux 8 in eu-central-1
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
