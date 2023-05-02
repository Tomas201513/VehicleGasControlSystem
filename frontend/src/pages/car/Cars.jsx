import React from 'react';
import Datatable from 'src/components/datatable/Datatable';
import UserContext from 'src/context/UserContext';
import { Typography, IconButton, Tooltip, Container, FormControlLabel, Switch } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CreateUpdateCar from './CreateUpdateCar';

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
        setSelectedData,
        editable,
        setEditable,
        handleRowClick,
        deleteCar,
    } = React.useContext(UserContext);

    const columns = [
        {
            field: '_id',
            headerName: 'ID',
            flex: 0.3,
            minWidth: 30,
            type: 'number',
            hideable: true,
        },
        { field: "plateNumber", headerName: "Plate Number", width: 150 },
        { field: "model", headerName: "Model", width: 150 },
        { field: "year", headerName: "Year", width: 120 },
        { field: "color", headerName: "Color", width: 150 },
        { field: "capacity", headerName: "Capacity", width: 150 },
        {
            field: "engine",
            headerName: "Engine",
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
            headerName: "Transmission",
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
            }
        },
    ];

    return (<>
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
                                <IconButton size="small" onClick={() => deleteCar(selectedData._id)}>
                                    <DeleteIcon size="small" color="error" />
                                </IconButton>
                            </Tooltip>
                        </>
                    ) : (
                        <></>
                    )}
                    <CreateUpdateCar
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
