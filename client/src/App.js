import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Forget from "./Pages/Forget";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard"

function App() {
  return (
    <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/forget" element={<Forget/>} />
            <Route exact path="/home" element={<Home/>} />
            <Route exact path="/dashboard" element={<Dashboard/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
