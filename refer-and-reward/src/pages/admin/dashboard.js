import HorizontalLayout from "@/layout/components/HorizontalLayout";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import TableDateFormat from "@/components/common/TableDateFormate";
import BaseCard from "@/components/shared/BaseCard";
import theme from "../../../utils/theme";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "@/store/thunk/UserDetailsThunk";
import { AdminApiServices } from "@/service/adminDashboard";
import { useRouter } from "next/router";
import { Box, TextField } from "@mui/material";
import Loader from "@/components/loader/Loader";
import ErrorMessage from "@/components/error/ErrorMessage";

function AdminDashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [dataTable, setDataTable] = useState([]);
  const [sorting, setSorting] = useState({ col: "_id", dir: "desc" });
  const [pagination, setPagination] = useState({ page: 1, perpage: 10 });
  const [totalRows, setTotalRows] = useState(0);
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(fetchUserDetails());
    document.title = "Referral User";
  }, []);
  useEffect(() => {
    fetchData();
  }, [search, pagination, sorting]);
  const { role } = useSelector((state) => state.user.data);
  const { userListStatus } = useSelector((state) => state.user);
  const { isFetching, isSuccess } = useSelector((state) => state.user);

  const mySweetTheme = {
    rows: {
      style: {
        backgroundColor: "#FFFFFF", // override the row height
      },
    },
    headCells: {
      style: {
        backgroundColor: "#FFFFFF",
        fontWeight: 500,
        fontSize: "0.875rem",
        lineHeight: "1.5",
        color: "rgba(0, 0, 0, 0.87)",
        padding: "16px",
      },
    },
    cells: {
      style: {
        backgroundColor: "#FFFFFF",
        padding: "16px",
      },
    },
  };
  const columns = [
    {
      id: "_id",
      name: "id",
      sortable: true,
      selector: (row, index) => index + 1,
    },
    {
      id: "firstName",
      name: "First Name",
      sortable: true,
      selector: (row) => row.firstName,
    },
    {
      id: "lastName",
      name: "Last Name",
      sortable: true,
      selector: (row) => row.lastName,
    },
    {
      id: "email",
      name: "Email",
      sortable: false,
      sortField: "email",
      selector: (row) => row.email,
    },
    {
      id: "phoneNumber",
      name: "Phone Number",
      sortable: false,
      sortField: "email",
      selector: (row) => row.phone,
    },
    {
      id: "ipAddress",
      name: "IP Address",
      sortable: false,
      sortField: "ipAddress",
      selector: (row) => row.ipAddress,
    },
    {
      id: "address",
      name: "Address",
      sortable: false,
      sortField: "Address",
      selector: (row) => row.address,
    },

    {
      id: "createdAt",
      name: "Created Date",
      sortable: true,
      selector: (row) => row.createdAt,
      cell: (row) => <TableDateFormat datetime={row.createdAt} />,
    },
  ];

  const fetchData = () => {
    setTimeout(function () {
      AdminApiServices.getAllUserList({
        search: search,
        page: pagination.page,
        perpage: pagination.perpage,
        sortby: sorting.col,
        sortdir: sorting.dir,
      })
        .then((response) => {
          setDataTable(response.data.data);
          setTotalRows(response.data[1]);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 200);
  };

  const handleSort = (col, dir) => {
    setSorting({ col: col.id, dir: dir });
  };

  const handlePageChange = (page) => {
    setPagination({ page: page, perpage: pagination.perpage });
  };

  const handlePerRowsChange = (perpage, page) => {
    setPagination({ page: page, perpage: perpage });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  if (role && role === "1") {
    router.push("/dashboard");
  }

  if (userListStatus.status === "LOADING") {
    return <Loader />;
  }

  if (userListStatus.status === "ERROR") {
    return <ErrorMessage message={userListStatus.message} />;
  }
  return (
    <HorizontalLayout>
      <BaseCard
        title="All User Referred List"
        variant={theme.palette.primary.contrastText}>
        <Box component="form" className="searchBox d-flex">
          <TextField
            onChange={handleSearch}
            label="Search"
            value={search}
            className="inputSearch"
            variant="outlined"
            sx={{ width: "100%" }}
            placeholder="Type Here FirstName LastName Email PhoneNumber"
          />
        </Box>
        {isFetching && <Loader />}
        {isSuccess && (
          <DataTable
            style={{ minWidth: "50rem" }}
            columns={columns}
            data={dataTable}
            sortServer
            onSort={handleSort}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            customStyles={mySweetTheme}
          />
        )}
      </BaseCard>
    </HorizontalLayout>
  );
}

export default AdminDashboard;
