import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './Component/Header/header'
import Home from './Home/home'
import Login from './Login/login'
import Write from './Write/write'
import Article from './Article/article'

function App() {
  // const currentUser = true;
  // const pathForNoHeader = ['/login']
  // const pathname = window.location.pathname

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/"><Home /> </Route>
        <Route path="/write"> <Write /> </Route>
        <Route path="/register"> <Login /> </Route>
        <Route path="/login"> <Login /></Route>
        <Route path="/article"> <Article /></Route>
      </Switch>
    </Router>
  );
}

export default App;
