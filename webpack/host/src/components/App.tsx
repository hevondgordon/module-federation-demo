import { Suspense } from 'react';
import { DragAndDrop } from './DragAndDrop'
import { ConfigurationContext, ConfigurationContextProvider } from './contexts/ConfigurationContext'
import '../styles/App.css';

const configuration = require('../remoteModuleConfig.json')

function App() {

  return (
    <div className='app-container'
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >

      <Suspense fallback="Loading System">
        <DragAndDrop
          childComponentSlot='header'
          className='header-container' />
      </Suspense>
      <div className='main-content'>
        <Suspense fallback="Loading System">
          <DragAndDrop
            childComponentSlot='sidebar'
            className='sidebar-container' />
        </Suspense>
        <main>
          <h2>Main Content Area</h2>
          <p>This is the main content of the page.</p>
        </main>
      </div>
      <Suspense fallback="Loading System">
        <DragAndDrop
          childComponentSlot='footer'
          className='footer-container' />
      </Suspense>

    </div>

  );
}

export default App;
