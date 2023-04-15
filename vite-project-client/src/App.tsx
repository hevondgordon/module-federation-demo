import './App.css'
import React, { FC } from "react";

import RemoteModuleFetch from './RemoteModuleFetch';

// __remoteModule__
const x = "Button"
const RemoteComponent = React.lazy(() => import("outsiders/Button.js")) as FC<{ text: string }>


function App() {

  return (
    <div className="App">
      <RemoteComponent text="buttonText" />
      {/* <RemoteModuleFetch remoteModuleLocation="Button" remoteModuleProps={{ text: "buttonText" }} /> */}
      <section className="section">
        <article className='column' id='column-1'>__placeholder__</article>
        <article className='column' id='column-2'>__placeholder__</article>
        <article className='column' id='column-3'>__placeholder__</article>
      </section>
    </div>
  )
}

export default App
