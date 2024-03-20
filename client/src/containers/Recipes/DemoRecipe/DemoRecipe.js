import React, { useState, useEffect, Fragment, useContext } from "react";

import classes from "./DemoRecipe.module.css";
import Table from "../Table/Table";
import { fetchRecipeById } from "../../../api";
import ThemeContext from "../../../context/ThemeContext/ThemeContext";

function Recipe(props) {
  const context = useContext(ThemeContext);

  const [recipe, setRecipe] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRecipe();
    // eslint-disable-next-line
  }, []);

  const getRecipe = async () => {
    const recipe = await fetchRecipeById(props.id)
    setRecipe(recipe.data)
    setLoading(false)
  };

  let theme;

  if (context.theme === "light") {
    theme = "#212832";
  } else {
    theme = "#FFF";
  }

  let food;

  if (loading) {
    food = (
      <div className={props.id}>
        <div
          style={{ color: theme }}
          className={[
            classes.LaSquareSpin,
            classes.La2x,
            "mx-auto mt-24",
          ].join(" ")}
        >
          <div></div>
        </div>
      </div>
    );
  } else if (recipe !== undefined) {
    let rules = recipe.instructions
    // console.log(rules);

    let ingredients = [];
    for (let i = 0; i < recipe.ingredients.length; i++) {
      let amount = recipe.ingredients[i]?.quantity
      let item = recipe.ingredients[i]?.name

      ingredients.push([`${item}`, `${amount}`]);
    };

    let video;

    if (recipe.videoUrl !== "") {
      video =
        "https://www.youtube.com/embed/" +
        recipe.videoUrl.split("=")[1];
    }

    food = (
      <div className={props.id}>
        <div className="container p-12">
          <div className="flex hero flex-row lg:flex-col mt-4 mb-8">
            <div className="p-6 my-auto">
              {
                recipe.image ? <img
                  src={recipe.image}
                  className={[
                    classes.Image,
                    "shadow-xl",
                  ].join(" ")}
                  alt="foodies"
                /> : <></>
              }

            </div>
            <div className="container">
              <h1 className="text-6xl text-copy-primary lg:text-center leading-tight mb-2 pl-6 py-2">
                {recipe.title}
              </h1>
              <div className="container lg:mx-auto pl-6 py-1 w-5/6">
                <Table ingredients={ingredients} />
              </div>
            </div>
          </div>
          <div className="container px-6 mt-6 mb-12">
            <h1 className="text-4xl text-copy-primary text-center font-bold py-2">
              How to Cook this?{" "}
              <span role="img" aria-label="icon">
                😋
              </span>
            </h1>
            <p className="text-lg text-copy-white text-gray-800 text-justify sm:text-left px-12 md:px-4 sm:px-0 my-4 py-6">
              {rules}
            </p>
          </div>
          {video ? (
            <div
              className={[
                classes.VideoContainer,
                "mx-auto shadow-2xl",
              ].join(" ")}
            >
              <iframe
                title={recipe.title}
                width="315"
                height="560"
                src={video}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : null}
        </div>
      </div>
    );

    // comment = (
    //   <div className={props.expand}>

    //   </div>)
  }

  return <Fragment>{food}</Fragment>;
}

export default Recipe;
