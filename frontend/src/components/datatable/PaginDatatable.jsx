  import React, { useState,useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import {Box}  from '@mui/material'; 
import {GetFuelPaginated} from 'src/apis/FuelApi'
import TablePagination from '@mui/material/TablePagination';


function PaginDatatable({ rows: data}) {

  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%',ml:10}}>
      <ul>
        {paginatedItems?.map((item, index) => (
          <li key={index}>{item.car_id.plateNumber}</li>
        ))}
      </ul>
      <TablePagination
        component="div"
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default PaginDatatable

