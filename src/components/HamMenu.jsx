import React, { useState } from "react";
import { Navbar, Nav, Button, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/wapplogo.png";

function HamburgerMenu({ onLogout }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleCloseMenu = () => setShowMenu(false);
  const handleShowMenu = () => setShowMenu(true);

  return (
    <>
      {/* Botón para abrir el menú hamburguesa */}
      <Navbar bg="primary" variant="dark" expand={false} className="mb-3">
        <Navbar.Brand href="#">
          {/* Logo en el Navbar */}
          <img
            src={logo}
            alt="Logo Meteorológico"
            className="d-inline-block align-top logo-img me-2"
            width="30"
            height="30"
          />
          Weather App
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          onClick={handleShowMenu}
        />
      </Navbar>

      {/* Menú Hamburguesa con Offcanvas */}
      <Offcanvas
        show={showMenu}
        onHide={handleCloseMenu}
        placement="end"
        className="bg-primary text-white"
        style={{ width: "250px", padding: "0" }}
      >
        <Offcanvas.Header closeButton className="border-bottom border-light">
          <Offcanvas.Title>
            {/* Logo en el encabezado del Offcanvas */}
            <div className="d-flex align-items-center">
              <img src={logo} alt="Logo Meteorológico" width="30" height="30" className="me-2" />
              <span>Weather App</span>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {/* Enlaces del menú */}
            <Nav.Item>
              <Link
                to="/weather"
                className="nav-link text-white"
                onClick={handleCloseMenu}
              >
                Información del Clima Actual
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/lunar-phase"
                className="nav-link text-white"
                onClick={handleCloseMenu}
              >
                Fase Lunar Actual
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/weekly-forecast"
                className="nav-link text-white"
                onClick={handleCloseMenu}
              >
                Pronóstico Semanal
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/favorites"
                className="nav-link text-white"
                onClick={handleCloseMenu}
              >
                Favoritos
              </Link>
            </Nav.Item>
            <Nav.Item className="mt-3">
              <Button variant="danger" onClick={onLogout} block>
                Cerrar Sesión
              </Button>
            </Nav.Item>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default HamburgerMenu;
