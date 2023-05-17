// UserContext.jsx
import React, { useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import PropTypes from "prop-types";
import ToastContext from "src/context/hot-toast-context/HotToastContext";
import { GetUser, CreateUser, UpdateUser, DeleteUser, GetUserDetail } from "src/apis/UsersApi";
import AuthContext from 'src/context/AuthContext';

const UserContext = React.createContext({});
export default UserContext;

export const UserProvider = ({ children }) => {
  const { userDetail } = React.useContext(AuthContext);
  const [createOpen, setCreateOpen] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState(null);
  const [editable, setEditable] = React.useState(false);
  const [warn, SetWarn] = React.useState(false);

  const name = "User";
  const { showToast } = React.useContext(ToastContext);
  const handleRowClick = (params) => {
    console.log(params);
    setSelectedData(params);
    console.log(selectedData);
  };

  // GetUers
  const queryResult = useQuery("users", GetUser);

  const isLoading = queryResult.isLoading;
  const error = queryResult.error;
  const refetch = queryResult.refetch;
  const userData = queryResult.data?.usersdata || [];
  const userCounts = queryResult.data?.userCounts || [];
  console.log('userData', userData);


  const { data: accountDetail, refetch: refetchAccount } = useQuery(
    "accountDetail",
    () => GetUserDetail(userDetail?._id),
    {
      enabled: false,
    }
  );

  const { mutateAsync: createUser } = useMutation(CreateUser, {
    onSuccess: () => {
      console.log("User updated successfully");
      setCreateOpen(false);

      showToast("User created successfully", "success", 2000);
      refetch();
    },
    onError: (err) => {
      console.log("User updated successfully");
      showToast(err.message, "error");
    },
  });
  // UpdateUser
  const { mutateAsync: updateUser } = useMutation(UpdateUser, {
    onSuccess: () => {
      showToast("User updated successfully", "success");
      setSelectedData(null);
      refetch();
      refetchAccount();
    },
    onError: (err) => {
      showToast(err.message, "error");
    },
  });
  // DeleteUser
  const { mutateAsync: deleteUser } = useMutation(DeleteUser, {
    onSuccess: () => {
      showToast("User deleted successfully", "success");
      setSelectedData(null);
      refetch();
    },
    onError: (err) => {
      showToast(err.message, "error");
    },
  });

  useEffect(() => {
    if (userDetail) {
      const fetchData = async () => {
        await refetch();
        await GetUserDetail(userDetail?._id);
      };

      fetchData();
    }
  }, [userDetail, refetch]);

  return (
    <UserContext.Provider
      value={{
        name,
        userData,
        userCounts,
        isLoading,
        error,
        refetch,
        showToast,
        createOpen,
        setCreateOpen,
        selectedData,
        setSelectedData,
        editable,
        setEditable,
        handleRowClick,
        accountDetail,
        GetUserDetail,
        createUser,
        updateUser,
        deleteUser,
        warn,
        SetWarn,
        refetchAccount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
