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
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import MdAddBox from "@mui/icons-material/AddBox";
export default function Datatable ({columns, rows,getRowId,createOpen,setCreateOpen,setselectedData,setsetselectedData,editable,setEditable}) {

 
  const handleRowClick = (params) => {
    setsetselectedData(params.row);
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
          onClick={() => {setCreateOpen(true), setEditable(true)}}
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
    </>
  );
}

Datatable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  getRowId: PropTypes.func.isRequired,
  createOpen: PropTypes.bool.isRequired,
  setCreateOpen: PropTypes.func.isRequired,
  setselectedData: PropTypes.object.isRequired,
  setsetselectedData: PropTypes.func.isRequired,
  editable: PropTypes.bool.isRequired,
  setEditable: PropTypes.func.isRequired,
};