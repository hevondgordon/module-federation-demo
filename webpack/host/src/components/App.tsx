import { Suspense, useState, useEffect } from 'react';
import { DragAndDrop } from './DragAndDrop'
import { useConfigurationContext } from '../hooks'
import '../styles/App.css';


function App() {
  const configContext = useConfigurationContext()
  const mapping = configContext.configuration.mapping;

  const [{ header, sidebar, footer }, setMapping] = useState(mapping);

  useEffect(() => {
    setMapping(mapping);
  }, [mapping])

  return (
    <div className='app-container'
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >

      <Suspense fallback="Loading Header">
        <DragAndDrop
          childComponentSlot={header}
          className='header-container' />
      </Suspense>

      <div className='main-content'>
        <Suspense fallback="Loading Sidebar">
          <DragAndDrop
            childComponentSlot={sidebar}
            className='sidebar-container' />
        </Suspense>
        <main>
          <h2>Main Content Area</h2>
          <p>This is the main content of the page.</p>
        </main>
      </div>

      <Suspense fallback="Loading Footer">
        <DragAndDrop
          childComponentSlot={footer}
          className='footer-container' />
      </Suspense>

    </div>

  );
}

export default App;
