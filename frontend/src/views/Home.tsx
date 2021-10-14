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
  label: {
    fontSize: '16px',
  }
}));

export const Home: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState<string>('');
  const plsSelect = '-- กรุณาเลือก --';

  const amphureRef = React.createRef();

  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [provinceField, setProvinceField] = useState<string>('');
  const [amphureField, setAmphureField] = useState<string>('');
  const [districtField, setDistrictField] = useState<string>('');
  const [zipcodeField, setZipcodeField] = useState<string>('');
  const [province, setProvince] = useState<string>('-1');
  const [amphure, setAmphure] = useState<string>('-1');
  const [district, setDistrict] = useState<string>('-1');
  const [zipcode, setZipcode] = useState<string>('-1');

  const [viewAmphure, setViewAmphure] = useState([{id:'', name:''}]);
  const [viewDistrict, setViewDistrict] = useState([{id:'', name:''}]);
  const [viewZipcode, setViewZipcode] = useState([{id:'', name:''}]);

  var showProvince = [{id:'', name:plsSelect}];
  showProvince = [];
  var arrTemp = [{id:'', name:plsSelect}];
  arrTemp = [];

  provinces.map((data, key) => {
    showProvince.push({id:data.province_id, name:data.province_name})
  });
  showProvince.sort((a,b) => a.name > b.name ? 1 : - 1)

  const provinceChange = async (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    var id = event.target.value as string;
    console.log('province id : ', id);
    setProvinceField(provinces.filter(item => item.province_id===id)[0].province_name);
    setProvince(id);
    arrTemp = [];
    await amphures.map((data, key) => {
      if(data.province_id == id) {
        arrTemp.push({id:data.amphur_id, name:data.amphur_name});
      }
    })
    arrTemp.sort((a,b) => a.name > b.name ? 1 : - 1);
    setAmphure('-1');
    setViewAmphure(arrTemp);
  };

  const amphureChange = async (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    var id = event.target.value as string;
    console.log('amphure id : ', id);
    setAmphureField(amphures.filter(item => item.amphur_id===id)[0].amphur_name);
    setAmphure(id);
    arrTemp = [];
    districts.map((data, key) => {
      if(data.amphur_id == id) {
        arrTemp.push({id:data.district_code, name:data.district_name});
      }
    });
    arrTemp.sort((a,b) => a.name > b.name ? 1 : - 1);
    setDistrict('-1');
    setViewDistrict(arrTemp);
  };

  const districtChange = async (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    var id = event.target.value as string;
    console.log('district id : ', id);
    setDistrictField(districts.filter(item => item.district_code===id)[0].district_name);
    setDistrict(id);
    arrTemp = [];
    zipcodes.map((data, key) => {
      if(data.district_code == id) {
        arrTemp.push({id:data.zipcode_id, name:data.zipcode_name});
      }
    });
    arrTemp.sort((a,b) => a.name > b.name ? 1 : - 1);
    setZipcode('-1');
    setViewZipcode(arrTemp);
  };

  const zipcodeChange = async (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    var id = event.target.value as string;
    console.log('zipcode id : ', id);
    setZipcodeField(zipcodes.filter(item => item.zipcode_id===id)[0].zipcode_name);
    setZipcode(id);
  };
  
  const handleSubmit = async (_: React.MouseEvent) => {
    setError('');
    try {
      if(firstname == '' || lastname == '' || provinceField == '' || amphureField == '' || districtField == '' || zipcodeField == '') {
        setError('กรุณากรอกข้อมูลให้ครบ');
      } else {
        localStorage.setItem('firstname', firstname);
        localStorage.setItem('lastname', lastname);
        localStorage.setItem('provinceField', provinceField);
        localStorage.setItem('amphureField', amphureField);
        localStorage.setItem('districtField', districtField);
        localStorage.setItem('zipcodeField', zipcodeField);
        history.push('/showRegister');
      }
    } catch (err: any) {
      
    }
  };

  return (
    <Paper className={classes.padding}>
      <div className={classes.margin}>
      <h3>ลงทะเบียน</h3>

      <Grid container spacing={8} alignItems='flex-end'>
          <Grid item>
            <label className={classes.label}>ชื่อ  </label>
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField
              id='firstname'
              label='ชื่อ'
              type='text'
              value={firstname}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFirstname(e.currentTarget.value)
              }
              fullWidth
              autoFocus
              required
            />
          </Grid>
        </Grid>

        <Grid container spacing={8} alignItems='flex-end'>
          <Grid item>
          <label className={classes.label}>นามสกุล</label>
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField
              id='lastname'
              label='นามสกุล'
              type='text'
              value={lastname}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLastname(e.currentTarget.value)
              }
              fullWidth
              required
            />
          </Grid>
        </Grid>
        
        <Grid container spacing={8} alignItems='flex-end'>
          <Grid item>
          <label className={classes.label}>จังหวัด</label>
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <Select
              className={classes.select}
              id='province'
              value={province}
              label='จังหวัด'
              fullWidth
              required
              onChange={event => provinceChange(event)}
            >
              <MenuItem value={-1}>{plsSelect}</MenuItem>
              {showProvince.map((data, key) => { return <MenuItem value={data.id}>{data.name}</MenuItem> })}
            </Select>
          </Grid>
        </Grid>

        <Grid container spacing={8} alignItems='flex-end'>
          <Grid item>
          <label className={classes.label}>อำเภอ / เขต</label>
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <Select
              className={classes.select}
              id='amphure'
              value={amphure}
              label='อำเภอ / เขต'
              fullWidth
              required
              onChange={event => amphureChange(event)}
            >
              <MenuItem value={-1}>{plsSelect}</MenuItem>
              {viewAmphure.map((data, key) => { return <MenuItem value={data.id}>{data.name}</MenuItem> })}
            </Select>
          </Grid>
        </Grid>
        
        <Grid container spacing={8} alignItems='flex-end'>
          <Grid item>
          <label className={classes.label}>ตำบล / แขวง</label>
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <Select
              className={classes.select}
              id='district'
              value={district}
              label='ตำบล / แขวน'
              fullWidth
              required
              onChange={event => districtChange(event)}
            >
              <MenuItem value={-1}>{plsSelect}</MenuItem>
              {viewDistrict.map((data, key) => { return <MenuItem value={data.id}>{data.name}</MenuItem> })}
            </Select>
          </Grid>
        </Grid>
        
        <Grid container spacing={8} alignItems='flex-end'>
          <Grid item>
          <label className={classes.label}>รหัสไปรษณีย์</label>
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <Select
              className={classes.select}
              id='zipcode'
              value={zipcode}
              label='รหัสไปรษณีย์'
              fullWidth
              required
              onChange={event => zipcodeChange(event)}
            >
              <MenuItem value={-1}>{plsSelect}</MenuItem>
              {viewZipcode.map((data, key) => { return <MenuItem value={data.id}>{data.name}</MenuItem> })}
            </Select>
          </Grid>
        </Grid>

        
        <br />
        <Grid container alignItems='center'>
          {error && (
            <Grid item md={true} sm={true} xs={true}>
              <Alert variant='filled' severity='error'>{error}</Alert>
            </Grid>
          )}
        </Grid>

        <Grid container justify='center' className={classes.marginTop}>
          {' '}
          <Button
            variant='outlined'
            color='primary'
            className={classes.button}
            onClick={handleSubmit}
          >
            ลงทะเบียน
          </Button>
        </Grid>
      </div>
    </Paper>
  );
};
