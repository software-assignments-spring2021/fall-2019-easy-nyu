import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login'
import Signup from './components/signup'

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
				  </div>
			  </div>
		  </div>
	  </div>
  );
}

export default App;
