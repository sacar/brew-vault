import { useEffect, useRef, useState } from "react";
import "./App.css";
import { fetchBeers } from "./api";
import { Beer } from "./types/beer";
import { Col, Row, Spinner, Container, Button, Alert } from "react-bootstrap";
import BeerList from "./components/beerList";
import BeerTabs from "./components/beerTabs";
import { ChevronDown } from "react-bootstrap-icons";
import MyBeer from "./components/myBeer";

function App() {
  const [beerData, setBeerData] = useState<Beer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isError, setIsError] = useState<boolean>(false);
  const [tabKey, setTabKey] = useState<string>("allBeers");

  // useRef to track initial render
  const initialRender = useRef(true);
  const updatedBeerData = (newBeerData: Beer[]) => {
    return [...beerData, ...newBeerData]
  }

  useEffect(() => {
    // Function to fetch beer data from the API
    const fetchData = async (p: number) => {
      // Set loading to true before API call
      setIsLoading(true);
      try {
        const data = await fetchBeers(10, p);
        const updatedData = updatedBeerData(data);
        setBeerData(updatedData);
      } catch (error) {
        setIsError(true);
      } finally {
        // Set loading to false after API call
        setIsLoading(false);
      }
    };

    // Check if it's the initial render or a subsequent load more action
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      // If it's not the initial render, fetch data based on the updated page number
      fetchData(page);
    }
  }, [page]);

  const renderTabContent = () => {
    switch (tabKey) {
      case "allBeers":
        return (
          <>
            <BeerList beerList={beerData} />
            <div className="d-flex justify-content-center align-items-center p-4">
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
        );
      case "myBeers":
        return <MyBeer />;
      // Add more cases for other tab keys if needed

      default:
        return null; // Default case or fallback
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="d-flex w-100 justify-content-center align-items-center">
          <Spinner size="sm" animation="border" variant="primary" />
          <span className="p-3">Loading...</span>
        </div>
      );
    } else if (isError && tabKey === "allBeers") {
      return (
        <div>
          <Alert variant="danger">
            Sorry we could not load the beers for you. Please try again later.
          </Alert>
        </div>
      );
    } else {
      return renderTabContent();
    }
  };

  return (
    <>
      <Container className="vh-100">
        <Col className="h-100">
          <Row className="mb-2">
            <BeerTabs tabKey={tabKey} setTabKey={setTabKey} />
          </Row>
          <Row className="h-100">{renderContent()}</Row>
        </Col>
      </Container>
    </>
  );
}

export default App;
