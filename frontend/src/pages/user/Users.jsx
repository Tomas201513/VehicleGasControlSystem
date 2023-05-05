import React from 'react';
import Datatable from 'src/components/datatable/Datatable';
import UserContext from 'src/context/UserContext';
import { Typography, IconButton, Tooltip, Container, FormControlLabel, Switch } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CreateUpdateUser from './CreateUpdateUser';

function Users() {
  const getRowId = (row) => row._id;

  const {
    name,
    userData,
    isLoading,
    error,
    createOpen,
    setCreateOpen,
    selectedData,
    setSelectedData,
    editable,
    setEditable,
    handleRowClick,
    deleteUser,
  } = React.useContext(UserContext);

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 0.3,
      minWidth: 30,
      type: 'number',
      hideable: true,
      // fontSize: 12,
    },
    {
      field: 'userName',
      headerName: 'USERNAME',
      flex: 0.7,
      minWidth: 130,
      editable: true,
      type: 'string',
    },
    {
      field: 'email',
      headerName: 'EMAIL',
      flex: 0.7,
      minWidth: 100,
      editable: true,
      type: 'email',
    },
    {
      field: 'password',
      headerName: 'PASSWORD',
      flex: 0.7,
      minWidth: 110,
      editable: true,
      type: 'string',
    },
    {
      field: 'roles',
      headerName: 'Role',
      flex: 0.7,
      maxWidth: 200,
      minWidth: 30,
      editable: true,
      type: 'string',
    },
    {
      field: "actions",
      type: "actions",
      // headerName: "ACTIONS",
      flex: 0.7,
      maxWidth: 100,
      minWidth: 60,
      renderCell: (params) => {
        return (
          <IconButton>
            <ArrowForwardIcon
              style={{ color: "#666666", cursor: "pointer" }}

              onClick={() => handleRowClick(params.row)}
            />
          </IconButton>
        );
      }
    },
  ];
  return (
    <>
      {/* <Typography variant="h4" color="textSecondary" marginLeft={4} marginTop={4}>
        {name}
      </Typography> */}
      {createOpen || selectedData ? (
        <CreateUpdateUser
          selectedData={selectedData}
          editable={editable}
          setEditable={setEditable}
          createOpen={createOpen}
        />

      ) : (
        <>
          <Datatable
            columns={columns}
            rows={userData}
            createOpen={createOpen}
            setCreateOpen={setCreateOpen}
            editable={editable}
            setEditable={setEditable}
            getRowId={getRowId}
            isLoading={isLoading}
            error={error}
            name={name}
          />
        </>
      )}
    </>
  );
}
export default Users;



