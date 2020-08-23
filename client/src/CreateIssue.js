/** @format */

import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TextField } from 'formik-material-ui';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import { createIssue, getIssue, update } from './helpers';

const useStyles = makeStyles((theme) => ({
	alert: {
		margin: theme.spacing(0),
	},
	paper: {
		marginTop: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		marginTop: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const initialValues = {
	title: '',
	description: '',
};

const validationSchema = Yup.object({
	title: Yup.string().required('Required'),
});

export default function SignIn({
	setOpen,

	handleClose,
	open,
}) {
	const classes = useStyles();
	const [buttonText, setButtonText] = useState(false);
	const [redirectToReferrer, setRedirectToReferrer] = useState(false);

	const onSubmit = async (values, submitProps) => {
		try {
			setButtonText(true);
			const { title, description } = values;

			const res = await createIssue({ title, description });
			setButtonText(true);
			submitProps.resetForm();
			toast.success('Review created successfully', {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
			});
			setButtonText(false);
			setOpen(false);
		} catch (err) {
			if (err && err.response && err.response.data) {
				toast.error(err.response.data.message, {
					position: 'top-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
			setButtonText(false);
		}
	};
	// console.log(initialValues, rating);

	return (
		<div>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Create Issue
						</Typography>
					</Toolbar>
				</AppBar>
				<Container component="main" maxWidth="sm">
					<ToastContainer
						position="top-center"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss={false}
						draggable={false}
						pauseOnHover={false}
					/>
					<CssBaseline />
					<div className={classes.paper}>
						<Formik
							initialValues={initialValues}
							onSubmit={onSubmit}
							validationSchema={validationSchema}
						>
							{(props) => {
								const { submitForm, isSubmitting, isValid } = props;

								return (
									<Form className={classes.form}>
										<Grid container spacing={2}>
											<Grid item xs={12}>
												<Field
													name="title"
													fullWidth
													variant="outlined"
													component={TextField}
													label="Issue title"
												/>
											</Grid>

											<Grid item xs={12}>
												<Field
													fullWidth
													multiline
													rows="4"
													variant="outlined"
													component={TextField}
													label="Write Your Review"
													name="description"
												/>
											</Grid>
										</Grid>

										<Button
											fullWidth
											variant="contained"
											color="primary"
											className={classes.submit}
											disabled={!isValid || buttonText}
											type="submit"
										>
											{buttonText ? (
												<CircularProgress size={24} color="secondary" />
											) : (
												'Submit'
											)}
										</Button>
									</Form>
								);
							}}
						</Formik>
					</div>
				</Container>
			</Dialog>
		</div>
	);
}
