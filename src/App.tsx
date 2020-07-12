import { createBrowserHistory } from "history";
import { PageRoutes } from "services/navigation/page-routes";
import React from "react";
import { Router } from "react-router-dom";

function App() {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <div className="App">
        <div className="vms-body">
          <PageRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;
