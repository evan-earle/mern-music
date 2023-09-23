import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Search } from "./pages/Search";
import { Home } from "./pages/Home";
import { EditProfile } from "./pages/EditProfile";
import { Toaster } from "react-hot-toast";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  return (
    <div className="App">
      <Toaster
        position="top-left"
        toastOptions={{
          style: {
            fontSize: "1.5rem",
          },
        }}
      ></Toaster>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Route>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
