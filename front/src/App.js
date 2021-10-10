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
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/skills">skills</Link>
      </div>

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

      <div>
        <i>Note app, Department of Computer Science 2021</i>
      </div>
    </Router>
  )
  
}

export default App;
