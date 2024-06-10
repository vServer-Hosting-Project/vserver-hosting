import React from "react"; 

function Warenkorb() {
    return(
        <>
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
                  href="./Warenkorb"
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
        <main>
          <section id="cart">
            <div className="warenkorbcontainer">
              <div className="box">
                <h3 className="Ihr-Warenkorb">Ihr Warenkorb</h3>
                {/* The cart items would be dynamically loaded here */}
                <div id="cartItems" />
              </div>
            </div>
          </section>
        </main>
      </>
      
    )
    
}

export default Warenkorb;