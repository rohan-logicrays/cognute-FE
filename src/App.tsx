import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { privateRoute } from "./routes/privateRoute";
import { publicRoutes } from "./routes/publicRoute";
import { useSelector } from "react-redux";
import { IRootState } from "./store/store";

const App = () => {
  const { userData } = useSelector((state: IRootState) => state.auth);

  const routeList = userData?.session_id ? privateRoute : publicRoutes;

  return (
    <Router>
      <Routes>
        {routeList.map((item) => (
          <Route
            path={item.path}
            key={item.name}
            element={
              item.redirectRoute ? <Navigate to={item.to} /> : <item.element />
            }
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;