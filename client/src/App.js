import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Component/Home";
import "./css/App.css";
import Navigation from "./Component/Navigation";
import CardGenerator from './Component/CardGenerator';
import ThreeDCard from "./Component/ThreeDCard";
import Element from "./Component/CardGenerator/Element";
import AnimationCreator from "./Component/AnimationCreator";
import LeaderBoardItem from "./Component/LeaderBoardItem";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>   
          <Navigation />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route
            path="/CardGenerator"
              exact 
              component={CardGenerator}
              />  
              <Route path='/ThreeDCard' exact component={ThreeDCard}/>
              <Route path='/Element' exact component={Element}/>
              <Route path='/AnimationCreator' exact component={AnimationCreator}/>
              <Route path='/LeaderBoardItem' exact component={LeaderBoardItem}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
