import { useState, useEffect, Suspense } from 'react';
import RemoteModuleFetch from "./RemoteModuleFetch";

import './styles/App.css'

interface RemoteComponents {
  sideBar: JSX.Element | null;
  header: JSX.Element | null;
  footer: JSX.Element | null;
}

function App() {
  const [{ sideBar, header, footer }, setRemoteModule] = useState<RemoteComponents>({ sideBar: null, header: null, footer: null });
  const remoteModuleLocation = "http://localhost:3002/remoteEntry.js";
  useEffect(() => {

    const sidebar = <RemoteModuleFetch remoteModuleLocation={remoteModuleLocation} appScope="app2" componentName="./Sidebar"
      remoteModuleProps={{ title: "Remote Sidebar", details: [{ name: 'link 1', url: 'google.com' }] }} />
    const header = <RemoteModuleFetch remoteModuleLocation={remoteModuleLocation} appScope="app2" componentName="./Header" />
    const footer = <RemoteModuleFetch remoteModuleLocation={remoteModuleLocation} appScope="app2" componentName="./Footer" />

    setRemoteModule({ sideBar: sidebar, header: header, footer: footer })

    // setRemoteModule(WidgetComponent);
  }, []);
  return (
    <div className='app-container'
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      <Suspense fallback="Loading System">
        {header}
      </Suspense>
      <div className='main-content'>
        <Suspense fallback="Loading System">
          {sideBar}
        </Suspense>
        <main>
          <h2>Main Content Area</h2>
          <p>This is the main content of the page.</p>
        </main>
      </div>
      <Suspense fallback="Loading System">
        {footer}
      </Suspense>
      {/* <div style={{ marginTop: "2em" }}>
        <Suspense fallback="Loading System">
          {RemoteModule !== null && RemoteModule}
        </Suspense>
      </div> */}
    </div>
  );
}

export default App;
