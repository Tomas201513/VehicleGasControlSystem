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
    { field: "fuelAmount", headerName: "FUEL AMOUNT", flex: 0.7, minWidth: 130 },
    { field: "fuelDate", headerName: "FUEL DATE", flex: 0.7, minWidth: 100 },
    {
      field: "car_id", headerName: "CAR", width: 150, valueGetter: (params) => {
        return params.row?.car_id?.plateNumber;
      }
    },
    {
      field: "attendant", headerName: "ATTENDANT", width: 150, valueGetter: (params) => {
        return params.row?.attendant?.userName;
      }
    },
    {
      field: "actions",
      type: "actions",
      headerName: "ACTIONS",
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
      {createOpen || selectedData ? (
        <CreateUpdateFuel
          selectedData={selectedData}
          editable={editable}
          setEditable={setEditable}
          createOpen={createOpen}
        />
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





