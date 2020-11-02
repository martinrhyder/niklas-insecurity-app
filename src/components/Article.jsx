import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from 'react-router-dom'
import request from '../makeRequest';

const Article = () => {
	const [article, setArticle] = useState(null); 
	const { id } = useParams();

	useEffect(() => {
		if (id) {
			const fetchArticle = async () => {
				const articleData = await request.post({ url: '/article', data: { id }});
				setArticle(articleData.data);
			}
			fetchArticle()
		} 
	}, [id]);

	return (
		<div>
			<h1>{article?.title}</h1>
			<p>{article?.body}</p>
			<Link to="/">Back</Link>
		</div>
	);
};

export default Article;
