import React, { useState } from 'react';
//import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//import { TableSortLabel } from '@material-ui/core';
import { TablePagination, TableSortLabel } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { deleteUser, updateUser } from '../redux/action';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.green,

    color: theme.palette.common.red,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));





const ViewEmp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector((state) => {
    return state.emp.items;
  })

  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);


  const [orderDirection, setOrderDirection] = useState('asc');
  const [valueToOrderBy, setValueToOrderBy] = useState('email');


  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }




  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0)
  }


  const TblPagination = () => (<TablePagination
    component='div'
    page={page}
    rowsPerPageOptions={pages}
    rowsPerPage={rowsPerPage}
    count={userList.length}
    onChangePage={handleChangePage}
    onChangeRowsPerPage={handleChangeRowPerPage}
  />)

  const recordsAfterPagingAndSorting = () => {
    //return userList.slice(page*rowsPerPage, (page+1)*rowsPerPage)  //---for pgination
    return stableSort(userList, getComparator(orderDirection, valueToOrderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage)
  }


  const confirm = () => {
    navigate("/addUser")
  }


  const handleDelete = (id) => {
    if (window.confirm("Are you sure wanted to delete the card?")) {
      dispatch(deleteUser(id))
    }
  }

  const handleEdit = (id => {
    dispatch(updateUser(id))
    navigate("/edit/:id")
  })



  const handleRequestSort =(event, property) =>{
    const isAscending = (valueToOrderBy === property && orderDirection === 'asc')
    setValueToOrderBy(property)
    setOrderDirection(isAscending ? 'desc' : 'asc')
  }

  const createSortHandler = (property) => (event) =>{
    handleRequestSort(event, property)
  }

  return (

    <div>
      <h2>View All Staff</h2>
      <div className='btn'>
        <Button variant='contained'
          color="primary"
          onClick={confirm}
        >Back</Button>
      </div>
      <br />

      <TableContainer component={Paper}>

        <Table sx={{ minWidth: 900 }} aria-label="customized table">
          <TableHead  
           valueToOrderBy = {valueToOrderBy}
           orderDirection = {orderDirection}
           handleRequestSort = {handleRequestSort}
          >
            

            <TableRow>
            <StyledTableCell align="center">Id</StyledTableCell>
              <StyledTableCell align="center">Employee Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Phone</StyledTableCell>

              <StyledTableCell align="center" key='sales'>
              <TableSortLabel
              active={valueToOrderBy === "sales"}
              direction={valueToOrderBy === "sales" ? orderDirection: 'asc'}
             onClick={createSortHandler("sales")}
              >Sales </TableSortLabel>
              </StyledTableCell>
             
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          
            {recordsAfterPagingAndSorting().map((empData, id) => (
              <StyledTableRow key={id}>
                <StyledTableCell align='center'>{id +1}</StyledTableCell>
                <StyledTableCell align="center">{empData.empName}</StyledTableCell>
                <StyledTableCell align="center">{empData.email}</StyledTableCell>
                <StyledTableCell align="center">{empData.phone}</StyledTableCell>
                <StyledTableCell align="center">{empData.sales}</StyledTableCell>
                <StyledTableCell align="center">
                  <ButtonGroup variant="contained"
                    aria-label="contained primary button group">
                    <Button
                      style={{ marginRight: "5px" }}
                      onClick={() => handleDelete(empData.id)}
                      color="secondary">Delete</Button>
                    
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TblPagination />
    </div>
  )
}


export default ViewEmp;