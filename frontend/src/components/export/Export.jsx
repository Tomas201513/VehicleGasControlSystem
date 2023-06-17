import { useState, useContext, useEffect } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
  Badge,
  styled,
  Button
} from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AuthContext from "src/context/AuthContext";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

// mocks_
// import account from "../../../_mock/account";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Export Selected",
    icon: < HomeIcon sx={{ mr: 1, color: '#9da4ae' }} />,
    nav: "/app/home",
  },
  {
    label: "Export this page",
    icon: <PersonIcon sx={{ mr: 1, color: '#9da4ae' }} />,
    nav: "/app/account",
  },
  {
    label: "Export all pages",
    icon: <PersonIcon sx={{ mr: 1, color: '#9da4ae' }} />,
    nav: "/app/account",
  },
];

// ----------------------------------------------------------------------

export default function Export({fuelIntake2}) {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{
            color: 'black',
            size: 'small',
        }}
        startIcon={<FileDownloadIcon />}
      >       {" Export"}

     
        
      </Button>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 0,
            ml: 0.75,
            width: '10rem',
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
       
        <Stack >
            <MenuItem key={"Export Selected"} onClick={() => { handleClose(); }}>
              {"Export Selected"}
            </MenuItem>
            <MenuItem key={"Export This Page"} onClick={() => {ExportToExcel(fuelIntake2?.fuelIntakes); handleClose(); }}>
              {"Export This Page"}
            </MenuItem>
            <MenuItem key={"Export All"} onClick={() => {  }}>
              {"Export All"}
            </MenuItem>
        </Stack>
      </Popover>
    </>
  );
}


const ExportToExcel = (apiData) => {
  const fileName = "ExcelSheet";
  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = (apiData, fileName) => {
    const formattedData = apiData.map((item) => ({
      fuelAmount: item.fuelAmount,
      fillDate: item.fuelDate,
      car_id: item.car_id.plateNumber,
      attendant: item.attendant.userName,
      station: item.station.stationName,
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }
   exportToExcel(apiData, fileName);
};