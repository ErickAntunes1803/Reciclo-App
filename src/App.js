import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "react-notifications/lib/notifications.css";

import { HashRouter } from "react-router-dom";
import Routes from "./Routes/Routes.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <Routes />
          </div>
        </PersistGate>
      </Provider>
    </HashRouter>
  );
}

export default App;
