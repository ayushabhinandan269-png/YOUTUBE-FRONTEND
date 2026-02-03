import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import VideoPlayer from "./pages/VideoPlayer";
import Layout from "./layouts/Layout";

function App() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={
            <Layout user={user} search={search} setSearch={setSearch}>
              <Home search={search} />
            </Layout>
          }
        />

        {/* VIDEO PLAYER */}
        <Route
          path="/video/:id"
          element={
            <Layout user={user} search={search} setSearch={setSearch}>
              <VideoPlayer />
            </Layout>
          }
        />

        {/* AUTH */}
        <Route path="/auth" element={<Auth setUser={setUser} />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
