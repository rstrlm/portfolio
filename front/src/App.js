import React from 'react'
import Home from './content/Home'
import Notes from './content/Notes'
import Skills from './content/Skills'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"



function App() {

  const padding = {
    padding: 5
  }

  return (
    <Router>
      
      <nav className="navi">
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/skills">skills</Link>
      </nav>
      <main className="container">
      <Switch>
        <Route path="/notes">
          <Notes />
        </Route>
        <Route path="/skills">
          <Skills />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      </main>
      <div>
        <p>Just creating another piece of art, hopefully this will be ready in time</p>
      </div>
    </Router>
  )
  
}

export default App;
