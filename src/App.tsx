import { useEffect, useState } from "react";
import "./App.css";
import { fetchBeers } from "./api";
import { Beer } from "./types/beer";
import { Col, Row, Spinner, Container, Button, Alert } from "react-bootstrap";
import BeerList from "./components/beerList";
import BeerTabs from "./components/beerTabs";
import { ChevronDown } from "react-bootstrap-icons";

function App() {
  const [beerData, setBeerData] = useState<Beer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isError, setIsError] = useState<boolean>(false);
  const [tabKey, setTabKey] = useState<string>('allBeers');

  useEffect(() => {
    // Function to fetch beer data from the API
    const fetchData = async (p: number) => {
      // Set loading to true before API call
      setIsLoading(true);
      try {
        const data = await fetchBeers(10, p);
        console.log(data);
        setBeerData(data);
      } catch (error) {
        setIsError(true);
      } finally {
        // Set loading to false after API call
        setIsLoading(false);
      }
    };

    // Call the function to fetch beer data when the component mounts
    fetchData(page);
  }, [page]);

  return (
    <>
      <h1>Beer App</h1>
      <Container>
        <Col>
          <Row className="mb-2">
            <BeerTabs  tabKey={tabKey} setTabKey={setTabKey} />
          </Row>
          <Row>
            {isLoading ? (
              <div className="d-flex w-100 justify-content-center align-items-center">
                <Spinner size="sm" animation="border" variant="primary" />
                <span className="p-3">Loading...</span>
              </div>
            ) : isError ? (
              <Alert variant="danger">
                Sorry we could not load the beers for you. Please try again
                later.
              </Alert>
            ) : (
              <>
                <BeerList beerList={beerData} />
                <div className="d-flex justify-content-center">
                  <Button
                    variant="primary"
                    onClick={() => {
                      setPage(page + 1);
                    }}
                  >
                    Load More <ChevronDown />
                  </Button>
                </div>
              </>
            )}
          </Row>
        </Col>
      </Container>
    </>
  );
}

export default App;
