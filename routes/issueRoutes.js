/** @format */

const express = require('express');
const router = express.Router();
const issueController = require('./../controllers/issueController');

router
	.route('/')
	.get(issueController.getAllIssue)
	.post(issueController.createIssue);

router
	.route('/:id')
	.get(issueController.getIssue)
	.patch(issueController.updateIssue)
	.delete(issueController.deleteIssue);

module.exports = router;
