import React, { createContext, useContext, useState } from "react";
import { useQuery, useMutation } from "react-query";
import PropTypes from "prop-types";
import ToastContext from "src/context/hot-toast-context/HotToastContext";
import { GetCars } from "../apis/CarApi";
import { BeatLoader } from "react-spinners";
import { Box, Typography } from "@mui/material";
const CarContext = createContext({});

export default CarContext;

export const CarProvider = ({ children }) => {
     const [createOpen, setCreateOpen] = useState(false);
      const [selectedUserData, setSelectedUserData] = useState(null);
      const [editable, setEditable] = useState(false);
    const name = "Users";
  const { showToast } = React.useContext(ToastContext);
    const {
    data: carData,
    isLoading,
    error,
    refetch,
    } = useQuery(name, GetCars, {
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
        <CarContext.Provider
        value={{
            name,
            carData,
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
        </CarContext.Provider>
    );
};

CarProvider.propTypes = {
    children: PropTypes.node.isRequired,
};