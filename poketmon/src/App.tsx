import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DetailPgae from "./pages/DetailPgae";
import IndexPage from "./pages/IndexPage";

function App() {
  // react-router-dom은 5버전과 6버전이 다르다. 대략적으로 6버전은 exact를 안쓰고 component 대신 element를 사용하고 Switch 대신 Routes를 사용
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route path="/:id" component={DetailPgae} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
