import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login'
import Signup from './components/signup'
import Professors from './components/professors'

function App() {
  return (
	  <div>
		  <div id="header" class="headerContent">
			  <img class="headerLogo" src="logo.png">
			  </img>
		  </div>

		  <div id="title" class="pageTitle">Welcome to EasyNYU</div>

		  <div class="centerContent">
			  <div class="textBoxContainer shadow rounded">
				  <div class="textBox">
					  <Login />
					  <Signup />
					  <Professors />
				  </div>
			  </div>
		  </div>
	  </div>
  );
}

export default App;
