// UserContext.jsx
import React from "react";
import { useQuery, useMutation } from "react-query";
import PropTypes from "prop-types";
import ToastContext from "src/context/hot-toast-context/HotToastContext";
import { GetStation, CreateStation, UpdateStation, DeleteStation, FillStation } from "src/apis/StationApi";

const StationContext = React.createContext({});
export default StationContext;

export const StationProvider = ({ children }) => {
    const [createOpen, setCreateOpen] = React.useState(false);
    const [selectedData, setSelectedData] = React.useState(null);
    const [editable, setEditable] = React.useState(false);
    const [warn, SetWarn] = React.useState(false);
    const name = "Station";
    const { showToast } = React.useContext(ToastContext);
    const handleRowClick = (params) => {
        // console.log(params);
        setSelectedData(params);
        // console.log(selectedData);
    };

    // GetStations
    const queryResult = useQuery("stations", GetStation);

    const isLoading = queryResult.isLoading;
    const error = queryResult.error;
    const refetchStation = queryResult.refetch;
    const stationData = queryResult?.data;
    // console.log('station', stationData)

    // CreateStation
    const { mutateAsync: createStation } = useMutation(CreateStation, {
        onSuccess: () => {
            // console.log("Station updated successfully");
            setCreateOpen(false);

            showToast("Station created successfully", "success", 2000);
            refetchStation();
        },
        onError: (err) => {
            // console.log("Station updated successfully", "success", 2000);
            showToast(err.response
                .data.message, "error", 3000);
        },
    });
    // UpdateStation
    const { mutateAsync: updateStation } = useMutation(UpdateStation, {
        onSuccess: () => {
            showToast("Station updated successfully", "success", 2000);
            setSelectedData(null);
            refetchStation();
        },
        onError: (err) => {
            showToast(err.response
                .data.message, "error", 3000);
        },
    });

    // FillStation
    const { mutateAsync: fillStation } = useMutation(FillStation, {
        onSuccess: () => {
            showToast("Station filled successfully", "success", 2000);
            setSelectedData(null);
            refetchStation();
        },
        onError: (err) => {
            showToast(err.response
                .data.message, "error", 3000);
        },
    });


    // DeleteStation
    const { mutateAsync: deleteStation } = useMutation(DeleteStation, {
        onSuccess: () => {
            showToast("Station deleted successfully", "success", 2000);
            setSelectedData(null);
            refetchStation();
        },
        onError: (err) => {
            showToast(err.response
                .data.message, "error", 3000);
        },
    });
    return (
        <StationContext.Provider
            value={{
                GetStation,
                name,
                isLoading,
                error,
                refetchStation,
                stationData,
                createOpen,
                setCreateOpen,
                selectedData,
                setSelectedData,
                editable,
                setEditable,
                warn,
                SetWarn,
                handleRowClick,
                createStation,
                updateStation,
                deleteStation,
                fillStation
            }}
        >
            {children}
        </StationContext.Provider>
    );
};

StationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
