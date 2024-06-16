import React from 'react';

function Warenkorb({ orders }) {
  return (
    <div className="container">
      <header className="header">
        <h3>Warenkorb</h3>
      </header>
      <div className="cart-container">
        {orders.length === 0 ? (
          <p>Ihr Warenkorb ist leer</p>
        ) : (
          orders.map((order, index) => (
            <div className="order-item" key={index}>
              <h4>Bestellung {index + 1}</h4>
              <p>Instanztyp: {order.instanceType}</p>
              <p>Betriebssystem: {order.os}</p>
              <p>Version: {order.osVersion}</p>
              <p>Speicher: {order.storage} GB</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Warenkorb;
