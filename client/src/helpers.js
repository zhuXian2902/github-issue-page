/** @format */

import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const createIssue = async (issue) => {
	const { title, description } = issue;
	const { data: data } = await axios.post(API_URL, {
		title,
		description,
	});
	return data;
};

export const deleteIssue = async (id) => {
	await axios.delete(`${API_URL}/api/issues/${id}`);
};

export const getIssue = async (id) => {
	const { data: data } = await axios.get(`${API_URL}/api/issues/${id}`);
	return data;
};

export const update = async (id, payload) => {
	const { data: data } = await axios.patch(
		`${API_URL}/api/issues/${id}`,
		payload
	);
	return data;
};

export const getAllissues = async (value, page) => {
	let query = `page=${page}&limit=8&`;
	if (value === 'isOpen') {
		query += 'isOpen=true';
	} else if (value === 'isClosed') {
		query += 'isOpen=false';
	}

	const { data: data } = await axios.get(`${API_URL}/api/issues?${query}`);
	return data;
};
