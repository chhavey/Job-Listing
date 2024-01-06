import React from "react";
import Header from "../components/Header/Header";
import FilterCard from "../components/FilterCard/FilterCard";

function Home() {
  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FilterCard />
      </div>
    </div>
  );
}

export default Home;
