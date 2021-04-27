import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import IngredientsList from "./pages/IngredientsList/IngredientsList";
import OneIngredient from "./pages/OneIngredient/OneIngredient";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <IngredientsList />
        </Route>
        <Route path="/ingredient/:id">
          <OneIngredient />
        </Route>
        <Route path="*">
          <div>404 Not Found</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
