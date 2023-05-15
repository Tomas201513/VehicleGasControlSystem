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
  Button,
  Typography,
  Container,
  Stack,
  IconButton,
  Tooltip,
  useMediaQuery
} from "@mui/material";
import { motion } from "framer-motion";
// import MdAddBox from "@mui/icons-material/AddBox";
import { BeatLoader } from "react-spinners";
import AddIcon from '@mui/icons-material/Add';
import { useStyles } from "src/components/scrollbar";
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
  const classes = useStyles();
  const isSmallScreen = useMediaQuery('(min-width:600px)');
  console.log('rows', rows);
  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{
        width: 'auto', mb: isSmallScreen ? '5vh' : '0',
      }}>
        <Stack direction="row" spacing={2}>
          <Stack direction="column" spacing={5}>
            <Box >
              <GridToolbarColumnsButton sx={{ color: "#58595b", }} size={isSmallScreen ? 'large' : 'small'}
              />
              <GridToolbarFilterButton sx={{ color: "#58595b" }} size={isSmallScreen ? 'large' : 'small'} />
              <GridToolbarDensitySelector sx={{ color: "#58595b" }} size={isSmallScreen ? 'large' : 'small'} />
              <GridToolbarExport sx={{ color: "#58595b" }} size={isSmallScreen ? 'large' : 'small'} />
              {isSmallScreen ? <></> : <GridToolbarQuickFilter sx={{ color: "#58595b", width: '190px' }} />}
            </Box>
          </Stack>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={2}>
          <Stack direction="column" spacing={2}>
            {isSmallScreen ? <GridToolbarQuickFilter sx={{ color: "#58595b", width: '300px' }} /> : <></>}
          </Stack>
        </Stack>
      </GridToolbarContainer >

    );
  }

  return (
    <>
      <Container maxWidth="xl" className={classes.root} sx={{ marginTop: isSmallScreen ? "5vh" : "0vh" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: "0vh", padding: isSmallScreen ? '3' : '0' }}>
          <Typography sx={{
            fontSize: isSmallScreen ? '2.5rem' : '2rem',
            fontWeight: "bold",
            color: "#58595b",
            textShadow: "1px 1px 2px #ccc",

          }}>{name}</Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* <IconButton size="large" onClick={() => { setCreateOpen(true), setEditable(true) }}
            sx={{
                            mr: 5,

              backgroundColor: "#4276a8", "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >

            <AddIcon sx={{ color: "#fff" }} />
          </IconButton> */}
          <Tooltip title="Add User">
            <Button
              size={isSmallScreen ? 'medium' : 'small'}
              variant="contained"
              // startIcon={<AddIcon />}
              sx={{
                mr: '5%',
                borderRadius: "7px",
                backgroundColor: "#4276a8",
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
        <motion.div
          initial={{ opacity: 0, scale: 0.99, height: "70vh" }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {isLoading ? (
            <Box marginLeft="34vw" marginTop="10vh">
              <BeatLoader color="#1976d2" />
            </Box>
          ) : error ? (
            <Box marginLeft="33vw" marginTop="10vh">
              <Typography variant="h6" color="textSecondary">
                Error fetching data
              </Typography>
            </Box>
          ) : (
            <DataGrid
                  size={isSmallScreen ? 'large' : 'small'}
              sx={{
                marginTop: isSmallScreen ? '5vh' : '0',
                marginBottom: 2,
                border: 0,
                boxShadow: 0.5,
                borderColor: "grey.500",
                padding: isSmallScreen ? '0' : '4',
                height: isSmallScreen ? '80vh' : '100vh',
                "& .MuiDataGrid-columnHeaders": {
                  fontWeight: "normal",
                },
              }}
              columns={columns}
              rows={rows}
              getRowId={getRowId}
              pageSize={10}
                  density={isSmallScreen ? 'comfortable' : 'standard'}
              checkboxSelection
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
      </Container >
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