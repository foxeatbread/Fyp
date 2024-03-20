import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ThemeContext from "./context/ThemeContext/ThemeContext";
import FoodProvider from "./context/FoodContext/FoodProvider";
import UserProvider from "./context/UserContext/UserProvider";
import Page from "./containers/Page/Page";
import Recipes from "./containers/Recipes/Recipes";
import DemoRecipes from "./containers/Recipes/DemoRecipes";
import RecipeUploadPage from "./containers/Recipes/RecipeUpload/RecipeUploadPage";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import LoginPage from "./containers/LoginPage/LoginPage";
import RegisterPage from "./containers/RegisterPage/RegisterPage"
import ProfilePage from "./containers/ProfilePage/ProfilePage";

import "./tailwind.generated.css";

function App() {
    const context = useContext(ThemeContext);

    return (
        <div
            className={[
                `theme-${context.theme}`,
                "container main bg-background-secondary",
            ].join(" ")}
        >
            <Router>
                <UserProvider>
                    <FoodProvider>
                        <Switch>
                            <Route path="/" exact component={Page} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Route path="/user" component={ProfilePage} />
                            <Route path="/food/:id" component={Recipes} />
                            <Route path="/demo-food/:id" component={DemoRecipes} />
                            <Route path="/add-food" component={RecipeUploadPage} />
                            <Route component={PageNotFound} />
                        </Switch>
                    </FoodProvider>
                </UserProvider>
            </Router>
        </div>
    );
}

export default App;
