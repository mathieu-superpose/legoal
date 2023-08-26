import ReactDOM from "react-dom/client";
import { insertCoin } from "playroomkit";
import App from "./App.jsx";
import "./index.css";

const root = document.getElementById("root");

if (root) {
  insertCoin().then(() => {
    ReactDOM.createRoot(root).render(<App />);
  });
}
