/** @format */

const Issue = require('./../models/issueModel');
const AllError = require('../utils/error');

exports.getAllIssue = async (req, res, next) => {
	try {
		// console.log(req.query);
		const queryString = { ...req.query };
		delete req.query['page'];
		delete req.query['limit'];
		const page = queryString.page * 1 || 1;
		const limit = queryString.limit * 1;
		const skip = (page - 1) * limit;
		// console.log(req.query);
		const data = await Issue.find(req.query).skip(skip).limit(limit);
		res.status(200).json({
			status: 'success',
			data,
		});
	} catch (err) {
		next(err);
	}
};

exports.createIssue = async (req, res, next) => {
	try {
		// console.log(req.body);
		const data = await Issue.create(req.body);
		res.status(201).json({
			status: 'success',
			data,
		});
	} catch (err) {
		next(err);
	}
};

exports.getIssue = async (req, res, next) => {
	try {
		const data = await Issue.findById(req.params.id);
		res.status(200).json({
			status: 'success',
			data,
		});
	} catch (err) {
		next(err);
	}
};

exports.updateIssue = async (req, res, next) => {
	try {
		const data = await Issue.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!data) {
			return next(new AllError('this issue not found', 404));
		}

		res.status(200).json({
			status: 'success',
			data,
		});
	} catch (err) {
		next(err);
	}
};

exports.deleteIssue = async (req, res, next) => {
	try {
		const data = await Issue.findByIdAndRemove(req.params.id);

		if (!data) {
			return next(new AllError('this issue not found', 404));
		}

		res.status(204).json({
			status: 'success',
			message: 'succesfully deleted.',
			data: null,
		});
	} catch (err) {
		next(err);
	}
};
