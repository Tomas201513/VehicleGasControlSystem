// UserContext.jsx
import React, { createContext, useContext, useState } from "react";
import { useQuery, useMutation } from "react-query";
import PropTypes from "prop-types";
import ToastContext from "src/context/hot-toast-context/HotToastContext";
import { GetUers } from "src/apis/UsersApi";
import { BeatLoader } from "react-spinners";
import { Box, Typography } from "@mui/material";

const UserContext = createContext({});
export default UserContext;

export const UserProvider = ({ children }) => {
      const [createOpen, setCreateOpen] = useState(false);
      const [selectedData, setselectedData] = useState(null);
      const [editable, setEditable] = useState(false);
    const name = "Users";
  const { showToast } = React.useContext(ToastContext);
  const {
    data: userData,
    isLoading,
    error,
    refetch,
  } = useQuery(name, GetUers, {
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
      <UserContext.Provider
        value={{
            name,
            userData,
            isLoading,
            error,
            refetch,
            showToast,
            createOpen,
            setCreateOpen,
            selectedData,
            setselectedData,
            editable,
            setEditable,
            
        }}
      >
        {children}
      </UserContext.Provider>
  );
};
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
