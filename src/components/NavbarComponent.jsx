
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NavbarComponent() {

  const nav = useNavigate()

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#">LOCAPP</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="mr-auto">
            <Nav.Link onClick={()=>nav("/")}>Home</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Services" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={()=>nav("/fournisseurs")}>Fournisseurs</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>nav("/utilisateurs")}>Utilisateurs</NavDropdown.Item>
              <NavDropdown.Item >Demandes</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item >Separated link</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link >A propos</Nav.Link>
            <Nav.Link >Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Votre contenu ici */}
    </div>
  );
}

export default NavbarComponent;
