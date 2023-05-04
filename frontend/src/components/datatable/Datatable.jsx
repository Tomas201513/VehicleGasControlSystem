import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
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
  Container,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
// import MdAddBox from "@mui/icons-material/AddBox";
import { BeatLoader } from "react-spinners";
import AddIcon from '@mui/icons-material/Add';
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
      <GridToolbarContainer sx={{ mb: 5, width: 'auto' }}>
        <Stack direction="row" spacing={2}>
          <Stack direction="column" spacing={5}>
            <Box >
              <GridToolbarColumnsButton sx={{ color: "black" }} />
              <GridToolbarFilterButton sx={{ color: "black" }} />
              <GridToolbarDensitySelector sx={{ color: "black" }} />
              <GridToolbarExport sx={{ color: "black" }} />
            </Box>
          </Stack>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={2}>
          <Stack direction="column" spacing={2}>

            <GridToolbarQuickFilter sx={{ color: "black" }} />
          </Stack>
        </Stack>
      </GridToolbarContainer>

    );
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ marginTop: "5vh" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 5 }}>
          <Typography sx={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#58595b",

          }}>{name}</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            size="large"
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: "20px",
              backgroundColor: "#1976d2",
            }}
            onClick={() => {
              setCreateOpen(true), setEditable(true);
            }}
          >
            {"Add"}
          </Button>
        </Box>
        < Box sx={{ flexGrow: 1 }} />
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
                // ml: 4,
                // mr: 4,
                height: "85vh",
                "& .MuiDataGrid-columnHeaders": {
                  fontWeight: "normal",
                },
              }}
              columns={columns}
              rows={rows}
              getRowId={getRowId}
              pageSize={10}
              density="comfortable"
              checkboxSelection
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
      </Container>
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