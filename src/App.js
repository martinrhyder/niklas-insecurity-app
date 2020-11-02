import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Article, LoginForm, Header, UserProfile } from "./components";
import "./App.css";

function App() {
	const isAuthenticated = sessionStorage.getItem('is-authenticated')

	return (
		<BrowserRouter>
			<div className="App">
				<Header />
				<div className="container">
					{isAuthenticated ? (
						<Switch>
							<Route exact path="/">
								<UserProfile />
							</Route>
							<Route path="/articles/:id">
								<Article />
							</Route>
						</Switch>
					) : <LoginForm />}
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
