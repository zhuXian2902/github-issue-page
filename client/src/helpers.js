/** @format */

import axios from 'axios';

const API_URL = 'https://fathomless-escarpment-65717.herokuapp.com/api/issues';

export const createIssue = async (issue) => {
	const { title, description } = issue;
	const { data: data } = await axios.post(API_URL, {
		title,
		description,
	});
	return data;
};

export const deleteIssue = async (id) => {
	await axios.delete(`${API_URL}/${id}`);
};

export const getIssue = async (id) => {
	const { data: data } = await axios.get(`${API_URL}/${id}`);
	return data;
};

export const update = async (id, payload) => {
	const { data: data } = await axios.patch(`${API_URL}/${id}`, payload);
	return data;
};

export const getAllissues = async (value, page) => {
	let query = `page=${page}&limit=8&`;
	if (value === 'isOpen') {
		query += 'isOpen=true';
	} else if (value === 'isClosed') {
		query += 'isOpen=false';
	}

	const { data: data } = await axios.get(`${API_URL}?${query}`);
	return data;
};
