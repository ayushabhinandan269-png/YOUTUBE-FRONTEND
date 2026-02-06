import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Layout from "./layouts/Layout";

/* Pages */
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Subscriptions from "./pages/Subscriptions";
import History from "./pages/History";
import Liked from "./pages/Liked";
import Shorts from "./pages/Shorts";
import VideoPlayer from "./pages/VideoPlayer";
import Auth from "./pages/Auth";
import Channel from "./pages/Channel"; // NEW

function App() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  // ✅ Load user once on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        {/* ================= AUTH (NO LAYOUT) ================= */}
        <Route path="/auth" element={<Auth setUser={setUser} />} />

        {/* ================= HOME ================= */}
        <Route
          path="/"
          element={
            <Layout user={user} search={search} setSearch={setSearch}>
              <Home search={search} />
            </Layout>
          }
        />

        {/* ================= EXPLORE ================= */}
        <Route
          path="/explore"
          element={
            <Layout user={user} search={search} setSearch={setSearch}>
              <Explore />
            </Layout>
          }
        />

        {/* ================= SHORTS ================= */}
        <Route
          path="/shorts"
          element={
            <Layout user={user} search={search} setSearch={setSearch}>
              <Shorts />
            </Layout>
          }
        />

        {/* ================= SUBSCRIPTIONS ================= */}
        <Route
          path="/subscriptions"
          element={
            <Layout user={user} search={search} setSearch={setSearch}>
              <Subscriptions />
            </Layout>
          }
        />

        {/* ================= HISTORY ================= */}
        <Route
          path="/history"
          element={
            <Layout user={user} search={search} setSearch={setSearch}>
              <History />
            </Layout>
          }
        />

        {/* ================= LIKED VIDEOS ================= */}
        <Route
          path="/liked"
          element={
            <Layout user={user} search={search} setSearch={setSearch}>
              <Liked />
            </Layout>
          }
        />

        {/* ================= CHANNEL PAGE ================= */}
        <Route
          path="/channel/:channelId"
          element={
            <Layout user={user} search={search} setSearch={setSearch}>
              <Channel />
            </Layout>
          }
        />

        {/* ================= VIDEO PLAYER ================= */}
        <Route
          path="/video/:id"
          element={
            <Layout user={user} search={search} setSearch={setSearch}>
              <VideoPlayer />
            </Layout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
