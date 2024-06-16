import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { AppRoutes, getNavLink } from "../../const/routes.const";
import { Link } from "react-router-dom";

function AppNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-secondary">
      <Container>
        <Navbar.Brand href={getNavLink(AppRoutes.HOME)}>PF2 Tools</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href={getNavLink(AppRoutes.HOME)}>Home</Nav.Link>
            <Nav.Link href={getNavLink(AppRoutes.SPELLS)}>Spells</Nav.Link>
            <Nav.Link href={getNavLink(AppRoutes.EQUIPMENT)}>Equipment</Nav.Link>
            <NavDropdown title="Random">
              <NavDropdown.Item href={getNavLink(AppRoutes.RANDOM.SPELLS)}>Spells</NavDropdown.Item>
              <NavDropdown.Item href={getNavLink(AppRoutes.RANDOM.LOOT)}>Loot</NavDropdown.Item>
              <NavDropdown.Item href={getNavLink(AppRoutes.RANDOM.SHOP)}>Shop</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar;