import React, { useState, useEffect, Fragment, useContext } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import classes from "./Recipe.module.css";
import Table from "../Table/Table";
import CommentBox from "../Comment/CommentBox";
import ThemeContext from "../../../context/ThemeContext/ThemeContext";
import UserContext from "../../../context/UserContext/UserContext";
import { addFavorite, removeFavorite } from "../../../api";
import { IconButton } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import RecommendBox from "../Recommend/RecommendBox";

function Recipe(props) {
  const context = useContext(ThemeContext);
  const { userInfo, addFavouriteInPage, removeFavouriteInPage } = useContext(UserContext);

  const [recipe, setRecipe] = useState();
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(userInfo.likes.some((id) => id === props.id));

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    getRecipe();
    // eslint-disable-next-line
  }, [props]);

  const handleClick = async () => {
    if (userInfo.id === null) {
      alert("Sorry, you need to login firstly.")
      history.push('/login');
    }
    if (!liked) {
      const result = await addFavorite(userInfo.id, props.id);
      if (result.success) {
        addFavouriteInPage(props.id);
        setLiked(true);
      }
    } else {
      const result = await removeFavorite(userInfo.id, props.id);
      if (result.success) {
        removeFavouriteInPage(props.id);
        setLiked(false);
      }
    }
  };

  const getRecipe = () => {
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${props.id}`
      )
      .then((res) => {
        setRecipe(...res.data.meals);
        setLoading(false);
      });
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
      <div className={props.expand}>
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
    let rules = recipe.strInstructions
      .split("/d*\\r\\n/g")[0]
      .split(".")
      .filter((i) => i !== "");
    // console.log(rules);

    let items = [];
    for (let i = 1; i <= 20; i++) {
      items.push(recipe[`strIngredient${i}`]);
    }
    items = items.filter((item) => {
      return item !== "" && item !== null;
    });

    let amt = [];
    for (let i = 1; i <= 20; i++) {
      amt.push(recipe[`strMeasure${i}`]);
    }
    amt = amt.filter((item) => {
      return item !== "" && item !== null;
    });

    let ingredients = [];
    items.forEach((item, index) => {
      let amount = amt[index];
      if (amount === " ") {
        amount = "As per taste";
      } else if (!isNaN(amount)) {
        amount += " piece(s)";
      }
      ingredients.push([`${item}`, `${amount}`]);
    });

    let video;

    if (recipe.strYoutube !== "") {
      video =
        "https://www.youtube.com/embed/" +
        recipe.strYoutube.split("=")[1];
    }

    food = (
      <div className={props.expand}>
        <div className="container p-12">
          <div className="flex hero flex-row lg:flex-col mt-4 mb-8">
            <div className="p-6 my-auto">
              <a
                href={
                  recipe.strSource
                    ? recipe.strSource
                    : `/food/${recipe.idMeal}`
                }
              >
                <img
                  src={recipe.strMealThumb}
                  className={[
                    classes.Image,
                    "shadow-xl",
                  ].join(" ")}
                  alt="foodies"
                />
              </a>
              <IconButton onClick={handleClick} style={{
                color: liked ? 'red' : 'gray',
                cursor: 'pointer',
                outline: 'none',
              }}>
                {liked ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
              {liked ? <span style={{ color: 'red' }}>Awesome Food ! <span role="img" aria-label="awesome">👍</span></span> : <span style={{ color: theme }}>Add to Favorites</span>}
            </div>
            <div className="container">
              <h1 className="text-6xl text-copy-primary lg:text-center leading-tight mb-2 pl-6 py-2">
                {recipe.strMeal}
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
              {rules.join(".")}
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
                title={recipe.idMeal}
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
        <RecommendBox id={props.id} />
        <CommentBox id={props.id} />
      </div>
    );

    // comment = (
    //   <div className={props.expand}>

    //   </div>)
  }

  return <Fragment>{food}</Fragment>;
}

export default Recipe;
