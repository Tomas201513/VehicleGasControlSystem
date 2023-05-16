import React from "react";
import Datatable from "src/components/datatable/Datatable";
import CarContext from "src/context/CarContext";
import { IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CreateUpdateCar from "./CreateUpdateCar";
function Cars() {
    const getRowId = (row) => row._id;
    const {
        name,
        carData,
        isLoading,
        error,
        createOpen,
        setCreateOpen,
        selectedData,
        editable,
        setEditable,
        handleRowClick,
    } = React.useContext(CarContext);

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 0.3,
            minWidth: 30,
            type: "number",
            hideable: true,
        },
        { field: "plateNumber", headerName: "PLATE NUMBER", flex: 0.7, minWidth: 130, editable: true, type: "string" },
        { field: "model", headerName: "MODEL", flex: 0.7, minWidth: 100, editable: true, type: "string" },
        { field: "year", headerName: "YEAR", flex: 0.7, minWidth: 110, editable: true, type: "number" },
        { field: "color", headerName: "COLOR", flex: 0.7, minWidth: 110, editable: true, type: "string" },
        { field: "capacity", headerName: "CAPACITY", flex: 0.7, minWidth: 110, editable: true, type: "number" },
        {
            field: "engine",
            headerName: "ENGINE",
            width: 150,
            valueGetter: (params) => {
                switch (params.row.engine) {
                    case "gasoline":
                        return "Gasoline";
                    case "diesel":
                        return "Diesel";
                    case "electric":
                        return "Electric";
                    default:
                        return "";
                }
            },
        },
        {
            field: "transmission",
            headerName: "TRANSMISSION",
            width: 150,
            valueGetter: (params) => {
                switch (params.row.transmission) {
                    case "manual":
                        return "Manual";
                    case "automatic":
                        return "Automatic";
                    default:
                        return "";
                }
            },
        },
        {
            field: "driver",
            headerName: "DRIVER",
            width: 150,
            valueGetter: (params) => {
                return params.row.driver ? params.row.driver.userName : "";
            },
        },
        {
            field: "actions",
            type: "actions",
            headerName: "ACTIONS",
            flex: 0.7,
            maxWidth: 150,
            minWidth: 100,
            renderCell: (params) => {
                return (<>
                    {/* <IconButton>
                            <QrCode2Icon
                                style={{ color: "#666666", cursor: "pointer" }}
                                onClick={() => {
                                    setQrId(params.row._id); console.log(params.row._id);
                                    SetWarn(true); setQr(true)
                                }}
                            />
                        </IconButton> */}
                    <IconButton>
                        <ArrowForwardIcon
                            style={{ color: "#666666", cursor: "pointer" }}
                            onClick={() => handleRowClick(params.row)}
                        />
                    </IconButton>
                </>
                );
            },
        },
    ];
    return (
        <>
            {createOpen || selectedData ? (

                <CreateUpdateCar
                    selectedData={selectedData}
                    editable={editable}
                    setEditable={setEditable}
                    createOpen={createOpen}
                />

            ) : (
                <>


                    <Datatable
                        columns={columns}
                        rows={carData}
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

export default Cars;
