import React from "react";
import Layout from "./Layout";
import getStore from "./store";
import "./App.scss";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Views/Login";
export const { store, persistor } = getStore();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HelmetProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Layout} exact></Route>
            <Route path="/login" component={Login} exact></Route>
          </Switch>
        </BrowserRouter>
      </HelmetProvider>
    </PersistGate>
  </Provider>
);

export default App;
