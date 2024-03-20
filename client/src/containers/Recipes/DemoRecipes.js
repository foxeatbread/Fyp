import React from "react";

import classes from "./Recipes.module.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import DemoRecipe from "../../containers/Recipes/DemoRecipe/DemoRecipe"

const DemoRecipes = (props) => {
  return (
    <div className={classes.Recipe}>
      <NavBar />
      <DemoRecipe id={props.match.params.id} />
      <Footer />
    </div>
  );
};

export default DemoRecipes;
