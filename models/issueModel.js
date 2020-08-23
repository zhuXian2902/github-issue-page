/** @format */

const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			unique: true,
			required: [true, 'Please write a title of issue.'],
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		isOpen: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);

const Issue = mongoose.model('Issue', issueSchema);
module.exports = Issue;
