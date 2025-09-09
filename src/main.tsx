import ReactDOM from "react-dom";
import "./assets/index.css";
import { Provider } from "react-redux";
import { MainComponent } from "./MainComponent";
import { store } from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <MainComponent />
  </Provider>,
  document.getElementById("root")
);
// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});
