import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/abwicklung">Abwicklung</Link></li>
      <li><Link to="/bestell">Bestell</Link></li>
      <li><Link to="/support">Support</Link></li>
      <li><Link to="/warenkorb">Warenkorb</Link></li>
      <li><Link to="/support-ticket">Support Ticket</Link></li>
    </ul>
  </nav>
);

export default Navigation;
