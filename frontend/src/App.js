import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Welcome from './components/pages/Welcome/Welcome'

class App extends React.Component {
  render() {
    return (
      <div>
        <Welcome />
      </div>
      // <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
    )
  }}


export default App;
