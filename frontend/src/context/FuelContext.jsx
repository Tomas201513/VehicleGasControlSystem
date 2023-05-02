import React from "react";
import { useQuery, useMutation } from "react-query";
import PropTypes from "prop-types";
import ToastContext from "src/context/hot-toast-context/HotToastContext";
import { GetFuel, CreateFuel, UpdateFuel, DeleteFuel } from "src/apis/FuelApi";

const FuelContext = React.createContext({});

export default FuelContext;

export const FuelProvider = ({ children }) => {
    const [createOpen, setCreateOpen] = React.useState(false);
    const [selectedData, setSelectedData] = React.useState(null);
    const [editable, setEditable] = React.useState(false);
    const name = "Cars";
    const { showToast } = React.useContext(ToastContext);
    const handleRowClick = (params) => {
        console.log(params);
        setSelectedData(params);
        console.log(selectedData);
    };

    // GetUers
    const {
        data: fuelData,
        isLoading,
        error,
        refetch,
    } = useQuery(name, GetFuel, {
        staleTime: 0,
    });

    // CreateFuel
    const { mutateAsync: createFuel } = useMutation(CreateFuel, {
        onSuccess: () => {
            console.log("Fuel created successfully");
            setCreateOpen(false);

            showToast("Fuel created successfully", "success", 2000);
            refetch();
        },
        onError: (err) => {
            console.log("couldent update Fuel");
            showToast(err.message, "error");
        },
    });

    // UpdateFuel
    const { mutateAsync: updateFuel } = useMutation(UpdateFuel, {
        onSuccess: () => {
            showToast("Fuel updated successfully", "success");
            setSelectedData(null);
            refetch();
        },
        onError: (err) => {
            showToast(err.message, "error");
        },
    });

    // DeleteFuel
    const { mutateAsync: deleteFuel } = useMutation(DeleteFuel, {
        onSuccess: () => {
            showToast("Fuel deleted successfully", "success");
            setSelectedData(null);
            refetch();
        },
        onError: (err) => {
            showToast(err.message, "error");
        },
    });

    return (
        <FuelContext.Provider
            value={{
                name,
                fuelData,
                isLoading,
                error,
                createOpen,
                setCreateOpen,
                selectedData,
                setSelectedData,
                handleRowClick,
                editable,
                setEditable,
                createFuel,
                updateFuel,
                deleteFuel,
            }}
        >
            {children}
        </FuelContext.Provider>
    );
};

FuelProvider.propTypes = {
    children: PropTypes.node.isRequired,
};