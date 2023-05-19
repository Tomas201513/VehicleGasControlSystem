import React from 'react';
import Datatable from 'src/components/datatable/Datatable';
import UserContext from 'src/context/UserContext';
import { IconButton, Link } from '@mui/material';
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
    editable,
    setEditable,
    handleRowClick,
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
      renderCell: (params) => (
        <Link sx={{ color: '#1c2536' }} href={`mailto:${params.value}`}>{params.value}</Link>
      ),
    },
    {
      field: 'password',
      headerName: 'PASSWORD',
      flex: 0.7,
      minWidth: 110,
      // editable: true,
      type: 'string',
      hideable: true,
      hide: true,

    },
    {
      field: 'roles',
      headerName: 'ROLE',
      flex: 0.7,
      // maxWidth: 200,
      minWidth: 30,
      editable: true,
      type: 'string',
    },
    {
      field: "actions",
      type: "actions",
      headerName: "ACTIONS",
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
      {createOpen || selectedData ? (
        <CreateUpdateUser
          name={name}
          selectedData={selectedData}
          editable={editable}
          setEditable={setEditable}
          createOpen={createOpen}
        />
      ) : (

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

      )}
    </>
  );
}
export default Users;



