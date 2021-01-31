import React from "react";
import { AutoProvider } from "./Conteaxts/autoConteaxt";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import NavigationBar from "./Components/NavigationBar";
import HomePage from "./Components/HomePage";
import ProfileSettings from "./Components/ProfileSettings";
import LoginModal from "./Components/LoginModal";
import PrivateRoute from "./Components/Routes/privateRoute/PrivateRoute";
import SignUpModal from "./Components/SignUpModal";
import AddRecipe from "./Components/AddRecipe";
import MyRecipes from "./Components/MyRecipes";
import SavedRecipes from "./Components/SavedRecipes";
import RecipePage from "./Components/RecipePage";

const App = () => {
  return (
    <Router>
      <AutoProvider>
        <div className="app">
          <header className="app-header">
            <NavigationBar />
            <Switch>
              <Route exact path="/home">
                <HomePage />
              </Route>
              <Route exact path="/recipe/:id">
                <RecipePage />
              </Route>
              <PrivateRoute path="/my-recipes" component={MyRecipes} />
              <PrivateRoute path="/saved-recipes" component={SavedRecipes} />
              <PrivateRoute path="/add-recipe/:update?" component={AddRecipe} />
              <PrivateRoute
                path="/profile-settings"
                component={ProfileSettings}
              />
              <Route path="/sign-out">
                <HomePage />
              </Route>
              <Route path="/sign-up">
                <SignUpModal />
              </Route>
              <Route path="/login">
                <LoginModal />
              </Route>
              <Route exact path="/">
                <HomePage />
              </Route>
            </Switch>
          </header>
        </div>
      </AutoProvider>
    </Router>
  );
};

export default App;