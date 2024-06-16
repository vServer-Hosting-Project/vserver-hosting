import React from 'react';

function Support() {
  const faqs = [
    {
      question: 'Wie kann ich meinen vServer konfigurieren?',
      answer: 'Sie können Ihren vServer über unseren Konfigurator auf der Website anpassen. Wählen Sie einfach die gewünschten Optionen aus und bestellen Sie den Server.'
    },
    {
      question: 'Welche Betriebssysteme werden unterstützt?',
      answer: 'Wir unterstützen eine Vielzahl von Betriebssystemen, darunter verschiedene Versionen von Windows und Linux.'
    },
    {
      question: 'Wie erreiche ich den Kundensupport?',
      answer: 'Sie können uns über das Kontaktformular auf dieser Seite erreichen oder unseren Live-Chat nutzen.'
    }
  ];

  return (
    <div className="container">
      <header className="header">
        <h3>Support</h3>
      </header>
      <section id="support">
        <div className="row">
          <div className="col-md-6">
            <div className="support-form">
              <h3 className="contact-us">Kontaktieren Sie uns</h3>
              <hr />
              <form>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Nachricht</label>
                  <textarea className="form-control" id="message" rows={3} />
                </div>
                <div className="button-container">
                  <button type="submit" className="btn btn-primary form-button">Senden</button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <div className="faq-container">
              <h3>Häufig gestellte Fragen (FAQs)</h3>
              <hr />
              {faqs.map((faq, index) => (
                <div className="faq" key={index}>
                  <h5>{faq.question}</h5>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
            <br />
            <div className="chatbot-container">
              <h3 className="chatbot-title">Chatbot</h3>
              <div className="chatbot">
                {/* Chatbot content here */}
              </div>
              <hr />
              <div className="button-container">
                <button className="btn btn-primary chat-button">Live-Chat öffnen</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Support;
