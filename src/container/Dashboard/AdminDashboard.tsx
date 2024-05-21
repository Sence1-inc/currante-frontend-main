import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { ORDER_STATUSES } from "../../data/WorkerDetails";

interface Payment {
  id: number | null;
  order_id: number | null;
  order_status: string;
  ref_code_payment_from_employer: string;
  status: string;
  tax: number;
  total: number;
  worker_fee: number;
  worker_name: string;
  worker_number: string;
  employer_name: string;
}

const AdminDashboard = () => {
  const [payments, setPayments] = useState<Payment[] | []>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalCount, setTotalCount] = useState(0);
  const fields = [
    "id",
    "order_id",
    "order_status",
    "ref_code_payment_from_employer",
    "status",
    "tax",
    "total",
    "worker_fee",
    "worker_name",
    "worker_number",
    "employer_name",
  ];

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    value: number
  ) => {
    if (value >= 0 && value < Math.ceil(totalCount / rowsPerPage)) {
      setPage(value);
    }
  };

  const handleRelease = async () => {};

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getPayments = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/payments?page=${page + 1}&per_page=${rowsPerPage}`
      );

      if (response.status === 200) {
        setPayments(response.data.data);
        setTotalCount(response.data.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPayments();
  }, [page, rowsPerPage]);

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <Box sx={{ padding: "40px" }}>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "common.white" }}
      >
        <Table
          sx={{
            // width: "100%",
            borderCollapse: "separate",
            borderSpacing: "0 10px",
            padding: "10px",
            "& .MuiTableRow-root": {
              backgroundColor: "common.white",
              border: "1px solid #f58a47",
            },
            "& tbody .MuiTableRow-root": {
              border: "1px solid #f58a47",
            },
            "& tbody .MuiTableCell-root": {
              borderTop: "1px solid #f58a47",
              borderBottom: "1px solid #f58a47",
            },
            "& thead .MuiTableCell-root, & tfoot .MuiTableCell-root": {
              borderTop: "none",
              borderBottom: "none",
            },
          }}
        >
          <TableHead>
            <TableRow sx={{ border: "none" }}>
              {fields
                .map((item) =>
                  item
                    .replace(/_/g, " ")
                    .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())
                    .replace(/\s+/g, "")
                )
                .map((field) => {
                  return (
                    <TableCell key={field} align="center">
                      {field}
                    </TableCell>
                  );
                })}
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment: Payment, index: number) => {
              return (
                <TableRow
                  key={index}
                  // sx={{
                  //   // border: "2px solid #f58a47"
                  //   border: "2px solid #f58a47",
                  //   borderRadius: "10px",
                  // }}
                >
                  <TableCell component="th" scope="row">
                    {payment.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {payment.order_id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {
                      ORDER_STATUSES.find(
                        (status) => status.id === Number(payment.order_status)
                      )?.status_name
                    }
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {payment.ref_code_payment_from_employer}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {payment.status}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {payment.tax}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {payment.total}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {payment.worker_fee}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {payment.worker_name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {payment.worker_number}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {payment.employer_name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button variant="contained" onClick={handleRelease}>
                      Release
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TablePagination
              count={totalCount}
              page={page}
              onPageChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminDashboard;
