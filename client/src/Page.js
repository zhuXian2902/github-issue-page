/** @format */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: theme.spacing(5),
	},
}));

export default function PaginationControlled({ count, handlePage }) {
	const classes = useStyles();
	const [page, setPage] = React.useState(1);
	const handleChange = (event, value) => {
		setPage(value);
		handlePage(value);
	};

	return (
		<div className={classes.root}>
			<Pagination
				count={count}
				page={page}
				color="secondary"
				onChange={handleChange}
			/>
		</div>
	);
}
