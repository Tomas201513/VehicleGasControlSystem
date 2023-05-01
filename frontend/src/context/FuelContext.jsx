// UserContext.jsx
import React, { createContext, useContext, useState } from "react";
import { useQuery, useMutation } from "react-query";
import PropTypes from "prop-types";
import ToastContext from "src/context/hot-toast-context/HotToastContext";
import { GetFuel } from "../apis/FuelApi";
import { BeatLoader } from "react-spinners";
import { Box, Typography } from "@mui/material";
const FuelContext = createContext({});

export default FuelContext;

export const FuelProvider = ({ children }) => {
    const [createOpen, setCreateOpen] = useState(false);
    const [selectedUserData, setSelectedUserData] = useState(null);
    const [editable, setEditable] = useState(false);
    const name = "Fuel";
    const { showToast } = React.useContext(ToastContext);
    const {
        data: fuelData,
        isLoading,
        error,
        refetch,
    } = useQuery(name, GetFuel, {
        staleTime: 0,
    });
    
    if (isLoading) {
        return (
        <Box marginLeft="50vw" marginTop="40vh">
            <BeatLoader color="#1976d2" />
        </Box>
        );
    }
    if (error) {
        return (
        <Box marginLeft="50vw" marginTop="40vh">
            <Typography variant="h4" color="textSecondary">
            Error fetching data
            </Typography>
        </Box>
        );
    }
    return (
        <FuelContext.Provider
        value={{
            name,
            fuelData,
            isLoading,
            error,
            refetch,
            showToast,
            createOpen,
            setCreateOpen,
            selectedUserData,
            setSelectedUserData,
            editable,
            setEditable,
        }}
        >
        {children}
        </FuelContext.Provider>
    );
    }
    FuelProvider.propTypes = {
    children: PropTypes.node.isRequired,
    };
    