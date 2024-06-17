// server.js

const express = require('express');
<<<<<<< Updated upstream
const mongoose = require('mongoose');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
=======
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
require('dotenv').config();
>>>>>>> Stashed changes

const app = express();
const port = process.env.PORT || 5000;

<<<<<<< Updated upstream
// MongoDB Verbindung einrichten
mongoose.connect('mongodb://localhost:27017/ticket_system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Ticket Schema definieren
const ticketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['open', 'in_progress', 'closed'], default: 'open' }
}, { timestamps: true });

const Ticket = mongoose.model('Ticket', ticketSchema);

=======
// Middleware
>>>>>>> Stashed changes
app.use(express.json());

<<<<<<< Updated upstream
// API Endpunkte für Tickets
app.get('/api/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/tickets', async (req, res) => {
  const ticket = new Ticket({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message
  });

  try {
    const newTicket = await ticket.save();
    res.status(201).json(newTicket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Beispiel für bestehende Funktionalität (Terraform)
app.post('/api/order', (req, res) => {
=======
// MongoDB-Verbindung
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Definiere ein Schema und Modell für die Bestellungen
const orderSchema = new mongoose.Schema({
  instanceType: String,
  os: String,
  osVersion: String,
  storage: Number,
  fileName: String,
  orderId: String,
  resourceName: String,
});

const Order = mongoose.model('Order', orderSchema);

// Route zum Erstellen einer Bestellung
app.post('/api/order', async (req, res) => {
>>>>>>> Stashed changes
  const { instanceType, os, osVersion, storage, fileName } = req.body;

  const orderId = uuidv4();
  const resourceName = `vServer_${orderId.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 16)}`;
  const orderDir = path.join(__dirname, 'orders', orderId);

  const terraformConfig = `
<<<<<<< Updated upstream
  provider "aws" {
    region     = "eu-central-1"
    access_key = "###"
    secret_key = "###"
    token      = "###"
  }
=======
provider "aws" {
  region     = "eu-central-1"
  access_key = "${process.env.AWS_ACCESS_KEY_ID}"
  secret_key = "${process.env.AWS_SECRET_ACCESS_KEY}"
  token      = "${process.env.AWS_SESSION_TOKEN || ''}"
}
>>>>>>> Stashed changes

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

  try {
    await fs.promises.writeFile(filePath, terraformConfig);
    exec(`cd ${orderDir} && terraform init && terraform apply -auto-approve`, async (err, stdout, stderr) => {
      if (err) {
        console.error('Error executing Terraform:', err);
        console.error('stderr:', stderr);
        return res.status(500).send(`Error executing Terraform: ${stderr}`);
      } else {
        console.log(stdout);

        // Speichere die Bestellung in der Datenbank
        const newOrder = new Order({
          instanceType,
          os,
          osVersion,
          storage,
          fileName,
          orderId,
          resourceName
        });

        await newOrder.save();

        return res.send('Terraform file created and executed successfully, and order saved to database');
      }
    });
  } catch (err) {
    console.error('Error writing file:', err);
    res.status(500).send('Error writing file');
  }
});

// Funktion zur Abrufung der AMI-ID basierend auf OS und Version
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

  return amiMap[os]?.[osVersion] || 'ami-01e444924a2233b07'; // Standardwert, falls keine passende AMI-ID gefunden wird
};

// Starte den Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
