import { NavLink } from 'react-router-dom'
export default function Tabs() {
  return (
    <nav className="tabs">
        <NavLink to="/" className={({ isActive }) => (isActive ? "btn active" : "btn")}>
        TODAY
      </NavLink>

      <NavLink to="/Hourly" className={({ isActive }) => (isActive ? "btn active" : "btn")}>
        HOURLY
      </NavLink>

      <NavLink to="/daily" className={({ isActive }) => (isActive ? "btn active" : "btn")}>
        DAILY
      </NavLink>

      <button>RADAR</button>
      <button>MINUTE CAST</button>
      <button>MONTHLY</button>
      <button>AIR QUALITY</button>
      <button>HEALTH ACTIVITIES</button>
    </nav>

    
  );
}

