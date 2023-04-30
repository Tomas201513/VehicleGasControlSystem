import React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Box, Card, Button } from "@mui/material";
import { motion } from "framer-motion";
import AuthContext from "src/context/AuthContext";
// import ServiceContext from "../../context/service/ServiceContext";
import MdAddBox from "@mui/icons-material/AddBox";
import Mypopover from "./Mypopover";
export default function Datatable({
  rows,
  columns,
  open,
  handleClickOpen,
  handleEditOpen,
  handleDeleteOpen,
  handleCreateopen,
  handleClose,
  name,
}) {
  // const { handleCreateopen, rows } = React.useContext(ServiceContext);
  function CustomToolbar() {
    const { use, is_superuser, is_staff } = React.useContext(AuthContext);

    return (
      <GridToolbarContainer sx={{ mb: 2 }}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Box sx={{ flexGrow: 1 }} />
        <GridToolbarQuickFilter sx={{ width: 180 }} />

        {(is_staff && name === "Certificate") || is_superuser ? (
          <Button
            variant="plain"
            onClick={handleCreateopen}
            startIcon={<MdAddBox />}
            sx={{
              color: "primary.main",
              mr: 2,
            }}
          >
            {` New ${name}`}
          </Button>
        ) : null}
      </GridToolbarContainer>
    );
  }
  return (
    <>
      <Card
        style={{
          height: "93%",
          width: "90%",
          marginTop: "5vh",
          marginLeft: "5%",
          marginRight: "5%",
          backgroundColor: "#fff",
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
              borderColor: "#e8ebee",
              boxShadow: 0,
              ml: 4,
              mr: 4,
              height: "100%",
            }}
            columns={columns}
            rows={rows}
            pageSize={10}
            // checkboxSelection
            editMode="row"
            getRowId={(row) => row.id}
            rowHeight={40}
            slots={{
              toolbar: CustomToolbar,
            }}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
            }}
          />
        </motion.div>
      </Card>

      <Mypopover
        open={open}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        handleEditOpen={handleEditOpen}
        handleDeleteOpen={handleDeleteOpen}
      />
    </>
  );
}
