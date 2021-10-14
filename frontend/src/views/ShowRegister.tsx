import React, { FC, useState, Component } from 'react';
import {
  Paper,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Face, Fingerprint } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import { getMessage } from '../utils/api';
import { isAuthenticated } from '../utils/auth';
import provinces from '../data/provinces.json';
import amphures from '../data/amphures.json';
import districts from '../data/districts.json';
import zipcodes from '../data/zipcodes.json';
import { string } from 'yargs';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(1),
  },
  button: {
    textTransform: 'none',
  },
  marginTop: {
    marginTop: 30,
  },
  select: {
    textAlign: 'left',
    float: 'left',
  },
}));

export const ShowRegister: FC = () => {
  const classes = useStyles();
  const history = useHistory();
	const firstname = localStorage.getItem('firstname');
	const lastname = localStorage.getItem('lastname');
	const provinceField = localStorage.getItem('provinceField');
	const amphureField = localStorage.getItem('amphureField');
	const districtField = localStorage.getItem('districtField');
	const zipcodeField = localStorage.getItem('zipcodeField');

  return (
    <>
			<div className={classes.select}>
				ชื่อ : {firstname}<br/>
				นามสกุล : {lastname}<br/>
				ตำบล : {districtField}<br/>
				อำเภอ : {amphureField}<br/>
				จังหวัด : {provinceField}<br/>
				ไปรษณีย์ : {zipcodeField}<br/>
			</div>
    </>
  );
};
