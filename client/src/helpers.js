/** @format */

import axios from 'axios';

export const createIssue = async (issue) => {
	const { title, description } = issue;
	const { data: data } = await axios.post('/issues', {
		title,
		description,
	});
	return data;
};

export const deleteIssue = async (id) => {
	await axios.delete(`/issues/${id}`);
};

export const getIssue = async (id) => {
	const { data: data } = await axios.get(`/issues/${id}`);
	return data;
};

export const update = async (id, payload) => {
	const { data: data } = await axios.patch(`/issues/${id}`, payload);
	return data;
};

export const getAllissues = async (value, page) => {
	let query = `page=${page}&limit=8&`;
	if (value === 'isOpen') {
		query += 'isOpen=true';
	} else if (value === 'isClosed') {
		query += 'isOpen=false';
	}

	const { data: data } = await axios.get(`/issues?${query}`);
	return data;
};
