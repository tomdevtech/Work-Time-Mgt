import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  employeeNo: yup.string().required('Employee number is required'),
  surname: yup.string().required('Surname is required'),
  lastName: yup.string().required('Last name is required'),
  role: yup.string().required('Role is required'),
  streetName: yup.string().required('Street name is required'),
  zipCode: yup.string().required('Zip code is required'),
  city: yup.string().required('City is required'),
  totalCountHoursPerMonth: yup
    .number()
    .required('Total hours per month is required')
    .min(0, 'Hours must be positive'),
});

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const formik = useFormik({
    initialValues: {
      employeeNo: '',
      surname: '',
      lastName: '',
      role: '',
      streetName: '',
      zipCode: '',
      city: '',
      totalCountHoursPerMonth: 160,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (selectedEmployee) {
          await axios.patch(`http://localhost:3000/api/employees/${selectedEmployee.employeeNo}`, values);
        } else {
          await axios.post('http://localhost:3000/api/employees', values);
        }
        fetchEmployees();
        handleClose();
      } catch (error) {
        console.error('Error saving employee:', error);
      }
    },
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleOpen = (employee = null) => {
    setSelectedEmployee(employee);
    if (employee) {
      formik.setValues(employee);
    } else {
      formik.resetForm();
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEmployee(null);
    formik.resetForm();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const columns = [
    { field: 'employeeNo', headerName: 'Employee No', width: 130 },
    { field: 'surname', headerName: 'Surname', width: 130 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    { field: 'role', headerName: 'Role', width: 130 },
    { field: 'city', headerName: 'City', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleOpen(params.row)}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.employeeNo)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Employees</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add Employee
        </Button>
      </Box>

      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={employees}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>
            {selectedEmployee ? 'Edit Employee' : 'Add Employee'}
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Employee Number"
              name="employeeNo"
              value={formik.values.employeeNo}
              onChange={formik.handleChange}
              error={formik.touched.employeeNo && Boolean(formik.errors.employeeNo)}
              helperText={formik.touched.employeeNo && formik.errors.employeeNo}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Surname"
              name="surname"
              value={formik.values.surname}
              onChange={formik.handleChange}
              error={formik.touched.surname && Boolean(formik.errors.surname)}
              helperText={formik.touched.surname && formik.errors.surname}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Last Name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Street Name"
              name="streetName"
              value={formik.values.streetName}
              onChange={formik.handleChange}
              error={formik.touched.streetName && Boolean(formik.errors.streetName)}
              helperText={formik.touched.streetName && formik.errors.streetName}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Zip Code"
              name="zipCode"
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
              helperText={formik.touched.zipCode && formik.errors.zipCode}
            />
            <TextField
              fullWidth
              margin="normal"
              label="City"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Total Hours Per Month"
              name="totalCountHoursPerMonth"
              type="number"
              value={formik.values.totalCountHoursPerMonth}
              onChange={formik.handleChange}
              error={
                formik.touched.totalCountHoursPerMonth &&
                Boolean(formik.errors.totalCountHoursPerMonth)
              }
              helperText={
                formik.touched.totalCountHoursPerMonth &&
                formik.errors.totalCountHoursPerMonth
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {selectedEmployee ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default EmployeeList; 