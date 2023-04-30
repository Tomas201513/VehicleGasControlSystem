import React from "react";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";

import AuthContext from "src/context/AuthContext";

function Accessablity({
  params,
  name,
  setSelected,
  handleOpenMenu,
  handleClickOpen,
}) {
  const { use, is_superuser, is_staff } = React.useContext(AuthContext);
  console.log(`name: ${name}`);
  return (
    <>
      {is_superuser || (is_staff && name === "Service Request") ? (
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={(event) => {
            setSelected(params.row);
            handleOpenMenu(event);
          }}
        >
          {<MoreVertIcon />}
        </IconButton>
      ) : (
        <IconButton
          onClick={() => {
            setSelected(params.row);
            handleClickOpen();
          }}
          size="small"
        >
          <VisibilityIcon size="small" />
        </IconButton>
      )}
    </>
  );
}
export default Accessablity;
