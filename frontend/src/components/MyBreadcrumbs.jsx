import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Stack } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <Breadcrumbs aria-label="breadcrumb">
        <Stack direction="row" spacing={2}>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return   ( <React.Fragment key={index}>
              {isLast ? name : <Link to={routeTo}>{name}</Link>}
            </React.Fragment>);
          })} 
        </Stack>
      </Breadcrumbs>
    </nav>
  );
};

export default Breadcrumb;
  