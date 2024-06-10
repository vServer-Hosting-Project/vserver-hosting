import React from "react"; 

function Support() {
    return(
        <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Support</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="../assets/style/style.css" />
        {/* Navbar start */}
        <nav className="navbar navbar-expand-lg custom-navbar">
          <a className="navbar-brand" href="./">
            <div className="logo-icon">
              <img src="./assets/images/firma.png" width={80} height={50} />
            </div>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  className="nav-link custom-link"
                  href="./Support"
                  id="support-link"
                >
                  Hilfe &amp; Support
                </a>
              </li>
              <li className="nav-item"></li>
              <li className="nav-item">
                <a
                  className="nav-link custom-link"
                  href="./warenkorb"
                  id="warenkorb-link"
                >
                  Warenkorb
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link custom-link"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {/* Navbar end */}
        <section id="support">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="support-form">
                  <h3 className="contact-us">Kontaktieren Sie uns</h3>
                  <form>
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input type="text" className="form-control" id="name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message" className="form-label">
                        Nachricht
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        rows={3}
                        defaultValue={""}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary form-button">
                      Senden
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-md-6">
                <div className="chatbot-container">
                  <h3 className="chatbot-title">Chatbot</h3>
                  <div className="chatbot">
                    {/* Hier wird der Chatbot platziert */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
      
    )
    
}

export default Support;