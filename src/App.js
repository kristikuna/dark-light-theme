import React, { Component } from 'react';
import './App.css';

class App extends Component {
	state = {
		darkMode : this.getInitialMode(false)
	};

	getPrefColorScheme() {
		if (!window.matchMedia) return;
		return window.matchMedia('(prefers-color-scheme: light)').matches;
	}

	getInitialMode(initialState) {
		const isReturningUser = 'dark' in localStorage;
		const savedMode = JSON.parse(localStorage.getItem('dark'));
		const userPrefersDark = this.getPrefColorScheme();

		if (isReturningUser) {
			return savedMode;
		} else if (userPrefersDark) {
			return false;
		}
		return initialState;
	}

	setDarkMode = () => {
		this.setState((prevState) => {
			return localStorage.setItem('dark', JSON.stringify(!this.state.darkMode)), { darkMode: !prevState.darkMode };
		});
	};

	render() {
		return (
			<div className={this.state.darkMode ? 'dark-mode' : 'light-mode'}>
				<nav>
					<div className='toggle-container'>
						<span style={{ color: this.state.darkMode ? 'grey' : 'yellow' }}>☀︎</span>
						<span className='toggle'>
							<input
								checked={this.state.darkMode}
								onChange={this.setDarkMode}
								type='checkbox'
								className='checkbox'
								id='checkbox'
							/>
							<label htmlFor='checkbox' />
						</span>
						<span style={{ color: this.state.darkMode ? 'slateblue' : 'grey' }}>☾</span>
					</div>
				</nav>
				<main>
					<h1>{this.state.darkMode ? 'Dark Mode' : 'Light Mode'}</h1>
				</main>
			</div>
		);
	}
}

export default App;
