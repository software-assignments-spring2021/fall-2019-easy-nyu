import React from 'react';
import logo from './logo.svg';
import './App.css';

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
					  <a href="#" class="buttonLink">Sign in</a>
					  <a href="#" class="buttonLink">Create an Account</a>
				  </div>
			  </div>
		  </div>
	  </div>
  );
}

export default App;
