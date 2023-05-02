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
    selectedData,
    setselectedData,
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
      {createOpen || selectedData ? (
        <>
          <Container maxWidth="md" sx={{ marginTop: "2vh" }}>
            <Tooltip title="Back">
              <IconButton
                onClick={() => {
                  setselectedData(null), setEditable(false), setCreateOpen(false);
                }}
                size="small"
              >
                <ArrowBackIcon size="small" />
              </IconButton>
            </Tooltip>

            {selectedData ? (
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
                  <IconButton size="small" onClick={() => console.log("delete" + selectedData._id)}>
                    <DeleteIcon size="small" />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <></>
            )}
            <CreateUpdateUser selectedData={selectedData} editable={editable} />
          </Container>
        </>
      ) : (
        <>
          {" "}
          <Datatable
            columns={columns}
            rows={userData}
            createOpen={createOpen}
            setCreateOpen={setCreateOpen}
            setselectedData={setselectedData}
            editable={editable}
            setEditable={setEditable}
            getRowId={getRowId}
            // isLoading={isLoading}
            // error={error}
            // refetch={refetch}
            // name="Users"
          />
        </>
      )}
    </>
  );
}
export default Users;



    
