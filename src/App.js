import "./index.css";
import RoutesApp from "./router";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} />
      <RoutesApp />
    </div>
  );
}

export default App;
