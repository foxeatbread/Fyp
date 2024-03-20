import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { getRecommend } from '../../../api';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 10,
  },
});

const RecommendBox = (props) => {
  const recipeId = props.id;

  const [recommends, setRecommends] = useState([]);

  const getRecipe = () => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
      .then((res) => {
        getRecommendByRecipe(res.data.meals[0]);
      });
  };

  const getRecommendByRecipe = async (recipe) => {
    const area = recipe.strArea;
    const category = recipe.strCategory;
    const recommends = await getRecommend(area, category);
    setRecommends(recommends.data);
  }

  useEffect(() => {
    getRecipe();
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  return (
    <div>
      <h1 className="text-4xl text-copy-primary text-center font-bold py-2">
        Recommends{" "}
        <span role="img" aria-label="icon">
          🍽️
        </span>
      </h1>
      <Grid container spacing={2} className="flex justify-center">
        {recommends.map((recipe) => (
          <Grid item key={recipe.idMeal}>
            <Link to={`/food/${recipe.idMeal}`}>
              <Card className={classes.root}>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {recipe.strMeal}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RecommendBox;
