import React from "react";
import { useQuery, useMutation } from "react-query";
import PropTypes from "prop-types";
import ToastContext from "src/context/hot-toast-context/HotToastContext";
import { GetFuel,GetFueld, GetFuelByCar, CreateFuel, UpdateFuel, DeleteFuel, 
    GetFuelByMonth, CreateFuelAttendant ,GetFuelPaginated, DeleteMultipleFuel} from "src/apis/FuelApi";
import CarContext from "./CarContext";
const FuelContext = React.createContext({});

export default FuelContext;

export const FuelProvider = ({ children }) => {
    const { scanned } = React.useContext(CarContext);
    const [createOpen, setCreateOpen] = React.useState(false);
    const [selectedData, setSelectedData] = React.useState(null);
    const [cardRow, setCardRow] = React.useState(null);
    const [editable, setEditable] = React.useState(false);
    const [editCard, setEditCard] = React.useState(false);
    const [warn, SetWarn] = React.useState(false);
    const name = "Fuel";
    const { showToast } = React.useContext(ToastContext);


    // const [fuelIntakes , setFuelIntakes] = useState([]);
    // const [totalPages, setTotalPages] = useState(0);
    // const [currentPage , setCurrentPage] = useState(0);
    // const [totalItem, setTotalItems] = useState(0);
    
    
    const [loading, setLoading] = React.useState(false);
    // const [error, setError] = useState(false);
    
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [searchKeyword, setSearchKeyword] = React.useState("");
    
  

    const handleRowClick = (params) => {
        // console.log(params);
        setSelectedData(params);
        // console.log(selectedData);
    };
  const {
    data:fuelIntake2,
    isLoading: isLoading2,
    error: error2,
    refetch: refetch2,
} = useQuery('fuel', () => GetFueld(page, rowsPerPage, searchKeyword),{
    staleTime: 0,
    enabled: true ,
});

// console.log(`=====`, fuelIntake2);

    // GetUsers

    const queryResult = useQuery('fuels', GetFuel);

    const isLoading = queryResult.isLoading;
    const error = queryResult.error;
    const refetch = queryResult.refetch;
    const fuelData = queryResult.data?.fuelIntakes || [];
    const totalFuelConsumed = queryResult.data?.totalFuelConsumed || 0;
    const currentMonthIntake = queryResult.data?.currentMonthIntake || 0;


    // console.log(`fuelData`, fuelData);

    // GetUsers
    (scanned)
    const {
        data: fuelDataByCar,
        isLoading: isLoadingByCar,
        error: errorByCar,
        refetch: refetchByCar,
    } = useQuery(['fuelsByCar', scanned], () => GetFuelByCar(scanned), {
        staleTime: 0,
        enabled: !!scanned,
    });


    // console.log(`fuelDataByCar`, fuelDataByCar);

    const { data: fuelDataByMonth, isLoading: isLoadingByMonth,
         error: errorByMonth, refetch: refetchByMonth } = useQuery(
        "fuelsByMonth",
        GetFuelByMonth,
        {
            staleTime: 0,
        }
    );
    // console.log(`fuelDataByMonth`, fuelDataByMonth);

    //GetUsersPaginated
    const { data: fuelDataPaginated, isLoading: isLoadingPaginated, 
        error: errorPaginated, refetch: refetchPaginated } = useQuery(
        "fuelsPaginated",
        GetFuelPaginated,
        {
            staleTime: 0,
        }
    );
    // console.log(`fuelDataPaginated`, fuelDataPaginated);
    
    // CreateFuel
    const { mutateAsync: createFuel } = useMutation(CreateFuel, {
        onSuccess: () => {
            // console.log("Fuel created successfully");
            setCreateOpen(false);
            showToast("Fuel created successfully", "success", 2000);
            refetch();
            refetchByCar();
            refetch2();
        },
        onError: (err) => {
            // console.log("couldn't update Fuel");
            // showToast(err.message, "error");
            showToast(err.response.data.message, "error", 3000);

        },
    });
    // CreateFuelAttendant
    const { mutateAsync: createFuelAttendant } = useMutation(CreateFuelAttendant, {
        onSuccess: () => {
            // console.log("Fuel created successfully", "success", 2000);
            setCreateOpen(false);

            showToast("Fuel created successfully", "success", 2000);
            refetch();
            refetch2();
        },
        onError: (err) => {
            // console.log("couldn't update Fuel");
            // showToast(err.message, "error");
            showToast(err.response.data.message, "error", 3000);

        },
    });

    // UpdateFuel
    const { mutateAsync: updateFuel } = useMutation(UpdateFuel, {
        onSuccess: () => {
            showToast("Fuel updated successfully", "success", "success", 2000);
            setSelectedData(null);
            refetch();
            refetchByCar();
            refetch2();

        },
        onError: (err) => {
            showToast(err.response
                .data.message, "error", 3000);
        },
    });

    // DeleteFuel
    const { mutateAsync: deleteFuel } = useMutation(DeleteFuel, {
        onSuccess: () => {
            showToast("Fuel deleted successfully", "success", 2000);
            setSelectedData(null);
            refetch();
            refetchByCar();
            refetch2();
        },
        onError: (err) => {
            showToast(err.message, "error", 3000);
        },
    });

    // DeleteMultipleFuel
    const { mutateAsync: deleteMultipleFuel } = useMutation(DeleteMultipleFuel, {
        onSuccess: () => {
            showToast("Fuels deleted successfully", "success", 2000);
            setSelectedData(null);
            refetch();
            refetchByCar();
            refetch2();
        },
        onError: (err) => {
            showToast(err.message, "error", 3000);
        },
    });


    return (
        <FuelContext.Provider
            value={{
                name,
                fuelData,
                totalFuelConsumed,
                currentMonthIntake,
                refetch,
                refetchByCar,
                refetchByMonth,
                fuelDataByMonth,
                isLoading,
                error,
                fuelDataByCar,
                isLoadingByCar,
                errorByCar,
                createOpen,
                setCreateOpen,
                selectedData,
                setSelectedData,
                handleRowClick,
                editable,
                setEditable,
                createFuel,
                createFuelAttendant,
                updateFuel,
                deleteFuel,
                deleteMultipleFuel,
                warn,
                SetWarn,
                editCard,
                setEditCard,
                cardRow,
                setCardRow,
                isLoadingByMonth,
                isLoadingPaginated,
                errorPaginated,
                refetchPaginated,
                fuelDataPaginated,
                isLoading2,
                error2,
                refetch2,
                fuelIntake2,

                rowsPerPage,
                setRowsPerPage,
                page,
                setPage,
                selectedRows,
                setSelectedRows,
                searchKeyword,
                setSearchKeyword,
                loading,
                setLoading,


            }}
        >
            {children}
        </FuelContext.Provider>
    );
};

FuelProvider.propTypes = {
    children: PropTypes.node.isRequired,
};