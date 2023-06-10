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
  Tooltip,
  useMediaQuery,
} from "@mui/material";
// import MdAddBox from "@mui/icons-material/AddBox";
import { BeatLoader } from "react-spinners";
export default function PaginDatatable({
  columns,
  rows,
  getRowId,
  setCreateOpen,
  setEditable,
  name,
  isLoading,
  error,

}) {
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
              <GridToolbarColumnsButton sx={{ color: "#000000", }} size={isSmallScreen ? 'large' : 'small'}
              />
              <GridToolbarFilterButton sx={{ color: "#000000" }} size={isSmallScreen ? 'large' : 'small'} />
              <GridToolbarDensitySelector sx={{ color: "#000000" }} size={isSmallScreen ? 'large' : 'small'} />
              <GridToolbarExport sx={{ color: "#000000" }} size={isSmallScreen ? 'large' : 'small'} />
              {isSmallScreen ? <></> : <GridToolbarQuickFilter sx={{ color: "#000000", width: '190px' }} />}
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
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: '5%', ml: '5%', mr: '5%', mb: 5, }}>

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
                    sx={{
                      marginTop: isSmallScreen ? '2vh' : '0',
                      marginBottom: 2,
                      border: 0,
                      // boxShadow: 0.5,
                      borderColor: "grey.100",
                padding: isSmallScreen ? '0' : '4',
                      fontSize: '0.97rem',
                height: isSmallScreen ? '80vh' : '100vh',
                "& .MuiDataGrid-columnHeaders": {
                  fontWeight: "normal",
                },
              }}
                    size={isSmallScreen ? 'large' : 'small'}
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
                    password: false,

                  },


                },
              }}
            />

          )}
      </Container >
      </Box>
    </>
  );
}

PaginDatatable.propTypes = {
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