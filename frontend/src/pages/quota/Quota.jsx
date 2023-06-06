import React from 'react';
import Datatable from 'src/components/datatable/Datatable';
import QuotaContext from 'src/context/QuotaContext';
import {
  IconButton, Link, Tooltip,
} from '@mui/material';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CreateUpdateQuota from './CreateUpdateQuota';                                                                                                                                                 
import { Helmet } from "react-helmet-async";

function Quota() {
  <Helmet title="Quotas" />
  const getRowId = (row) => row._id;

  const {                                                                                                                                                                                                                                   
    name,
    quotaData,
    isLoading,
    error,
    createOpen,
    setCreateOpen,
    selectedData,
    editable,
    setEditable,
    handleRowClick,
  } = React.useContext(QuotaContext);

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 0.3,
      minWidth: 30,
      type: 'number',
      hideable: true,
      // fontSize: 12,
    },{
      field: 'quotaName',
      headerName: 'Quota Name',
      flex: 0.3,
      minWidth: 30,
      type: 'string',
      hideable: true,
      // fontSize: 12,
    },
    {
      field: 'fuelQuotas',
        headerName: 'FUEL QUOTAS',
        flex: 0.7,
        minWidth: 130,
        editable: true,
        type: 'string',
    },
    {
        field: "actions",
        type: "actions",
        headerName: "ACTIONS",
        flex: 0.7,
        maxWidth: 150,
        minWidth: 100,
        renderCell: (params) => {
            return (<>
                {/* <IconButton>
                        <QrCode2Icon
                            style={{ color: "#666666", cursor: "pointer" }}
                            onClick={() => {
                                setQrId(params.row._id); console.log(params.row._id);
                                SetWarn(true); setQr(true)
                            }}
                        />
                    </IconButton> */}
                <Tooltip title="View Details">

                <IconButton>
                    <ArrowForwardIcon
                        style={{ color: "#666666", cursor: "pointer" }}
                        onClick={() => handleRowClick(params.row)}
                    />
                </IconButton>
                </Tooltip>
            </>
            );
        },
    },
  ]

    return (    
       <>
      {createOpen || selectedData ? (
        <CreateUpdateQuota
          selectedData={selectedData}
          editable={editable}
          setEditable={setEditable}
          createOpen={createOpen}
        />
      ) : (

        <Datatable
          columns={columns}
          rows={quotaData}
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

export default Quota;