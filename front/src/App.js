import React from 'react'
import Home from './components/Home'
import Login from './components/Login'
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
        <div className="navi-wrapper">
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/skills">skills</Link>
        <Link style={padding} to="/porfolio">Portfolio</Link>
        </div>
      </nav>
      <main className="container">
      <Switch>
      <Route path="/login">
          <Login />
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
