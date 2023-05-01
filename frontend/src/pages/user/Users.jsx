import React from 'react';
import { Box } from '@mui/system';
import Datatable from 'src/components/datatable/Datatable';
import UserContext from 'src/context/UserContext';
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Typography } from '@mui/material';
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
function Users() {
    const getRowId = (row) => row._id;

  const { name,userData, isLoading, error, refetch } = React.useContext(UserContext);
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
      <Datatable
        columns={columns}
        rows={userData}
        // isLoading={isLoading}
        // error={error}
        // refetch={refetch}
        // name="Users"
        getRowId={getRowId}
      />
    </>
  );
}
export default Users;



    
