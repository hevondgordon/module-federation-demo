import { useState, useEffect, Suspense, DragEvent } from 'react';
import RemoteModuleFetch from "./RemoteModuleFetch";
import './styles/App.css'

const remoteModuleConfig = require('./remoteModuleConfig.json')

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
  configModules: {
    defaultUrl: string;
    modules: Array<{ name: string, import: string }>
  }
}

interface RemoteModule<T> {
  slot: string
  url: string
  componentName: string
  scope: string
  props: { [key: string | number]: T }
}

const getConfigModules = <T,>() => {
  const _remoteModuleConfig = remoteModuleConfig as RemoteModuleConfig<T>;
  const configModules = _remoteModuleConfig.configModules;
  const modules = configModules.modules;
  return modules;
}

const configureRemoteModules = <T,>(): { [key: string | number]: JSX.Element } => {
  const _remoteModuleConfig = remoteModuleConfig as RemoteModuleConfig<T>;
  const remoteModules = _remoteModuleConfig.remoteModules;
  const configuredModules: { [key: string | number]: JSX.Element } = {};
  const fallbackRemoteModuleLocation = _remoteModuleConfig.defaultUrl;
  const defaultScope = _remoteModuleConfig.defaultScope;

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

function dragover_handler(ev: DragEvent<HTMLDivElement>) {
  ev.preventDefault();
  if (ev.dataTransfer) ev.dataTransfer.dropEffect = "move";
}

function drop_handler(ev: DragEvent<HTMLDivElement>) {
  ev.preventDefault();
  // Get the id of the target and add the moved element to the target's DOM
  if (ev.dataTransfer && ev.target) {
    const data = ev.dataTransfer.getData("text/plain");
    const target = ev.target as HTMLElement;
    const targetId = target.className;
    console.log(target, data);
  }
}

const onDragStart = (ev: DragEvent<HTMLDivElement>) => {
  if (ev.dataTransfer) {
    const target = ev.target as HTMLElement;
    console.log(`drag started on ${target.className}`)
    ev.dataTransfer.setData("text/plain", target.className);
  }
}

function App() {
  const [{ sideBar, header, footer }, setRemoteModule] = useState<RemoteComponents>(
    { sideBar: null, header: null, footer: null }
  );

  const [dragAndDropModules, setDragAndDropModules] = useState<Array<{ name: string, import: string }>>([]);

  useEffect(() => {
    const { sidebar, footer, header } = configureRemoteModules();
    const dragAndDropModules = getConfigModules();
    setDragAndDropModules(dragAndDropModules);
    setRemoteModule({ sideBar: sidebar, header: header, footer: footer })

  }, []);

  const DragAndDropModules = dragAndDropModules.map((module) => {
    return <div onDragStart={onDragStart} draggable='true' className='drag-component'>{module.name}</div>
  })

  return (
    <div className='app-container'
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      <div className='component-drag-holder'>
        {DragAndDropModules}
      </div>
      <Suspense fallback="Loading System">
        <div className='header-container drop-target' onDrop={drop_handler} onDragOver={dragover_handler}>{header}</div>
      </Suspense>
      <div className='main-content'>
        <Suspense fallback="Loading System">
          <div className='sidebar-container drop-target'>{sideBar}</div>
        </Suspense>
        <main>
          <h2>Main Content Area</h2>
          <p>This is the main content of the page.</p>
        </main>
      </div>
      <Suspense fallback="Loading System">
        <div className='footer-container drop-target'>{footer}</div>
      </Suspense>
    </div>
  );
}

export default App;
