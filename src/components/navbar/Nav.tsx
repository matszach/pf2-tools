import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { AppRoutes } from "../../const/routes.const";

function AppNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-secondary">
      <Container>
        <Navbar.Brand href={AppRoutes.HOME}>PF2 Tools</Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href={AppRoutes.HOME}>Home</Nav.Link>
            <Nav.Link href={AppRoutes.SPELLS}>Spells</Nav.Link>
            <Nav.Link href={AppRoutes.EQUIPMENT}>Equipment</Nav.Link>
            <NavDropdown title="Random">
              <NavDropdown.Item href={AppRoutes.RANDOM.SPELLS}>Spells</NavDropdown.Item>
              <NavDropdown.Item href={AppRoutes.RANDOM.LOOT}>Loot</NavDropdown.Item>
              <NavDropdown.Item href={AppRoutes.RANDOM.SHOP}>Shop</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar;