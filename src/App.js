import React from "react";
import { ModalProvider } from "react-modal-hook";
import { TransitionGroup } from "react-transition-group";
import Layout from "./Layout";
import getStore from "./store";
import "./App.scss";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./Views/Login";
export const { store, persistor } = getStore();



const App = () => (
  <Provider store={store}>
    <ModalProvider rootComponent={TransitionGroup}>
    <PersistGate loading={null} persistor={persistor}>
      <HelmetProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/dashboard" component={Layout}></Route>
            <Route path="/login" component={Login} exact></Route>

            <Redirect exact from="/" to="/dashboard" />
          </Switch>
        </BrowserRouter>
      </HelmetProvider>
    </PersistGate>
    </ModalProvider>
  </Provider>
);

export default App;
