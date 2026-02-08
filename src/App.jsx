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
import Channel from "./pages/Channel";
import CreateChannel from "./pages/CreateChannel";
import EditVideo from "./pages/EditVideo";
import EditChannel from "./pages/EditChannel";
import CreateVideo from "./pages/CreateVideo";

function App() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/auth" element={<Auth setUser={setUser} />} />

        {/* LAYOUT */}
        <Route
          element={
            <Layout user={user} search={search} setSearch={setSearch} />
          }
        >
          <Route path="/" element={<Home search={search} />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/shorts" element={<Shorts />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/history" element={<History />} />
          <Route path="/liked" element={<Liked />} />

          <Route path="/video/:id" element={<VideoPlayer />} />
          <Route path="/channel/:id" element={<Channel />} />

          {/* CHANNEL / VIDEO MANAGEMENT */}
          <Route path="/create-channel" element={<CreateChannel />} />
          <Route path="/edit-channel/:id" element={<EditChannel />} />
          <Route path="/create-video" element={<CreateVideo />} />
          <Route path="/edit-video/:id" element={<EditVideo />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;



