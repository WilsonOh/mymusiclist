import "./App.css";
import Counter from "./components/Counter";
// import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Counter start={100} />
      {/* <Navbar /> */}
    </div>
  );
}

export default App;
