import React from "react";
import { useQuery, useMutation } from "react-query";
import PropTypes from "prop-types";
import ToastContext from "src/context/hot-toast-context/HotToastContext";
import { GetCar, CreateCar, UpdateCar, DeleteCar, GetCarDetail } from "src/apis/CarApi";

const CarContext = React.createContext({});

export default CarContext;

export const CarProvider = ({ children }) => {
  const [createOpen, setCreateOpen] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState(null);
  const [editable, setEditable] = React.useState(false);
  const [scanned, setScanned] = React.useState(null);
  const [warn, SetWarn] = React.useState(false);
  const [qr, setQr] = React.useState(false);
  const [qrId, setQrId] = React.useState(null);
  const name = "Car";
  const { showToast } = React.useContext(ToastContext);
  const handleRowClick = (params) => {
    console.log(params);
    setSelectedData(params);
    console.log(selectedData);
  };

  // GetUers
  const queryResult = useQuery("cars", GetCar);

  const isLoading = queryResult.isLoading;
  const error = queryResult.error;
  const refetch = queryResult.refetch;
  const carData = queryResult.data?.cars || [];
  const groupedCars = queryResult.data?.groupedCars || [];


  // GetCarDetail
  const { data: carDetail } = useQuery(["carDetail", scanned], () => GetCarDetail(scanned), {
    enabled: !!scanned,
    staleTime: 0,
  });
  console.log(`carDetail`, carDetail);

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
        groupedCars,
        carDetail,
        scanned,
        setScanned,
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
        warn,
        SetWarn,
        qr,
        setQr,
        qrId,
        setQrId,

      }}
    >
      {children}
    </CarContext.Provider>
  );
};

CarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
