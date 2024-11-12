import React from "react";
import { Container, Row, Col, Button, FormControl, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";

function Header({ onSearch, handleCurrentLocation }) {
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      onSearch(event.target.value);
    }
  };

  return (
    <Container fluid className="bg-primary py-3">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <InputGroup>
            <FormControl
              placeholder="Ingrese Ciudad"
              aria-label="Ingrese Ciudad"
              onKeyDown={handleSearch}
            />
            <Button variant="secondary" onClick={() => onSearch(document.querySelector("input").value)}>
              Buscar
            </Button>
            <Button variant="outline-light" onClick={handleCurrentLocation} className="ms-2">
              Ubicación Actual
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
}

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
  handleCurrentLocation: PropTypes.func.isRequired,
};

export default Header;
