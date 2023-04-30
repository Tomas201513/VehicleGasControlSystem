import React from "react";
import MdModeEditOutline from "@mui/icons-material/ModeEditOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MdDeleteOutline from "@mui/icons-material/DeleteOutline";
import { Popover, Stack, IconButton } from "@mui/material";
// import ServiceContext from "src/context/service/ServiceContext";
import AuthContext from "src/context/AuthContext";

function Mypopover({
  open,
  handleClose,
  handleClickOpen,
  handleEditOpen,
  handleDeleteOpen,
}) {
  const { use, is_superuser, is_staff } = React.useContext(AuthContext);

  return (
    <div>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            opacity: 10,
            p: 0,
            width: "fit-content",
            height: 35,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack direction="row">
          <IconButton
            onClick={() => {
              handleClickOpen();
            }}
            size="small"
          >
            <VisibilityIcon size="small" />
          </IconButton>
          {/* {is_superuser ? (
            <> */}
          <IconButton
            onClick={() => {
              handleEditOpen();
            }}
            size="small"
          >
            {<MdModeEditOutline size="small" />}
          </IconButton>
          <IconButton
            onClick={() => {
              handleDeleteOpen();
            }}
            size="small"
          >
            {<MdDeleteOutline />}
          </IconButton>
          {/* </> */}
          {/* ) : null} */}
        </Stack>
      </Popover>
    </div>
  );
}

export default Mypopover;
