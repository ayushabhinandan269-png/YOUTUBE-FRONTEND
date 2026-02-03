import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <Header
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        search={search}
        setSearch={setSearch}
      />

      <Routes>
        <Route
          path="/"
          element={
            <div className="flex">
              <Sidebar isOpen={isSidebarOpen} />
              <Home search={search} />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
