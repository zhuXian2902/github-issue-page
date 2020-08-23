/** @format */

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';
import { getAllissues, deleteIssue } from './helpers';
import Update from './Update';
import { toast, ToastContainer } from 'react-toastify';
import Loading from './Loading';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function AllList({ value, open, page }) {
	const classes = useStyles();
	const [issues, setIssues] = useState([]);
	const [open1, setOpen1] = useState(false);
	const [change, setChange] = useState(false);
	const [id, setId] = useState('');
	const [loading, setLoading] = useState(false);

	const handleUpdate = (id) => {
		setOpen1(true);
		setId(id);
	};

	const handleClose1 = () => {
		setOpen1(false);
		setChange(!change);
	};

	const getIssues = async () => {
		setLoading(true);
		const data = await getAllissues(value, page);
		setIssues(data.data);
		setLoading(false);
	};

	const handleDelete = async (e, id) => {
		e.stopPropagation();
		await deleteIssue(id);
		toast.success('issue deleted successfully', {
			position: 'top-center',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
			progress: undefined,
		});
		setChange(!change);
	};

	useEffect(() => {
		getIssues();
	}, [value, change, open, page]);

	return (
		<>
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
			<Loading loading={loading} />
			{id && (
				<Update
					open1={open1}
					handleClose1={handleClose1}
					id={id}
					change={change}
					setChange={setChange}
				/>
			)}
			<List component="nav" className={classes.root}>
				{issues.map((issue) => (
					<React.Fragment key={issue._id}>
						<ListItem button onClick={() => handleUpdate(issue._id)}>
							<ListItemText inset primary={issue.title} />
							<Chip
								onClick={(e) => handleDelete(e, issue._id)}
								variant="outlined"
								color="secondary"
								label="Delete"
							/>
						</ListItem>
						<Divider />
					</React.Fragment>
				))}
			</List>
		</>
	);
}
