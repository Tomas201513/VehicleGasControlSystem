// UserContext.jsx
import React from "react";
import { useQuery, useMutation } from "react-query";
import PropTypes from "prop-types";
import ToastContext from "src/context/hot-toast-context/HotToastContext";
import { GetStation, CreateStation, UpdateStation, DeleteStation } from "src/apis/StationApi";

const StationContext = React.createContext({});
export default StationContext;

export const StationProvider = ({ children }) => {
    const [createOpen, setCreateOpen] = React.useState(false);
    const [selectedData, setSelectedData] = React.useState(null);
    const [editable, setEditable] = React.useState(false);
    const [warn, SetWarn] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const name = "Stations";
    const { showToast } = React.useContext(ToastContext);
    const handleRowClick = (params) => {
        console.log(params);
        setSelectedData(params);
        console.log(selectedData);
    };

    // GetStations
    const queryResult = useQuery("stations", GetStation);

    const isLoading = queryResult.isLoading;
    const error = queryResult.error;
    const refetch = queryResult.refetch;
    const stationData = queryResult?.data;
    console.log('station', stationData)

    // CreateStation
    const { mutateAsync: createStation } = useMutation(CreateStation, {
        onSuccess: () => {
            console.log("Station updated successfully");
            setCreateOpen(false);

            showToast("Station created successfully", "success", 2000);
            refetch();
        },
        onError: (err) => {
            console.log("Station updated successfully");
            showToast(err.response.data.message, "error");

        },
    });
    // UpdateStation
    const { mutateAsync: updateStation } = useMutation(UpdateStation, {
        onSuccess: () => {
            showToast("Station updated successfully", "success");
            setSelectedData(null);
            refetch();
        },
        onError: (err) => {
            showToast(err.response.data.message, "error");

        },
    });

    // DeleteStation
    const { mutateAsync: deleteStation } = useMutation(DeleteStation, {
        onSuccess: () => {
            showToast("Station deleted successfully", "success");
            setSelectedData(null);
            refetch();
        },
        onError: (err) => {
            showToast(err.message, "error");
        },
    });
    React.useEffect(() => {
        if (stationData) {
            GetStation()
            setRows(stationData);
        }
    }, [stationData]);
    return (
        <StationContext.Provider
            value={{
                GetStation,
                name,
                isLoading,
                error,
                rows,
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
            }}
        >
            {children}
        </StationContext.Provider>
    );
};

StationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
