import React, { useState } from 'react';
import { Button, Card, CardContent, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import shortid from 'shortid';

import { useDispatch } from 'react-redux';
import { empRegister } from '../redux/action';




// const useStyles = makeStyles(theme => ({
//     root: {
//         '& .MuiFormControl-root': {
//             width: '30ch',
//             marginTop: theme.spacing(3),
//             marginLeft: theme.spacing(62),
//             padding: theme.spacing(0)
//         }
//     }
// }))



const AddEmployee = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(
        {
            name: '',
            empName: '',
            email: '',
            phone: '',
            sales: ''
        })

    let navigate = useNavigate();


    const contacts = useSelector((state) => state);

     //const classes = useStyles();

    const { empName, email, phone, sales } = user;


    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })

    }

    const handleSubmit = async () => {
        Object.assign(user, { id: shortid.generate() })
        dispatch(empRegister(user));
        
        //console.log(user)
        navigate("/");

    }

    return (
        <div className='App'>
            
            <Card style={{maxWidth: 450, margin:"0 auto", padding:"20px 10px", backgroundColor:'whitesmoke', marginTop:"100px"}}>
                <CardContent>
                <Typography gutterBottom variant='h5' align='center'>
                Add New Staff
            </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        
                            <Grid item xs={12}>
                                <TextField
                                    variant='outlined'
                                    name='empName'
                                    type='text'
                                    label='Emp Name'
                                    placeholder='Enter Employee Name'
                                    value={empName}
                                    onChange={handleInputChange}
                                    fullWidth required
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    variant='outlined'
                                    label='Email'
                                    type='email'
                                    placeholder='Enter Email'
                                    name='email'
                                    value={email}
                                    onChange={handleInputChange}
                                    fullWidth required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <TextField
                                    variant='outlined'
                                    label='Phone'
                                    type='number'
                                    placeholder='Enter Phone Number'
                                    name='phone'
                                    value={phone}
                                    onChange={handleInputChange}
                                    fullWidth required
                                />
                            </Grid>
                            <Grid xs={12}  sm={6}item>
                                <TextField
                                    variant='outlined'
                                    label='Sales'
                                    type='number'
                                    placeholder='Enter Sales'
                                    name='sales'
                                    value={sales}
                                    onChange={handleInputChange}
                                    fullWidth required
                                />
                            </Grid>
                            <Grid xs={12} >
                                <Button

                                    // style={{ width: "100px", marginLeft:'500px' }}
                                    variant='contained'
                                    type="submit"
                                    color="primary"
                                    onChange={handleInputChange}
                                    fullWidth

                                >
                                    Save
                                </Button>

                            </Grid>
                  {/* </form> */}
                    </Grid>
                  </form>
                </CardContent>
            </Card>



            {/* <form onSubmit={handleSubmit}>
                <Grid container>

                    <Grid item xs={12} sm={6}>
                        
                        <TextField
                            variant='outlined'
                            label='Email'
                            placeholder='Enter Email'
                            name='email'
                            value={email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant='outlined'
                            label='Phone'
                            placeholder='Enter Phone Number'
                            name='phone'
                            value={phone}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant='outlined'
                            label='Sales'
                            placeholder='Enter Sales'
                            name='sales'
                            value={sales}
                            onChange={handleInputChange}
                        />
                      <br/><br/>
                        <Button
                            
                            style={{ width: "100px", marginLeft:'500px' }}
                            variant='contained'
                            type="submit"
                            color="primary"
                            onChange={handleInputChange}

                        >
                            Save
                        </Button>
                    </Grid>
                </Grid> */}
        {/* </form> */}

        </div >
    )
}

export default AddEmployee