import React from "react";
import { useQuery, useMutation } from "react-query";
import PropTypes from "prop-types";
import ToastContext from "src/context/hot-toast-context/HotToastContext";
import { GetQuota, GetQuotaDetail, CreateQuota, UpdateQuota, DeleteQuota} from "src/apis/QuotaApi";

const QuotaContext = React.createContext({});

export default QuotaContext;

export const QuotaProvider = ({ children }) => {
    const [createOpen, setCreateOpen] = React.useState(false);
    const [selectedData, setSelectedData] = React.useState(null);
    const [cardRow, setCardRow] = React.useState(null);
    const [editable, setEditable] = React.useState(false);
    const [editCard, setEditCard] = React.useState(false);
    const [warn, SetWarn] = React.useState(false);
    const name = "Quota";
    const { showToast } = React.useContext(ToastContext);
    const handleRowClick = (params) => {
        console.log(params);
        setSelectedData(params);
        console.log(selectedData);
    };

    // GetUsers

    const queryResult = useQuery('quotas', GetQuota);

    const isLoading = queryResult.isLoading;
    const error = queryResult.error;
    const refetch = queryResult.refetch;
    const quotaData = queryResult.data || [];



    console.log(`queryResult`, queryResult);
    console.log(`quotaData`, quotaData);

    const { data: quotaDetail, refetch: refetchAccount } = useQuery(
        "quotaDetail",
        () => GetQuotaDetail(selectedData?.id),
        {
          enabled: false,
        }
      );

const { mutateAsync: createQuota } = useMutation(CreateQuota, {
    onSuccess: () => {
        showToast("Quota created successfully", "success", 2000);
        refetch();
        refetchAccount();
        setCreateOpen(false);

    },
    onError: (error) => {
        showToast(error?.message || "Could not create quota", "error", 3000);
    },
});


const { mutateAsync: updateQuota } = useMutation(UpdateQuota, {
    onSuccess: () => {
        showToast("Quota updated successfully", "success", 2000);
        refetch();
        refetchAccount();
        setCreateOpen(false);

    },
    onError: (error) => {
        showToast(error?.message || "Could not update quota", "error", 3000);
    },
});

const { mutateAsync: deleteQuota } = useMutation(DeleteQuota, {
    onSuccess: () => {
        showToast("Quota deleted successfully", "success", 2000);
        refetch();
        refetchAccount();
        setCreateOpen(false);

    },
    onError: (error) => {
        showToast(error?.message || "Could not delete quota", "error", 3000);
    },
});

    return (
        <QuotaContext.Provider
            value={{
                quotaData,
                isLoading,
                error,
                refetch,
                name,
                createOpen,
                setCreateOpen,
                selectedData,
                setSelectedData,
                handleRowClick,
                editable,
                setEditable,
                warn,
                SetWarn,
                createQuota,
                updateQuota,
                deleteQuota,
                quotaDetail,
                cardRow,
                setCardRow,
                editCard,
                setEditCard
            }}
        >
            {children}
        </QuotaContext.Provider>
    );
}

QuotaProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useQuota = () => React.useContext(QuotaContext);


        