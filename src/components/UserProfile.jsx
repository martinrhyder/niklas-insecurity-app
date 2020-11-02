import React, { useState, useEffect }  from "react";
import { Link, useHistory } from 'react-router-dom';
import { Button } from "@material-ui/core";
import request from '../makeRequest';

const UserProfile = () => {
	const [user, setUser] = useState(null);
	const [articles, setArticles] = useState([]);
	const history = useHistory();

	useEffect(() => {
		const fetchUser = async () => {
			const newUser = await request.get({ url: '/user'})
			setUser(newUser.data)
		}
		fetchUser()
	}, [])

	useEffect(() => {
		if (user?.username) {
			const fetchArticles = async () => {
				const articlesData = await request.post({ url: '/articles', data: { username: user.username }});
				if (articlesData?.data?.articles) {
					setArticles(articlesData.data.articles)
				}
			}
			fetchArticles()
		}
	}, [user])

	const handleLogout = async () => {
		await request.post({ url: '/logout' });
		history.go(0);
	}

	return (
		<div>
			<h1>{user?.username && `Welcome ${user.username}!`}</h1>
			<Button variant="contained" color="primary" onClick={handleLogout}>
				Logout
			</Button>
			<h2 style={{ marginTop: '60px' }}>My articles</h2>
			<ul>
				{articles.map((article) => {
					return (
						<li key={article.id}>
							<Link to={`/articles/${article.id}`}>{article.title}</Link>
						</li>
					)
				})}
			</ul>
		</div>
	);
};

export default UserProfile;
