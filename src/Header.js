import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
function Header() {
  let user = JSON.parse(localStorage.getItem('user-info'));
  const navigate = useNavigate();
  function logOut()
  {
    localStorage.clear();
    navigate("/register");
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto header_wrapper">
         { localStorage.getItem('user-info')?
          <>
            <Link to="/add">AddProduct</Link>
            <Link to="/update">UpdateProduct</Link>
          </>
          :
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>}
        </Nav>
       { localStorage.getItem('user-info')?
        <Nav>
          <NavDropdown title={user && user.name}>
            <NavDropdown.Item onClick={logOut}>
                  logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        :null}
      </Navbar>
    </div>
  );
}
export default Header;
