import { NavLink } from "react-router-dom";

export default function NavBar({}) {

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/maps">Map</NavLink>
        </li>

        <li>
          <NavLink to="/booking">Appointment Booking</NavLink>
        </li>

      </ul>
    </nav>
  );
}
