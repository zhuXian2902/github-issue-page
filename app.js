/** @format */

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();
const path = require('path');
const cors = require('cors');
const issueRouter = require('./routes/issueRoutes');
const AllError = require('./utils/error');

const DB = process.env.DB;
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then((con) => {
		console.log('database connected');
	})
	.catch(() => {
		console.log('server is down');
	});

app.use(morgan('dev'));
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '1000kb' }));
app.use('/api/issues', issueRouter);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const castError = (error) => {
	return new AllError(`invalid ${error.path} : ${error.value}`, 400);
};

const duplicateError = (err) => {
	// console.log(err);
	const val = err.message.match(/"([^"]*)"/); //(/(["'])(\\?.)*?\1/); //
	return new AllError(
		`this issue already exist. you can see solution from there.`,
		400
	);
};

app.use((err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';
	if (err.name === 'CastError') err = castError(err);
	if (err.code === 11000 || err.code === 11001) err = duplicateError(err);
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	});
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`server is running on port ${port}`);
});
