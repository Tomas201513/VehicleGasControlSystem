  import React, { useState,useEffect } from "react";
// import Pagination from "@mui/material/Pagination";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton
} from '@mui/material';
import {GetFuelPaginated} from 'src/apis/FuelApi'
// import TablePagination from '@mui/material/TablePagination';
import axios from "axios";
import { TokenJson } from "src/apis/token/AuthToken";
import axiosInstance from "src/utils/useAxiosInterceptors";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
  let  selected = []
  let items = []
  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);


  return (
    <Card>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                {/* <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      onSelectAll?.();
                    } else {
                      onDeselectAll?.();
                    }
                  }}
                /> */}
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  FUEL AMOUNT(L)
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                FILL DATE(GC)
                </Typography>
              </TableCell><TableCell>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  CAR PLATE NO.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  ATTENDANT
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  STATION
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  ACTION
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts?.map((post) => (
              <TableRow
                hover
                key={post.id}
                selected={selected.indexOf(post.id) !== -1}
              >
                <TableCell padding="checkbox">
                  <Checkbox

                    checked={selected.indexOf(post.id) !== -1}
                    onChange={(event) => onSelectOne(event, post.id)}
                    value="true"
                  />
                </TableCell>
                <TableCell>
                 { post.fuelAmount}
                </TableCell>
                <TableCell>
                  {post.fuelDate}
                </TableCell>
                <TableCell>
                  {post.car_id?.plateNumber}
                </TableCell>
                <TableCell>
                  {post.attendant?.userName}
                </TableCell>
                <TableCell>
                  {post.station?.stationName}
                </TableCell>
                <TableCell>
                <IconButton aria-label="delete" onClick={() => handleDelete(post.id)}>
                  <ArrowForwardIcon />
                </IconButton>
                </TableCell>

               
               </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      </Card>
  );
}

export default PaginDatatable;
      

                    


