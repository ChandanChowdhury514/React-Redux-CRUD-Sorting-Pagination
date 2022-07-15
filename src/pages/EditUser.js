import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { empRegister} from '../redux/action'
//import { updateUser } from '../redux/action';
import { useEffect } from 'react';


const useStyles = makeStyles(theme => ({
  root: {
      '& .MuiFormControl-root': {
          width: '45ch',
          marginTop: theme.spacing(3),
          marginLeft: theme.spacing(62),
          padding: theme.spacing(0)
      }
  }
}))



const EditUser = () => {
const [empName, setEmpName]= useState("");
const [email, setEmail] = useState("");
const [phone, setPhone]= useState("");
const [sales, setSales] = useState("");

const employees = useSelector(state =>{
  return state.emp.items;
})

const dispatch = useDispatch();

const navigate = useNavigate();

const currentEmployee = employees.find(employee=> employee.id === parseInt(id));

useEffect(() =>{
  if(currentEmployee) {
    setEmpName(currentEmployee.empName);
    setEmail(currentEmployee.email);
    setPhone(currentEmployee.phone);
    setSales(currentEmployee.sales)
  }
}, [currentEmployee])

  const { id } = useParams();
  const classes = useStyles();

  const handleSubmit = (e) =>{
    e.preventDefault();

    const data = {
      id: parseInt(id),
      empName,
      email,
      phone,
      sales
    }
    dispatch({type: "UPDATE_USER", payload: data})
    navigate("/") 
  }



 

  return (
    <div className='App'>
    <h1>Edit Employee</h1>
      {
        currentEmployee ? (
          <>

            <form className={classes.root} onSubmit ={handleSubmit}>
              <Grid container>

                <Grid item xs={6}>
                  <TextField
                    variant='outlined'
                    name='empName'
                    label='Emp Name'
                    value={empName}
                    onChange={(e) => setEmpName(e.target.value)}
                  />
                  <TextField
                    variant='outlined'
                    label='Email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    variant='outlined'
                    label='Phone'
                    name='phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <TextField
                    variant='outlined'
                    label='Sales'
                    name='sales'
                    value={sales}
                    onChange={(e) => setSales(e.target.value)}
                  />
                  <br /><br />
                  <Button

                    style={{ width: "100px", marginLeft: '500px' }}
                    variant='contained'
                    type="submit"
                    value="Update Employee"
                    color="primary"
                    
                  >
                    Update Emp
                  </Button>
                  <Link to="/">Cancel</Link>
                </Grid>
              </Grid>
            </form>
          </>
        ) : (
          <h1>Employee with  id {id} is not exists</h1>
        )}

    </div>
  )

}

export default EditUser;