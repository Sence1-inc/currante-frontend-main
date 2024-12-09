import { Box, Button, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { useAppSelector } from "../../redux/store";
import { User } from "../../redux/type";
import CustomizedDialog from "../Dialog/CustomizedDialog";

type UserData = {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  identification_photo: string;
  phone_number: string;
  is_identification_verified: boolean;
};

const UsersDataGrid = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const user: User = useAppSelector((state) => state.user);
  const [pagination, setPagination] = useState({
    total: 0,
    perPage: 10,
    currentPage: 1,
    lastPage: 1,
    nextPageUrl: "",
    prevPageUrl: "",
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<UserData | null>(null);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "first_name",
      headerName: "First name",
      width: 150,
      flex: 1.2,
    },
    {
      field: "middle_name",
      headerName: "Middle name",
      width: 150,
      flex: 1.2,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      width: 150,
      flex: 1.2,
    },
    {
      field: "identification_photo",
      headerName: "Actions",
      width: 150,
      flex: 1,
      renderCell: (params: GridRenderCellParams<UserData>) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setSelectedRow(params.row);
            setIsOpen(true);
          }}
        >
          View
        </Button>
      ),
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      width: 150,
      flex: 1,
    },
    {
      field: "is_identification_verified",
      headerName: "Is Verified",
      width: 100,
      flex: 1.5,
      valueGetter: (_value, row) =>
        row.is_identification_verified ? "Yes" : "No",
    },
  ];

  const handleVerifyIdentification = async () => {
    setIsButtonLoading(true);
    try {
      const response = await axiosInstance.patch(
        `/api/v1/users/${selectedRow?.id}`,
        { is_identification_verified: true, user_id: user.id }
      );
      setIsButtonLoading(false);
      if (response.status === 201) {
        const updatedUser = formatUser(response.data.user);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
      }
    } catch (error) {
      setIsButtonLoading(false);
      console.log(error);
    }
  };

  const formatUser = (user: User): UserData => {
    return {
      id: user.id as number,
      first_name: user.first_name as string,
      middle_name: user.middle_name as string,
      last_name: user.last_name as string,
      identification_photo: user.identification_photo as string,
      phone_number: user.phone_number as string,
      is_identification_verified: user.is_identification_verified as boolean,
    };
  };

  const getUsers = async (page: number = 1) => {
    try {
      const response = await axiosInstance.get(`/api/v1/users?page=${page}`);

      if (response.status === 200) {
        setUsers(response.data.data.map(formatUser));
        setPagination({
          total: response.data.total,
          perPage: response.data.per_page,
          currentPage: response.data.current_page,
          lastPage: response.data.last_page,
          nextPageUrl: response.data.next_page_url,
          prevPageUrl: response.data.prev_page_url,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers(pagination.currentPage);
  }, [pagination.currentPage]);

  const handlePageChange = (params: { page: number; pageSize: number }) => {
    setPagination({
      ...pagination,
      currentPage: params.page + 1,
    });
  };

  return (
    <>
      <CustomizedDialog
        isButtonLoading={isButtonLoading}
        handleIsOpen={(value) => setIsOpen(value)}
        handleButtonClick={handleVerifyIdentification}
        isOpen={isOpen}
        title={`Identification`}
        isButtonDisabled={!selectedRow?.identification_photo}
        buttonTitle={`Verify ${selectedRow?.first_name} ${selectedRow?.last_name}'s identification `}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
          }}
        >
          <Typography variant="body1">
            Check ID in: <Link>https://verify.philsys.gov.ph/</Link>
          </Typography>
          <img
            src={selectedRow?.identification_photo}
            width="100%"
            height="auto"
          />
        </Box>
      </CustomizedDialog>
      <DataGrid
        rows={users}
        columns={columns}
        pagination
        pageSizeOptions={[10]}
        paginationMode="server"
        onPaginationModelChange={handlePageChange}
        rowCount={pagination.total}
        loading={false}
        initialState={{
          pagination: {
            paginationModel: { page: pagination.currentPage, pageSize: 10 },
          },
        }}
      />
    </>
  );
};

export default UsersDataGrid;
