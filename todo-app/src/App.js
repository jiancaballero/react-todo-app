import "./App.css";
import Main from "./components/Main";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="container">
      <div className="grid">
        <SideBar />
        <Main />
      </div>
    </div>
  );
}

export default App;
