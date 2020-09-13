import React  from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";
// import { SnackbarProvider } from "notistack";

export const Routes = props => {
    return(

        <BrowserRouter>
            <Switch>
                <Route
                    path="/"
                    component={Home}
                    exact
                />
                <Route
                    path="/details"
                    component={Detail}
                    exact
                />
            </Switch>
        </BrowserRouter>

    )
}