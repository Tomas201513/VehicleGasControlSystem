import React from "react";
import { useQuery, useMutation } from "react-query";
import PropTypes from "prop-types";
import ToastContext from "src/context/hot-toast-context/HotToastContext";
import { GetCar, CreateCar, UpdateCar, DeleteCar } from "src/apis/CarApi";

const CarContext = React.createContext({});

export default CarContext;

export const CarProvider = ({ children }) => {
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
    data: carData,
    isLoading,
    error,
    refetch,
  } = useQuery(name, GetCar, {
    staleTime: 0,
  });
  console.log(carData);
  // CreateCar
  const { mutateAsync: createCar } = useMutation(CreateCar, {
    onSuccess: () => {
      console.log("Car created successfully");
      setCreateOpen(false);

      showToast("Car created successfully", "success", 2000);
      refetch();
    },
    onError: (err) => {
      console.log("couldent update Car");
      showToast(err.message, "error");
    },
  });

  // UpdateCar
  const { mutateAsync: updateCar } = useMutation(UpdateCar, {
    onSuccess: () => {
      showToast("Car updated successfully", "success");
      setSelectedData(null);
      refetch();
    },
    onError: (err) => {
      showToast(err.message, "error");
    },
  });

  // DeleteCar
  const { mutateAsync: deleteCar } = useMutation(DeleteCar, {
    onSuccess: () => {
      showToast("Car deleted successfully", "success");
      setSelectedData(null);
      refetch();
    },
    onError: (err) => {
      showToast(err.message, "error");
    },
  });

  return (
    <CarContext.Provider
      value={{
        name,
        carData,
        isLoading,
        error,
        refetch,
        createOpen,
        setCreateOpen,
        selectedData,
        setSelectedData,
        handleRowClick,
        editable,
        setEditable,
        createCar,
        updateCar,
        deleteCar,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

CarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
