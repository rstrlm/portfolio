import React from 'react'
import Home from './components/Home'
import Portfolio from './components/Portfolio'
import Skills from './components/Skills'
import Footer from './components/Footer'

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
        <Link style={padding} to="/porfolio">Portfolio</Link>
        <Link style={padding} to="/skills">skills</Link>
      </nav>
      <main className="container">
      <Switch>
        <Route path="/porfolio">
          <Portfolio />
        </Route>
        <Route path="/skills">
          <Skills />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      </main>
      <Footer />

    </Router>
  )
  
}

export default App;
