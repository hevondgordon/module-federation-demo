import Builder from "./components/Builder";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ConfigurationContext, ConfigurationContextProvider } from './components/contexts/ConfigurationContext'

ReactDOM.render(
  <StrictMode>
    <ConfigurationContextProvider>
      <Builder />
    </ConfigurationContextProvider>
  </StrictMode>, document.getElementById("root"));
