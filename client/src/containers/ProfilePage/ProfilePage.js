import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { Button, Card, CardActions, CardContent, CardMedia } from "@material-ui/core";
import { Grid, Paper, Typography, Container, Tabs, Tab } from "@material-ui/core"
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { fetchAllRecipes, fetchRecipeById } from "../../api/index.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import Sidebar from "./Sidebar.js";
import Navbar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import UserContext from "../../context/UserContext/UserContext.js";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    marginLeft: 0,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  card: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "40.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

export default function Profile() {
  const classes = useStyles();
  const history = useHistory();
  const { userInfo } = useContext(UserContext);
  const [publishedRecipes, setPublishedRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => { setValue(newValue); };

  const handleViewClick = (id) => {
    if (id >= 1 && id <= 100) {
      history.push(`/demo-food/${id}`);
    } else {
      history.push(`/food/${id}`);
    }
  };

  const handleEditClick = (id) => {

  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (userInfo) {
        const response = await fetchAllRecipes();
        const publishedRecipesData = response.data;
        // const publishedRecipesData = await Promise.all(
        //   userInfo.publish.map(async (id) => {
        //     const response = await fetchRecipeById(id);
        //     if (response && response.success) {
        //       return response.data;
        //     }
        //     return null;
        //   })
        // );
        setPublishedRecipes(publishedRecipesData);

        if (userInfo) {
          const likedRecipesData = await Promise.all(
            userInfo.likes.map(async (id) => {
              const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
              if (response) {
                return response.data.meals[0];
              }
              return null;
            })
          );
          setLikedRecipes(likedRecipesData);
        }
      }
    };

    fetchUserData();
  }, [userInfo]);

  return (
    <React.Fragment>
      <Navbar />
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} sm={4} md={3} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Sidebar />
          </div>
        </Grid>
        <Grid item xs={false} sm={8} md={9}>
          <main>
            <AntTabs value={value} onChange={handleChange}>
              <AntTab label="Likes 🩷" />
              <AntTab label="Publish 🎉" />
              {/* <AntTab label="Delete ❌" /> */}
            </AntTabs>
            <Button variant="contained" color="primary" style={{ position: "absolute", right: 20, top: 85 }}
              onClick={() => { history.push('/add-food'); }}>
              Upload Recipe
            </Button>

            <Container className={classes.cardGrid} key='cards'>
              {likedRecipes && publishedRecipes && (
                <Grid container spacing={4}>
                  {value === 0 && (
                    likedRecipes.map((card) => (
                      <Grid item key={card.idMeal} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                          <CardMedia className={classes.cardMedia} image={card.strMealThumb} title="FoodImg" />
                          <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                              {card.strMeal}
                            </Typography>
                            <Typography>
                              {card.strInstructions.slice(0, 60) + "..."}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small" color="primary" onClick={() => { handleViewClick(card.idMeal) }}> View </Button>
                          </CardActions>
                        </Card>
                      </Grid>)))
                  }

                  {value === 1 && (
                    publishedRecipes.map((card) => (
                      <Grid item key={card.id} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                          <CardMedia className={classes.cardMedia} image={card.image} title="FoodImg" />
                          <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                              {card.title}
                            </Typography>
                            <Typography>
                              {card.instructions.slice(0, 60) + "..."}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small" color="primary" onClick={() => { handleViewClick(card.id) }}> View </Button>
                            {/* <Button size="small" color="success" onClick={() => { handleEditClick(card.id) }}> Delete </Button> */}
                          </CardActions>
                        </Card>
                      </Grid>)))
                  }
                </Grid>
              )}
            </Container>
          </main>

          {/* End footer */}
        </Grid>
      </Grid>
      <Footer />

    </React.Fragment>
  );
}
