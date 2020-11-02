import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Button, TextField } from "@material-ui/core";
import { Link } from 'react-router-dom'
import request from '../makeRequest'

const LoginForm = () => {
	const [formValues, setFormValues] = useState({ email: "", password: "" });
	const [hasLoginError, setHasLoginError] = useState(false);
	const history = useHistory();

	const handleChange = (event) => {
		const target = event?.target;
		const name = target?.name;
		const value = target?.value;

		if (name && value) {
			setFormValues({ ...formValues, [name]: value });
		}
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			await request.post({ url: '/login', data: formValues });
			history.go(0);
		} catch (error) {
			console.error(error)
			setHasLoginError(true);
		}
	};

	return (
		<>
			<h2>Login</h2>
			<p>(Come on, it will be fun)</p>
			<form onSubmit={handleFormSubmit}>
				<TextField
					value={formValues.email}
					id="email"
					name="email"
					label="Email"
					onChange={handleChange}
					fullWidth
				/>
				<TextField
					value={formValues.password}
					id="password"
					name="password"
					label="Password"
					type="password"
					autoComplete="current-password"
					onChange={handleChange}
					fullWidth
				/>
				<Button type="submit" variant="contained" color="primary" className="register-button">
					Login
				</Button>
			</form>
			{hasLoginError && <p>Wrong email or password <Link to="/reset-password">Reset password here</Link></p>}
		</>
	);
};

export default LoginForm;
