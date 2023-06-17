import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "src/context/AuthContext";
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';


const PrivateRoute = ({ children, ...rest }) => {
    let { isLoading, userDetail } = useContext(AuthContext);
    // console.log(userDetail);
    if (isLoading) {
        return <CircularProgress />;
      }
    return !userDetail ? <Navigate to="/" state={{ from: rest?.location?.pathname }} replace /> : <Outlet />;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node
};
