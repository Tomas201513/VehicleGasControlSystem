import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "src/context/AuthContext";
import PropTypes from 'prop-types';


const PrivateRoute = ({ children, ...rest }) => {
    let { userDetail } = useContext(AuthContext);
    console.log(userDetail);
    return !userDetail ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node
};
