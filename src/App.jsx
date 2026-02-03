import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div>
      <Header onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} />
        <Home />
      </div>
    </div>
  );
}

export default App;
