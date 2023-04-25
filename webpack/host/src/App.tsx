import React from "react";
import { Suspense, useState, useEffect } from 'react';
import RemoteModuleFetch from "./RemoteModuleFetch";

function App() {
  const [RemoteModule, setRemoteModule] = useState<JSX.Element | null>(null);
  useEffect(() => {
    const WidgetComponent = <
      RemoteModuleFetch
      remoteModuleLocation="http://localhost:3002/remoteEntry.js"
      appScope="app2"
      componentName="./Widget" />

    setRemoteModule(WidgetComponent);
  }, []);
  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      <h1>Dynamic System Host</h1>
      <h2>App 1</h2>
      <p>
        The Dynamic System will take advantage Module Federation{" "}
        <strong>remotes</strong> and <strong>exposes</strong>. It will no load
        components that have been loaded already.
      </p>
      <div style={{ marginTop: "2em" }}>
        <Suspense fallback="Loading System">
          {RemoteModule !== null && RemoteModule}
        </Suspense>
      </div>
    </div>
  );
}

export default App;
