import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";
import NewPost from "./NewPost";
// import { SnackbarProvider } from "notistack";

export const Routes = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/detail-post/:id" component={Detail} exact />
        <Route path="/update-post/:id" component={Detail} exact />
        <Route path="/new-post" component={NewPost} exact />
      </Switch>
    </BrowserRouter>
  );
};
