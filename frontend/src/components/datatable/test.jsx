import React, { useState,useEffect } from "react";
// import Pagination from "@mui/material/Pagination";
import {Box}  from '@mui/material'; 
import {GetFuelPaginated} from 'src/apis/FuelApi'
import TablePagination from '@mui/material/TablePagination';
import axios from "axios";
import { TokenJson } from "src/apis/token/AuthToken";
import axiosInstance from "src/utils/useAxiosInterceptors";

import Pagination from './Pagination';
function PaginDatatable() {

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalItem, setTotalItems] = useState(0);

  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0);
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 0));
    setPage(0);
  };


  useEffect(() => {
    const fecthPosts = async () => {
      setLoading(true);
      try {
        const api4 = "http://127.0.0.1:8000/api/fuel/paginated/"
        // const res = await fetch(`${api4}${page}/9`);
        const res = await axiosInstance.get(
          `http://127.0.0.1:8000/api/fuel/paginated/${page}/${rowsPerPage}`);
        console.log('11111111ddddddddddddddddddddooosss',res);

        const { fuelIntakes:data, pages: totalPages, currentPage: currentPage ,totalIems} = res.data;
        console.log('datatatatatataat',data);
        console.log('totalPages',totalPages);
        console.log('currentPage',currentPage);

        setPage(currentPage);
        setPosts(data);
        setLoading(false);
        setTotalItems(totalIems);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError("Some error occured");
      }
    };

    fecthPosts();
  }, [page]);

  return (
    <Box sx={{ width: '100%',ml:10}}>
    {loading ? (
      <h3 className="loading-text">Loading...</h3>
    ) : error ? (
      <h3 className="error-text">{error}</h3>
    ) : (
      <>
      <Box sx={{ width: '50%',mr:50}}>
        <TablePagination
        component="div"
        count={totalItem}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </Box>
        <Box className="app__posts">
          {posts.map((post) => (
            <Box sx={{ width: '100%',ml:10}}>
              <h3>{post.car_id.plateNumber}</h3>
              <p>{post.attendant.userName }</p>
              <p>{post.station.stationName}</p>
              <p>{post.fuelAmount}</p>
              </Box>
          ))}
        </Box>
      </>
    )}
  </Box>
    // <Box sx={{ width: '100%',ml:10}}>
    //   <ul>
    //     {paginatedItems?.map((item, index) => (
    //       <li key={index}>{item.car_id.plateNumber}</li>
    //     ))}
    //   </ul>
    //   <TablePagination
    //     component="div"
    //     count={100}
    //     page={page}
    //     onPageChange={handleChangePage}
    //     rowsPerPage={rowsPerPage}
    //     onRowsPerPageChange={handleChangeRowsPerPage}
    //   />
    // </Box>
  );
};

export default PaginDatatable

