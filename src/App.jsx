import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import VideoPlayer from "./pages/VideoPlayer";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(
    localStorage.getItem("user")
  );

  return (
    <BrowserRouter>
      <Header
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        search={search}
        setSearch={setSearch}
        user={user}
      />

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <div className="flex">
              <Sidebar isOpen={isSidebarOpen} />
              <Home search={search} />
            </div>
          }
        />

        {/* AUTH (LOGIN + REGISTER COMBINED) */}
        <Route path="/auth" element={<Auth setUser={setUser} />} />

        {/* VIDEO PLAYER */}
        <Route path="/video/:id" element={<VideoPlayer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
