import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./router/index.js";
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          {routes.map(({ path, componentName, exact = false }, index) => {
            return (
              <Route
                key={index}
                path={path}
                exact={exact}
                element={componentName}
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
