
import { Link, useNavigate } from "react-router-dom";
import './navbar.css'
const Navbar = () => {
  const navigate = useNavigate()
  function logoutFn () {
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <>
      <nav>
        <div className="nav_container">
          <div className="nav_wrapper">
            <div className="logo">
              <Link to="/">Blog</Link>
            </div>
            <ul>
              <li>
                <button onClick={logoutFn} >logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
