import { Spin } from "antd";
import React, { lazy, Suspense } from "react";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

//import App from "./Apps";
import configureStore from "./configureStore";
const App = lazy(()=> import('./App'));

export const store = configureStore();

function Root() {
  return (
    <Provider store={store}>
      <Router>
      <Suspense fallback={<div className="page-loading" ><Spin size="large" /></div>}>
        <App />
      </Suspense>
      </Router>
    </Provider>
  );
}

export default Root;