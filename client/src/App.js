import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./component/LandingPage";
import Home from "./component/Home";
import CreatedVideogame from "./component/CreatedVideogame";
import Details from "./component/Details";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/details/:id" component={Details} />
          <Route exact path="/videogames" component={CreatedVideogame} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
