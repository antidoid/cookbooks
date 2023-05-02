import "./App.css";
import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Home, Login } from "./pages";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
