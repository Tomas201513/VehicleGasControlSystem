import React from 'react'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid';

function Cars() {
  const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'age', headerName: 'Age', width: 100 },
  { field: 'city', headerName: 'City', width: 150 },
];

const rows = [
  { id: 1, name: 'John Doe', age: 30, city: 'New York' },
  { id: 2, name: 'Jane Smith', age: 25, city: 'Los Angeles' },
  { id: 3, name: 'Michael Johnson', age: 45, city: 'Chicago' },
];
  return (
    <>
        <Box sx={{ p: 3 , height: '100vh', background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%)'}}>
           
                <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />

            </Box>

    </>
  )
}

export default Cars

