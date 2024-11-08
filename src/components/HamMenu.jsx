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
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-3">
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
      <Offcanvas show={showMenu} onHide={handleCloseMenu} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {/* Logo en el encabezado del Offcanvas */}
            <div className="logo-container d-flex align-items-center">
              <img
                src={logo}
                alt="Logo Meteorológico"
                className="logo-img me-2"
              />
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
                className="nav-link"
                onClick={handleCloseMenu}
              >
                Información del Clima Actual
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/lunar-phase"
                className="nav-link"
                onClick={handleCloseMenu}
              >
                Fase Lunar Actual
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/weekly-forecast"
                className="nav-link"
                onClick={handleCloseMenu}
              >
                Pronóstico Semanal
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/favorites"
                className="nav-link"
                onClick={handleCloseMenu}
              >
                Favoritos
              </Link>
            </Nav.Item>
            <Nav.Item>
              <button className="btn btn-danger mt-3" onClick={onLogout}>
                Cerrar Sesión
              </button>
            </Nav.Item>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default HamburgerMenu;
