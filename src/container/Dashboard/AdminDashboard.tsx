import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";
import { ORDER_STATUSES } from "../../data/WorkerDetails";

interface Payment {
  id: number | null;
  order_id: number | null;
  order_status: string;
  payment_approval_date: string;
  payment_released_date: string;
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
  const [totalCount, setTotalCount] = useState<number>(0);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [gcashReferenceNumber, setGcashReferenceNumber] = useState<string>("");
  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState<boolean>(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(
    null
  );
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

  const handleRelease = async () => {
    try {
      const response = await axiosInstance.patch(
        `/api/v1/payments/${selectedPaymentId}`,
        {
          gcash_reference_number: gcashReferenceNumber,
        }
      );

      if (response.data) {
        setPayments((prevPayments) =>
          prevPayments.map((payment) =>
            payment.id === response.data.payment.id
              ? { ...payment, ...response.data.payment }
              : payment
          )
        );
        setSuccessMessage(response.data.message);
        setGcashReferenceNumber("");
        setSelectedOrderId(null);
        setSelectedPaymentId(null);
        setIsReleaseModalOpen(false);
      }
    } catch (error) {
      console.log("Error releasing: ", error);
      setErrorMessage("Something went wrong");
    }
  };

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
      <CustomSnackbar
        successMessage={successMessage}
        errorMessage={errorMessage}
        isSnackbarOpen={isSnackbarOpen}
        handleSetIsSnackbarOpen={(value) => setIsSnackbarOpen(value)}
      />
      <Modal
        open={isReleaseModalOpen}
        onClose={() => setIsReleaseModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            backgroundColor: "background.paper",
            border: "2px solid primary.main",
            boxShadow: 24,
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Typography variant="h4">
            Enter Gcash Reference Number for order #{selectedOrderId}
          </Typography>
          <TextField
            fullWidth
            label="Gcash Reference Number"
            value={gcashReferenceNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setGcashReferenceNumber(e.target.value)
            }
          />
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsReleaseModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              sx={{ color: "common.white" }}
              variant="contained"
              color="secondary"
              onClick={handleRelease}
            >
              Release
            </Button>
          </Box>
        </Box>
      </Modal>
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
            "& thead .MuiTableCell-root": {
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
                <TableRow key={index}>
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
                    {payment.payment_approval_date !== null &&
                    payment.payment_released_date === null ? (
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          setSelectedOrderId(payment.order_id);
                          setSelectedPaymentId(payment.id);
                          setIsReleaseModalOpen(true);
                        }}
                      >
                        Release
                      </Button>
                    ) : Number(payment.order_status) === 7 ? (
                      <Typography>Released</Typography>
                    ) : (
                      <Typography>Not yet</Typography>
                    )}
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
