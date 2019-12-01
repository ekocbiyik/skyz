import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Welcome from './components/pages/Welcome/Welcome'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import FindCategory from './components/pages/FindCategory/FindCategory';
import MailSubject from './components/pages/MailSubject/MailSubject'

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/find-category">
              <FindCategory />
            </Route>
            <Route path="/email-subject">
              <MailSubject />
            </Route>
            <Route path="/">
              <Welcome />
            </Route>
          </Switch>
        </Router>
        
      </div>
      // <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
    )
  }}


export default App;
