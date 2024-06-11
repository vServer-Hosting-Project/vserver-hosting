import React from 'react'  

function Home() {
    return (
        <div>
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
  <header>
    <h3>vServer nach Ihren Wünschen</h3>
  </header>
  <section id="servers">
    <div className="container">
      <h3>Unsere vServer</h3>
      <p>
        Sind anspruchsvolle Business-Anwendungen erfordern dedizierte,
        garantierte Rechenleistung.
      </p>
      <p>
        Aus diesem Grund weißen wir Ihrem Virtual Dedicated Server alle
        Ressourcen,{" "}
      </p>
      wie RAM, CPU und Enterprise SSD, exklusiv zu.
      <p />
      Sie betreiben einen Online-Shop, eine Intranet-Lösung, stehen vor einem
      kleinen oder einem <p />
      komplexen Projekt? Unser Cloud VDS wächst jederzeit mit Ihren
      Anforderungen.
    </div>
    <section id="info">
      <div className="info-container">
        <img src="./assets/images/infos.jpg" alt="infos" className="image" />
      </div>
      <div className="info-container2">
        <h3>Ihr vServer wartet bereits auf Sie...</h3>
        <p>Wie viel Leistung darf es sein?</p>
        <p>
          Nach der Buchung steht Ihr vServer innerhalb von nur 60 Minuten zur
          Verfügung**
        </p>
      </div>
      <section id="servers">
        <div className="server-container">
          <h3>vServer 1</h3>
          <p2>Betriebssystem:</p2> <span>Windows/Linux</span>
          <p />
          <p2>CPU:</p2> <span>1 CPU</span>
          <p />
          <p2>RAM:</p2> <span>2GB</span>
          <p />
          <p2>Speicher:</p2> <span>10GB (SSD)</span>
          <p />
          <p1>
            <span>9,99€ pro Monat</span>
          </p1>
        </div>
        <div className="server-container">
          <h3>vServer 2</h3>
          <p2>Betriebssystem:</p2> <span>Windows/Linux</span>
          <p />
          <p2>CPU:</p2> <span>2 CPUs</span>
          <p />
          <p2>RAM:</p2> <span>4GB</span>
          <p />
          <p2>Speicher:</p2> <span>20GB (SSD)</span>
          <p />
          <p1>
            <span>19,99€ pro Monat</span>
          </p1>
        </div>
        <div className="server-container">
          <h3>vServer 3</h3>
          <p2>Betriebssystem:</p2> <span>Windows/Linux</span>
          <p />
          <p2>CPU:</p2> <span>4 CPUs</span>
          <p />
          <p2>RAM:</p2> <span>8GB</span>
          <p />
          <p2>Speicher:</p2> <span>40GB (SSD)</span>
          <p />
          <p1>
            {" "}
            <span>26,99€ pro Monat</span>
          </p1>
        </div>
        <div className="server-container">
          <h3>vServer 4</h3>
          <p2>Betriebssystem:</p2> <span>Windows/Linux</span>
          <p />
          <p2>CPU:</p2> <span>8 CPUs</span>
          <p />
          <p2>RAM:</p2> <span>16GB</span>
          <p />
          <p2>Speicher:</p2> <span>80GB (SSD)</span>
          <p />
          <p1>
            <span>40,00€ pro Monat</span>
          </p1>
        </div>
      </section>
      <footer>
        <img
          src="./assets/images/betriebssysteme.jpg"
          alt="betriebssysteme"
          className="image"
        />
      </footer>
    </section>
  </section>
</>

        </div>
    )
    }

    export default Home