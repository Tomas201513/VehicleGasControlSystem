  import React, { useState,useEffect } from "react";
// import Pagination from "@mui/material/Pagination";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Container,
  
} from '@mui/material';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import {GetFuelPaginated} from 'src/apis/FuelApi'
import axios from "axios";
import { TokenJson } from "src/apis/token/AuthToken";
import axiosInstance from "src/utils/useAxiosInterceptors";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Warndialogue from "src/components/Warndialogue";

function PaginDatatable({
  handleRowClick,
    setCreateOpen,
  setEditable,
  name,
  SetWarn
}) {

  const [fuelIntakes , setFuelIntakes] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage , setCurrentPage] = useState(0);
  const [totalItem, setTotalItems] = useState(0);
  
  
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fecthFuelIntakes = async () => {
      setLoading(true);
      try {
        const api4 = "http://127.0.0.1:8000/api/fuel/paginated/"
        // const res = await fetch(`${api4}${page}/9`);
        const res = await axiosInstance.get(
          `http://127.0.0.1:8000/api/fuel/paginated/${page}/${rowsPerPage}`);
        console.log('11111111ddddddddddddddddddddooosss',res);

        const { fuelIntakes:fuelIntakes, totalPages: totalPages, currentPage: currentPage ,totalIems} = res.data;
        console.log('datatatatatataat',fuelIntakes);
        console.log('totalPages',totalPages);
        console.log('currentPage',currentPage);

        setFuelIntakes(fuelIntakes);
        setCurrentPage(currentPage);
        setTotalPages(totalPages);
        setTotalItems(totalIems);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError("Some error occured");
      }
    };

    fecthFuelIntakes();
  }, [page, rowsPerPage]);

  //select row
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectRow = (event, id) => {
    const selectedIndex = selectedRows.indexOf(id);
    let newSelectedRows = [];

    if (selectedIndex === -1) {
      newSelectedRows = newSelectedRows.concat(selectedRows, id);
    } else if (selectedIndex === 0) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedRows = newSelectedRows.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }
    console.log("newSelectedRows", newSelectedRows,'selectedRows',selectedRows);

    setSelectedRows(newSelectedRows);
  };



//select all
  const selectedAll = fuelIntakes.length > 0 && selectedRows.length === fuelIntakes.length;
  const selectedSome = selectedRows.length > 0 && selectedRows.length < fuelIntakes.length;

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelectedRows = fuelIntakes.map((fuelIntake) => fuelIntake._id);
      setSelectedRows(newSelectedRows);
      return;
    }
    setSelectedRows([]);
  };


  return (
    <>
      <Box sx={{ overflowX: 'auto', display: 'flex', flexWrap: 'wrap', gap: 2, mt: '5%', 
      ml: '5%', mr: '5%', mb: 5,  flexDirection: "column", height: "100%",  }}>
        <Container maxWidth="xl" >
  
          <Box sx={{ display: "flex", alignItems: "center", }}>
            <Typography
              sx={{
            fontWeight: "bold",
              }}
              variant="h4"
              whitespace="nowrap">
              {name}s
            </Typography>
          <Box sx={{ flexGrow: 1 }} />
         
          <Tooltip title="Add User">
            <Button
              // size={isSmallScreen ? 'medium' : 'small'}
              variant="contained"
              // startIcon={<AddIcon />}
              sx={{
                mr: '5%',
                borderRadius: "25px",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
              onClick={() => {
                setCreateOpen(true), setEditable(true);
              }}
            >
              {"Add"}
            </Button>
          </Tooltip>
           </Box>
           <Box sx={{ display: "flex", alignItems: "center", }}>
            <IconButton onClick={() =>{ SetWarn(true); console.log("wa")}}>
              <AutoDeleteIcon sx={{ color: "red" }} />
            </IconButton>
          </Box>

         <Table>
          <TableHead>
            <TableRow>
            <TableCell padding="checkbox">
     <Checkbox
       checked={selectedAll}
       indeterminate={selectedSome}
       onChange={handleSelectAll}
     />
   </TableCell>

              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  FUEL AMOUNT(L)
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                FILL DATE(GC)
                </Typography>
              </TableCell><TableCell>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  CAR PLATE NO.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  ATTENDANT
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  STATION
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  ACTION
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fuelIntakes?.map((fuelIntake) => (
              <TableRow
                hover
                key={fuelIntake._id}
                selected={selectedRows.indexOf(fuelIntake._id) !== -1}
              >
                <TableCell padding="checkbox">
                <Checkbox
     onChange={(event) => {
       handleSelectRow(event, fuelIntake._id);
     }}
     checked={selectedRows.indexOf(fuelIntake._id) !== -1}
     value="true"
   />

                </TableCell>
                <TableCell>
                 { fuelIntake.fuelAmount}
                </TableCell>
                <TableCell>
                  {fuelIntake.fuelDate}
                </TableCell>
                <TableCell>
                  {fuelIntake.car_id?.plateNumber}
                </TableCell>
                <TableCell>
                  {fuelIntake.attendant?.userName}
                </TableCell>
                <TableCell>
                  {fuelIntake.station?.stationName}
                </TableCell>
                <TableCell style={{ width: 120 }}  >
                <IconButton aria-label="delete" onClick={() => {handleRowClick(fuelIntake)}}>
                  <ArrowForwardIcon />
                </IconButton>
                </TableCell>

               
               </TableRow>
            ))}
          </TableBody>
        </Table>
        </Container>
       <Box sx={{ flexGrow: 1 }} />
       <Box sx={{ mr: '5%' }}>
        <TablePagination
      component="div"
      count={totalItem}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </Box>
      </Box>
       <Warndialogue
       open={warn}
       setOpen={SetWarn}
       name={name}
       action={deleteCar}
       selectedData={selectedData}
   />
   
   </>
  );
}

export default PaginDatatable;
      

                    


