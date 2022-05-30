import { Routes, Route } from "react-router-dom";
import Search from "./search/Search";
import PrivateRoute from "./privateRoute/PrivateRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/user" element={<PrivateRoute />} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There is no content!</p>
          </main>
        }
      />
    </Routes>
  );
};

export default App;
