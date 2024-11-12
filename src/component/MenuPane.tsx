import { ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Dropdown from "rsuite/Dropdown";
import "rsuite/dist/rsuite.min.css";
function myFunction() {
  navigator.clipboard.writeText("PunggolPunggol@3");
}

const MenuPane = () => {
  const style = {};

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light">
        <div className="container-fluid menu-bar-container">
          <Link className="nav-link active" to="/home">
            <b>Volvo</b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/notes"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/ado">
                  ADO
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/notes">
                  Notes
                </Link>
              </li>
              <li className="nav-item">
                <a className="dropdown-item" href="#" onClick={myFunction}>
                  Secret
                </a>
              </li>
            </ul>
            <form className="d-flex">
              <a className="" href="/balance"></a>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success"
                style={style}
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MenuPane;
