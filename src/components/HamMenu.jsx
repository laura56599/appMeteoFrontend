import React, { useState } from 'react';
import { Navbar, Nav, Button, Offcanvas } from 'react-bootstrap';


function HamburgerMenu({ onLogout }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleCloseMenu = () => setShowMenu(false);
  const handleShowMenu = () => setShowMenu(true);

  return (
    <>
      <Navbar bg="primary" variant="dark" expand={false}>
        <Navbar.Brand href="#">Dashboard Meteorológico</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShowMenu} />
      </Navbar>
      <Offcanvas show={showMenu} onHide={handleCloseMenu} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="#weather">Información del Clima Actual</Nav.Link>
            <Nav.Link href="#lunar">Fase Lunar Actual</Nav.Link>
            <Nav.Link href="#forecast">Pronóstico Semanal</Nav.Link>
            <Button
              variant="danger"
              className="mt-3"
              onClick={() => {
                onLogout();
                handleCloseMenu();
              }}
            >
              Cerrar Sesión
            </Button>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default HamburgerMenu;
