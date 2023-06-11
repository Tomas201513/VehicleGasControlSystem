import React from "react";
import PaginDatatable from "src/components/datatable/PaginDatatable";

import {
  IconButton,
  // Link,
  Tooltip,
} from "@mui/material";
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
    editable,
    setEditable,
    handleRowClick,
    errorPaginated,
    refetchPaginated,
    fuelDataPaginated,
  } = React.useContext(FuelContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.3,
      minWidth: 30,
      type: "number",
      hideable: true,
    },
    { field: "fuelAmount", headerName: "FUEL AMOUNT(L)", flex: 0.7, minWidth: 130 },
    {
      field: "fuelDate", headerName: "FILL DATE(GC)", flex: 0.7, minWidth: 190, valueFormatter: (params) => formatDate(params.value),
    },
    {
      field: "car_id", headerName: "CAR PLATE NO.", flex: 0.7, minWidth: 150, valueGetter: (params) => {
        return params.row?.car_id?.plateNumber;
      }
    },
    {
      field: "attendant", headerName: "ATTENDANT", flex: 0.7, minWidth: 150, valueGetter: (params) => {
        return params.row?.attendant?.userName;
      }
    },
    {
      field: "station", headerName: "STATION", flex: 0.7, minWidth: 150, valueGetter: (params) => {
        return params.row?.station?.stationName;
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
          <Tooltip title="View Details">

          <IconButton>
            <ArrowForwardIcon
              style={{ color: "#666666", cursor: "pointer" }}
              onClick={() => handleRowClick(params.row)}
            />
          </IconButton>
          </Tooltip>
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
        <PaginDatatable
          // columns={columns}
          rows={fuelDataPaginated}
          // createOpen={createOpen}
          // setCreateOpen={setCreateOpen}
          // editable={editable}
          // setEditable={setEditable}
          // getRowId={getRowId}
          // isLoading={isLoading}
          // error={errorPaginated }
          // name={name}
        />
      )}
    </>
  );
}

export default Fuel;





