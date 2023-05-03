import React from "react";
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
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import MdAddBox from "@mui/icons-material/AddBox";
import { BeatLoader } from "react-spinners";

export default function Datatable({
  columns,
  rows,
  getRowId,
  setCreateOpen,
  setEditable,
  name,
  isLoading,
  error,

}) {
  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ border: 0, marginBottom: 5, }}>
        <GridToolbarColumnsButton sx={{ color: "black" }} />
        <GridToolbarFilterButton sx={{ color: "black" }} />
        <GridToolbarDensitySelector sx={{ color: "black" }} />
        <GridToolbarExport sx={{ color: "black" }} />
        <GridToolbarQuickFilter sx={{ color: "black" }} />
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="plain"
          onClick={() => {
            setCreateOpen(true), setEditable(true);
          }}
          startIcon={<MdAddBox />}
          sx={{
            mr: 2,
            // height: 30,
            color: "black",
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
          {isLoading ? (
            <Box margin="50vw" marginTop="40vh">
              <BeatLoader color="#1976d2" />
            </Box>
          ) : error ? (
            <Box marginLeft="50vw" marginTop="40vh">
              <Typography variant="h4" color="textSecondary">
                Error fetching data
              </Typography>
            </Box>
          ) : (
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
              // onCellDoubleClick={handleRowClick}
              // onRowDoubleClick={handleRowClick}
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
          )}
        </motion.div>
      </Card>
    </>
  );
}

Datatable.propTypes = {
  columns: PropTypes.array?.isRequired,
  rows: PropTypes.array?.isRequired,
  getRowId: PropTypes.func?.isRequired,
  createOpen: PropTypes.bool?.isRequired,
  setCreateOpen: PropTypes.func?.isRequired,
  editable: PropTypes.bool?.isRequired,
  setEditable: PropTypes.func?.isRequired,
  isLoading: PropTypes.bool?.isRequired,
  error: PropTypes.bool,
  name: PropTypes.string?.isRequired,
};