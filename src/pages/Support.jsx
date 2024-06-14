import React, { useState } from "react";
import './Support.css'; // Importiere benutzerdefinierte Styles für Support
import SupportTickets from './SupportTickets'; // Importiere die SupportTickets Komponente

function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError(false);

    // Formularvalidierung
    if (!formData.name || !formData.email || !formData.message) {
      setFormError(true);
      setLoading(false);
      return;
    }

    // E-Mail-Validierung
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError(true);
      setLoading(false);
      return;
    }

    try {
      // Hier kann die Logik für das Senden des Formulars an den Server eingefügt werden
      console.log(formData);
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Fehler beim Senden des Formulars:', error);
      setFormError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Support</title>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="./assets/style/style.css" />
      <nav className="navbar navbar-expand-lg custom-navbar">
        {/* Hier kommt deine Navbar */}
      </nav>
      <section id="support">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="support-form">
                <h3 className="contact-us">Kontaktieren Sie uns</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Nachricht
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary form-button" disabled={loading}>
                    {loading ? 'Senden...' : 'Senden'}
                  </button>
                  {formError && (
                    <div className="alert alert-danger mt-3" role="alert">
                      Bitte überprüfen Sie Ihre Eingaben und versuchen Sie es erneut.
                    </div>
                  )}
                  {formSubmitted && (
                    <div className="alert alert-success mt-3" role="alert">
                      Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.
                    </div>
                  )}
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <SupportTickets /> {/* Hier wird die SupportTickets-Komponente gerendert */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Support;
