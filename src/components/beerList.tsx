import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import BeerCard from "./beerCard";
import { Beer } from "../types/beer";

interface BeerListProps {
  beerList: Beer[];
}
const BeerList: React.FC<BeerListProps> = ({ beerList }) => {
  return (
    <Container>
      <Row xs={1} md={2} lg={3} className="g-4">
        {beerList.map((beer: Beer) => (
            <Col key={beer.id}>
          <BeerCard  beer={beer} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BeerList;
