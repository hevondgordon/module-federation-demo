import { useState, useEffect, Suspense } from 'react';
import { dropHandler, onDragStart, dragoverHandler } from './dragAndDrop'
import { RemoteComponents } from './interfaces'
import { configureRemoteModules, getConfigModules } from './configuration'

import './styles/App.css';


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

  return (
    <div className='app-container'
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      
      <Suspense fallback="Loading System">
        <div className='header-container drop-target' onDrop={dropHandler} onDragOver={dragoverHandler}>{header}</div>
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
