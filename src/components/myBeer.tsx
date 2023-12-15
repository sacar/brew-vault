import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import { Beer } from "../types/beer";
import BeerList from "./beerList";
import AddNewBeerModal from "./addNewBeer";

const MyBeer = () => {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Retrieve saved custom beers from localStorage on component mount
    const savedBeers = localStorage.getItem("customBeers");
    if (savedBeers) {
      setBeers(JSON.parse(savedBeers));
    }
  }, []);

  return (
    <>
      <div className="h-75">
        <div className="d-flex justify-content-end mb-4">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add a New Beer
          </Button>
        </div>

        {beers.length === 0 ? (
          <div className="d-flex flex-column justify-content-center align-items-center h-100 bg-light">
            <span className="text-secondary">Nothing to see yet.</span>
            <span className="text-secondary">
              <a
                href=""
                className=""
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(true);
                }}
              >
                Click here
              </a>{" "}
              to add your first beer.
            </span>
          </div>
        ) : (
          <BeerList beerList={beers} />
        )}
      </div>
      <AddNewBeerModal beers={beers} setBeers={setBeers} showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default MyBeer;
