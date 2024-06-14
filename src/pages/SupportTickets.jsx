import React, { useState } from "react";
import './SupportTicket.css'; // Importiere benutzerdefinierte Styles für SupportTicket

function SupportTicket({ ticket, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: ticket.title,
    description: ticket.description,
  });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ id: ticket.id, ...formData });
    setEditing(false);
  };

  return (
    <div className="support-ticket">
      {editing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <button type="submit">Speichern</button>
        </form>
      ) : (
        <>
          <h3>{ticket.title}</h3>
          <p>{ticket.description}</p>
          <button onClick={handleEdit}>Bearbeiten</button>
          <button onClick={() => onDelete(ticket.id)}>Löschen</button>
        </>
      )}
    </div>
  );
}

export default SupportTicket;
