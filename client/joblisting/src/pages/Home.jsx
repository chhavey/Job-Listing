import React from "react";
import Header from "../components/Header/Header";
import FilterCard from "../components/FilterCard/FilterCard";
import style from "./home.module.css";

function Home() {
  return (
    <div>
      <Header />
      <div className={style.container}>
        <FilterCard />
      </div>
    </div>
  );
}

export default Home;
