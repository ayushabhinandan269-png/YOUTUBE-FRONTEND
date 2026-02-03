import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Home />
      </div>
    </>
  );
}

export default App;
