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
  