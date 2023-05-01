import React from 'react';
import Datatable from 'src/components/datatable/Datatable';
import UserContext from 'src/context/UserContext';
import { Typography, Box, Button, IconButton, Tooltip, Container, FormGroup, FormControlLabel, Switch } from '@mui/material';
import CreateUpdateUser from './CreateUpdateUser';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";

function Users() {
    const getRowId = (row) => row._id;

  const {
    name,
    userData,
    isLoading,
    error,
    refetch,
    createOpen,
    setCreateOpen,
    selectedUserData,
    setSelectedUserData,
    editable,
    setEditable,
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
      minWidth: 110,
      editable: true,
      type: 'string',
    },
    // {
    //    field: "actions",
    //    type : "actions",
    //     // headerName: "ACTIONS",
    //     flex: 0.7,
    //     minWidth: 110,
    //     renderCell: (params) => {
    //       return (
    //         // <Box>
    //         <>
    //           <IconButton>
    //             <EditIcon
    //               style={{ color: "#666666", cursor: "pointer" }}

    //               // onClick={() => handleEditOpen(params.row)}
    //             />
    //           </IconButton>
    //           <IconButton>
    //             <VisibilityIcon
    //               style={{ color: "#666666", cursor: "pointer" }}
    //               // onClick={() => handleOpenMenu(params.row)}
    //             />
    //           </IconButton>
    //           <IconButton>
    //             <DeleteIcon
    //               style={{ color: "#666666", cursor: "pointer" }}
    //               // onClick={() => handleDeleteOpen(params.row)}
    //             />
    //           </IconButton>

    //           {/* <Accessablity 
    //              handleEditOpen={() => handleEditOpen(params.row)}
    //              handleDeleteOpen={() => handleDeleteOpen(params.row)}
    //           /> */}
    //         </>
    //         // </Box>
    //       );
    //     }
    // },
  ];
  return (
    <>
      <Typography variant="h4" color="textSecondary" marginLeft={4} marginTop={4}>
        {name}
      </Typography>
      {/* <DataGrid rows={userData} columns={columns} getRowId={getRowId} /> */}
      {createOpen || selectedUserData ? (
        <>
          <Container maxWidth="md" sx={{ marginTop: "2vh" }}>
            <Tooltip title="Back">
              <IconButton
                onClick={() => {
                  setSelectedUserData(null), setEditable(false), setCreateOpen(false);
                }}
                size="small"
              >
                <ArrowBackIcon size="small" />
              </IconButton>
            </Tooltip>

            {selectedUserData ? (
              <>
                {" "}
                <Tooltip title="Editable">
                  <FormControlLabel
                    control={<Switch />}
                    label="edit"
                    onChange={() => setEditable(!editable)}
                  />
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    onClick={() => console.log("delete" + selectedUserData._id)}
                  >
                    <DeleteIcon size="small" />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <></>
            )}
            <CreateUpdateUser selectedUserData={selectedUserData} editable={editable} />
          </Container>
        </>
      ) : (
        <>
          {" "}
          <Datatable
            columns={columns}
            rows={userData}
            // isLoading={isLoading}
            // error={error}
            // refetch={refetch}
            // name="Users"
            createOpen={createOpen}
            setCreateOpen={setCreateOpen}
            selectedUserData={selectedUserData}
            setSelectedUserData={setSelectedUserData}
            editable={editable}
            setEditable={setEditable}
            getRowId={getRowId}
          />
        </>
      )}
    </>
  );
}
export default Users;



    
