import React from "react";
import { Tabs, Tab } from "react-bootstrap";

interface BeerTabsProps {
  tabKey: string;
  setTabKey: (k: string) => void;
}

const BeerTabs: React.FC<BeerTabsProps> = ({ tabKey, setTabKey }) => {

  return (
    <Tabs
      id="beerTabs"
      activeKey={tabKey}
      onSelect={(k) => setTabKey(k)}
      className="mb-3"
    >
      <Tab eventKey="allBeers" title="All Beers"></Tab>
      <Tab eventKey="myBeers" title="My Beers"></Tab>
    </Tabs>
  );
};

export default BeerTabs;
