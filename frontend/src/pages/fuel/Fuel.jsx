import React from "react";
import Datatable from "src/components/datatable/Datatable";
import CarContext from "src/context/CarContext";
import {
  Typography,
  IconButton,
  Tooltip,
  Container,
  FormControlLabel,
  Switch,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CreateUpdateFuel from "./CreateUpdateFuel";
import FuelContext from "src/context/FuelContext";

function Fuel() {
  const getRowId = (row) => row._id;
  const {
    name,
    fuelData,
    isLoading,
    error,
    createOpen,
    setCreateOpen,
    selectedData,
    setSelectedData,
    editable,
    setEditable,
    handleRowClick,
    deleteFuel,
  } = React.useContext(FuelContext);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.3,
      minWidth: 30,
      type: "number",
      hideable: true,
    },
    { field: "fuelAmount", headerName: "Fuel Amount", width: 150 },
    { field: "fuelDate", headerName: "Fuel Date", width: 150 },
    {
      field: "car_id", headerName: "Car", width: 150, valueGetter: (params) => {
        return params.row.car_id.plateNumber;
      }
    },
    {
      field: "attendant", headerName: "Attendant", width: 150, valueGetter: (params) => {
        return params.row.attendant.userName;
      }
    },
    {
      field: "actions",
      type: "actions",
      // headerName: "ACTIONS",
      flex: 0.7,
      maxWidth: 100,
      minWidth: 60,
      renderCell: (params) => {
        return (
          <IconButton>
            <ArrowForwardIcon
              style={{ color: "#666666", cursor: "pointer" }}
              onClick={() => handleRowClick(params.row)}
            />
          </IconButton>
        );
      },
    },
  ];

  return (
    <>
      <Typography variant="h4" color="textSecondary" marginLeft={4} marginTop={4}>
        {name}
      </Typography>
      {createOpen || selectedData ? (
        <>
          <Container maxWidth="md" sx={{ marginTop: "2vh" }}>
            <Tooltip title="Back">
              <IconButton
                onClick={() => {
                  setSelectedData(null), setEditable(false), setCreateOpen(false);
                  console.log(selectedData);
                }}
                size="small"
              >
                <ArrowBackIcon size="small" />
              </IconButton>
            </Tooltip>

            {selectedData ? (
              <>
                {" "}
                <Tooltip title="Editable">
                  <FormControlLabel
                    control={<Switch />}
                    label="edit"
                    onChange={() => setEditable(!editable)}
                  />
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton size="small" onClick={() => deleteFuel(selectedData._id)}>
                    <DeleteIcon size="small" color="error" />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <></>
            )}
            <CreateUpdateFuel
              selectedData={selectedData}
              editable={editable}
              setEditable={setEditable}
              createOpen={createOpen}
            />
          </Container>
        </>
      ) : (
        <>


          <Datatable
            columns={columns}
            rows={fuelData}
            createOpen={createOpen}
            setCreateOpen={setCreateOpen}
            editable={editable}
            setEditable={setEditable}
            getRowId={getRowId}
            isLoading={isLoading}
            error={error}
            name={name}
          />
        </>
      )}
    </>
  );
}

export default Fuel;





