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
import {Export} from "src/components/export/Export";
import {GetFueld} from 'src/apis/FuelApi'
import { useQuery, useMutation } from "react-query";
import DeleteIcon from '@mui/icons-material/Delete';
import {GetFuelPaginated} from 'src/apis/FuelApi'
import axios from "axios";
import { TokenJson } from "src/apis/token/AuthToken";
import axiosInstance from "src/utils/useAxiosInterceptors";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Warndialogue from "src/components/Warndialogue";
import {SearchBar} from "src/components/Search/SearchBar";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PropTypes from 'prop-types';
import SyncIcon from '@mui/icons-material/Sync';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
function PaginDatatable({
  handleRowClick,
  setCreateOpen,
  setEditable,
  warn,
  SetWarn,
  name,
  deleteFuel,
  deleteMultipleFuel,

  isLoading2,
  error2,
  refetch2,
  fuelIntake2,
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
  selectedRows,
  setSelectedRows,
  setSearchKeyword,
  searchKeyword,
  loading,
  setLoading,

}) {

   const [dense, setDense] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //select row
  
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

    setSelectedRows(newSelectedRows);
  };
  

  useEffect(() => {
    const fecthFuelIntakes = async () => {
      setLoading(true);

      try {

        refetch2();
        setLoading(false);

      } catch (error) {

        setLoading(false);
        // setError("Some error occured");
      }
    };
    
    fecthFuelIntakes();
  }, [page, rowsPerPage, searchKeyword, selectedRows]);
  
  //select all
  const selectedAll = fuelIntake2?.fuelIntakes?.length > 0 && selectedRows?.length === fuelIntake2?.fuelIntakes?.length;
  const selectedSome = fuelIntake2?.selectedRows?.length > 0 && selectedRows?.length < fuelIntake2?.fuelIntakes?.length;

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelectedRows = fuelIntake2?.fuelIntakes.map((fuelIntake) => fuelIntake._id);
      setSelectedRows(newSelectedRows);
      return;
    }
    setSelectedRows([]);
  };
  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: '5%', 
      ml: '5%', mr: '5%', mb: 5,  flexDirection: "column", }}>
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
                borderRadius: "12px",
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


           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: '2%', mb: 5, }}>
           <Tooltip title="Row width">
            <Button
              sx={{color:  "black"}}
              variant="text" 
              onClick={() => setDense((prev) => !prev)}
              startIcon={dense ? <DensityMediumIcon  /> : <FormatAlignJustifyIcon />}>
              {" DENSITY"}
            </Button>
          </Tooltip>
            <Export/>
          <Tooltip title="Delete Selected">
            <Button 
            onClick={() =>{ 
              if(selectedRows.length > 0){
                SetWarn(true);
              }else{
                alert("Please select a row")
              }
            }} 
            sx={{color: "black"}}
             variant="text" startIcon={<DeleteIcon />}>
              {" DELETE"}
            </Button>
          </Tooltip>
          <Tooltip title="Refresh">
            <Button onClick={() =>{refetch2();}}
                sx={{color:  "black"}}
                variant="text" startIcon={<SyncIcon />}>
                {" SYNC"}
              </Button>
          </Tooltip>

          <Box sx={{ flexGrow: 1,}} />
          <SearchBar setSearchKeyword={setSearchKeyword} refetch2={refetch2} />
          </Box>

         <Table size={dense ? 'small': 'medium'}>
          <TableHead>
            <TableRow  sx={{ color: "black", weight: "bold" }}>
            <TableCell padding="checkbox">
     <Checkbox
       checked={selectedAll}
       indeterminate={selectedSome}
       onChange={handleSelectAll}
     />
   </TableCell>

              <TableCell>
                <Typography
                  variant="subtitle2"
                >
                  FUEL AMOUNT(L)
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="subtitle2"
                >
                FILL DATE(GC)
                </Typography>
              </TableCell><TableCell>
                <Typography
                  variant="subtitle2"
                >
                  CAR PLATE NO.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="subtitle2"
                >
                  ATTENDANT
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="subtitle2"
                >
                  STATION
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="subtitle2"
                >
                  ACTION
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fuelIntake2?.fuelIntakes?.map((fuelIntake) => (
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
                  {new Date(fuelIntake.fuelDate).toLocaleString()}
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
      count={fuelIntake2?.totalIems}
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
       action={deleteMultipleFuel}
      //  refetch={refetch}
      //  selectedData={selectedData}
       selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
   />
   
   </>
  );
}

export default PaginDatatable;

PaginDatatable.propTypes = {
  fuelIntakes: PropTypes.array,
  name: PropTypes.string,
  setCreateOpen: PropTypes.func,
  setEditable: PropTypes.func,
  handleRowClick: PropTypes.func,
  deleteMultipleFuel: PropTypes.func,
  fuelIntake2: PropTypes.object,
  page: PropTypes.number,
  setPage: PropTypes.func,
  rowsPerPage: PropTypes.number,
  setRowsPerPage: PropTypes.func,
  selectedRows: PropTypes.array,
  setSelectedRows: PropTypes.func,
  selectedAll: PropTypes.bool,
  selectedSome: PropTypes.bool,
  handleSelectAll: PropTypes.func,
  handleSelectRow: PropTypes.func,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
  setSearchKeyword: PropTypes.func,
  warn: PropTypes.bool,
  SetWarn: PropTypes.func,
  refetch: PropTypes.func,
  selectedData: PropTypes.array,
  deleteFuel: PropTypes.func,
  isLoading2: PropTypes.bool,
  isLoading: PropTypes.bool,
  error2: PropTypes.object,
  refetch2: PropTypes.func,
  searchKeyword: PropTypes.string,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,


};




      

                    


