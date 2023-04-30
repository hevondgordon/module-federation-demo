import { useState, useEffect, Suspense } from 'react';
import RemoteModuleFetch from "./RemoteModuleFetch";

import './styles/App.css'

interface RemoteComponents {
  sideBar: JSX.Element | null;
  header: JSX.Element | null;
  footer: JSX.Element | null;
}

interface RemoteModuleConfig<T> {
  defaultScope: string
  defaultUrl: string;
  requiredRemoteModules: Array<string>;
  remoteModules: Array<RemoteModule<T>>;
}

interface RemoteModule<T> {
  slot: string
  url: string
  componentName: string
  scope: string
  props: { [key: string | number]: T }
}

const configureRemoteModules = <T,>(): { [key: string | number]: JSX.Element } => {
  const remoteModuleConfig = require('./remoteModuleConfig.json') as RemoteModuleConfig<T>;
  const remoteModules = remoteModuleConfig.remoteModules;
  const configuredModules: { [key: string | number]: JSX.Element } = {};
  const fallbackRemoteModuleLocation = remoteModuleConfig.defaultUrl;
  const defaultScope = remoteModuleConfig.defaultScope;

  for (const remoteModule of remoteModules) {
    const props = remoteModule.props;
    const scope = remoteModule.scope;

    configuredModules[remoteModule.slot] = <RemoteModuleFetch
      remoteModuleLocation={remoteModule.url ?? fallbackRemoteModuleLocation}
      appScope={scope ?? defaultScope}
      componentName={remoteModule.componentName}
      remoteModuleProps={props} />
  }
  return configuredModules;
}

function App() {
  const [{ sideBar, header, footer }, setRemoteModule] = useState<RemoteComponents>(
    { sideBar: null, header: null, footer: null }
  );

  useEffect(() => {
    const { sidebar, footer, header } = configureRemoteModules();
    setRemoteModule({ sideBar: sidebar, header: header, footer: footer })

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
    </div>
  );
}

export default App;
