/** @format */

import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AllList from './AllList';
import axios from 'axios';
import CreateIssue from './CreateIssue';
import Page from './Page';
import { getAllissues } from './helpers';
import Loading from './Loading';

const useStyles = makeStyles((theme) => ({
	formControl: {
		display: 'flex',
		flexDirection: 'row',
	},
	button: {
		margin: theme.spacing(1, 1, 0, 0),
	},
}));

axios.interceptors.response.use(null, (error) => {
	return Promise.reject(error);
});

export default function App() {
	const classes = useStyles();
	const [value, setValue] = React.useState('All');
	const [open, setOpen] = useState(false);
	const [change, setChange] = useState(false);
	const [page, setPage] = useState(1);
	const [pages, setPages] = useState(0);
	const [loading, setLoading] = useState(false);

	const handleRadioChange = (event) => {
		setValue(event.target.value);
	};

	const getSize = async () => {
		setLoading(true);
		const res = await getAllissues();
		setLoading(false);
		setPages(Math.ceil(res.data.length / 6));
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		getSize();
	}, [open]);

	const handlePage = (pagenum) => {
		setPage(pagenum);
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<Loading loading={loading} />
			<Container maxWidth="md">
				<Box component="span">
					<form
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							margin: '10px',
						}}
					>
						<FormControl component="fieldset" className={classes.formControl}>
							<RadioGroup
								style={{ display: 'inline' }}
								name="filter"
								value={value}
								onChange={handleRadioChange}
							>
								<FormControlLabel value="All" control={<Radio />} label="All" />
								<FormControlLabel value="isOpen" control={<Radio />} label="isOpen" />
								<FormControlLabel
									value="isClosed"
									control={<Radio />}
									label="isClosed"
								/>
							</RadioGroup>
						</FormControl>
						<Button
							variant="outlined"
							color="primary"
							className={classes.button}
							onClick={() => setOpen(true)}
						>
							Create Issue
						</Button>
					</form>
					<Divider />
				</Box>
				{open && (
					<CreateIssue open={open} setOpen={setOpen} handleClose={handleClose} />
				)}
				<AllList page={page} value={value} open={open} />
				<Page count={pages} handlePage={(page) => handlePage(page)} />
			</Container>
		</React.Fragment>
	);
}
