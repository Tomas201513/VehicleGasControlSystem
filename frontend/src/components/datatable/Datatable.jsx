import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import {
  Box,
  Card,
  Grid,
  Button,
  IconButton,
  Tooltip,
  Container,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { motion } from "framer-motion";
import MdAddBox from "@mui/icons-material/AddBox";
import { margin } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateUpdateUser from "src/pages/user/CreateUpdateUser"


export default function Datatable ({columns, rows,getRowId}) {
  const [ createOpen , setCreateOpen ] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [editable, setEditable] = useState(false);
 
  const handleRowClick = (params) => {
    setSelectedUserData(params.row);
    console.log(params.row);
  };
  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ border: 0, marginBottom: 5 }}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <GridToolbarQuickFilter />
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="plain"
          onClick={() => setCreateOpen(true)}
          startIcon={<MdAddBox />}
          sx={{
            mr: 2,
            // height: 30,
            color: "#1976d2",
            // backgroundColor: "#1976d2",
            // "&:hover": {
            //   backgroundColor: "#1976d2",
            //   color: "#fff",
            // },
          }}
        >
          {`Create User ${name}`}
        </Button>
        {/* <Box sx={{ marginLeft: 200 }} /> */}
      </GridToolbarContainer>
    );
  }
  
  return (
    <>
      {createOpen || selectedUserData ? (
        <Container maxWidth="md" sx={{ marginTop: "2vh" }}>
          <Tooltip title="Back">
            <IconButton
              onClick={() => {
                setSelectedUserData(null), setEditable(false), setCreateOpen(false);
              }}
              size="small"
            >
              <ArrowBackIcon size="small" />
            </IconButton>
          </Tooltip>
          
         {selectedUserData ?(<> <Tooltip title="Editable">
            <FormControlLabel
              control={<Switch />}
              label="edit"
              onChange={() => setEditable(!editable)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" onClick={() => console.log("delete" + selectedUserData._id)}>
              <DeleteIcon size="small" />
            </IconButton>
          </Tooltip></>):(<></>)}
          <CreateUpdateUser selectedUserData={selectedUserData} editable={editable} />
        </Container>
      ) : (
        // <Box sx={{ height: "100vh" }} >
        //   <IconButton
        //     onClick={() => {
        //       setSelectedUserData(null);
        //     }}
        //     size="small"
        //   >
        //     <ArrowBackIcon size="small" />
        //   </IconButton>
        //   <CreateUpdateUser selectedUserData={selectedUserData} />

        // </Box>
        <Card
          style={{
            height: "200vh",
            width: "100%",
            marginTop: "2vh",
            // marginLeft: "5%",
            // marginRight: "5%",
            // backgroundColor: "red",
            boarder: 0,
            // boarderColor: "#fff",
            shadow: 0,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.99, height: "70vh" }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <DataGrid
              sx={{
                // backgroundColor: "red",
                border: 0,
                boxShadow: 0,
                borderColor: "#fff",
                ml: 4,
                mr: 4,
                height: "85vh",
                "& .MuiDataGrid-columnHeaders": {
                  fontWeight: "normal",
                },
              }}
              columns={columns}
              rows={rows}
              getRowId={getRowId}
              pageSize={10}
              // checkboxSelection
              // onRowClick={handleRowClick}
              onRowDoubleClick={handleRowClick}
              // editMode="row"
              rowHeight={60}
              slots={{
                toolbar: CustomToolbar,
              }}
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    _id: false,
                  },
                },
              }}
            />
          </motion.div>
        </Card>
      )}
      {/* <Mypopover
        open={open}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        handleEditOpen={handleEditOpen}
        handleDeleteOpen={handleDeleteOpen}
      /> */}
    </>
  );
}

Datatable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  getRowId: PropTypes.func.isRequired,
};