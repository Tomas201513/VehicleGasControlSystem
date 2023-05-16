import React from "react";
import Datatable from "src/components/datatable/Datatable";
import { IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CreateUpdateStation from "./CreateUpdateStation";
import StationContext from "src/context/StationContext";

export default function Station() {
    const getRowId = (row) => row._id;
    const {
        name,
        stationData,
        isLoading,
        error,
        createOpen,
        setCreateOpen,
        selectedData,
        editable,
        setEditable,
        handleRowClick,
    } = React.useContext(StationContext);

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 0.3,
            minWidth: 30,
            type: "number",
            hideable: true,
        },
        { field: "stationName", headerName: "STATION NAME", flex: 0.7, minWidth: 130 },
        { field: "stationLocation", headerName: "STATION LOCATION", flex: 0.7, minWidth: 100 },
        { field: "stationOwner", headerName: "STATION OWNER", width: 150, },
        { field: "FuelCapacity", headerName: "Fuel Capacity", flex: 0.7, minWidth: 130 },

        { field: "currentFuelAmount", headerName: "CURRENT FUEL AMOUT", flex: 0.7, minWidth: 130 },

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

                <CreateUpdateStation
                    selectedData={selectedData}
                    editable={editable}
                    setEditable={setEditable}
                    createOpen={createOpen}
                />
            ) : (
                <Datatable
                    name={name}
                    columns={columns}
                        rows={stationData}
                    getRowId={getRowId}
                    isLoading={isLoading}
                    error={error}
                    createOpen={createOpen}
                    setCreateOpen={setCreateOpen}
                    editable={editable}
                    setEditable={setEditable}
                    CreateUpdateComponent={CreateUpdateStation}
                />
            )}

        </>
    );
}


