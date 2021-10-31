import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Faculty from './Faculty';
import Student from './Student';
import Home from './Home';
import './app.css'

function App() {
  return(
    <>
    <Switch>
        <Route path='/student' component={Student}></Route>
        <Route path='/faculty' component={Faculty}></Route>
        <Route excat path='/' component={Home}></Route>
    </Switch>
    </>
  );
}
export default App;
