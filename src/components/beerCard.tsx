import React from "react";

import { Beer } from "../types/beer";

interface BeerCardProps {
  beer: Beer;
}

const BeerCard: React.FC<BeerCardProps> = ({ beer }) => {
  return (
    <div className="shadow d-flex p-4 mb-5" style={{ height: "180px" }}>
      <div>
        <img
          src={beer.image_url}
          alt={beer.name}
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
        />
      </div>
      <div className="d-flex flex-column align-items-start text-start overflow-auto">
        <h5>{beer.name}</h5>
        <h6 className="text-warning">  {beer.tagline}</h6>
        <span>
          {beer.description}
        </span>
        {/* <p className=" ">{beer.description}</p> */}
      </div>
    </div>
  );
};

export default BeerCard;
