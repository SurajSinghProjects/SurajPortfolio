import HorizontalLayout from "@/layout/components/HorizontalLayout";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { UserDetailsService } from "@/service/userDashboard";
import TableDateFormat from "@/components/common/TableDateFormate";
import BaseCard from "@/components/shared/BaseCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "@/store/thunk/UserDetailsThunk";
import DashboardCard from "@/components/shared/DashboardCard";
import {
  Alert,
  Box,
  Button,
  Collapse,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import theme from "../../../utils/theme";
import { useRouter } from "next/router";
import Loader from "@/components/loader/Loader";
import ErrorMessage from "@/components/error/ErrorMessage";
import CloseIcon from "@mui/icons-material/Close";
function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [dataTable, setDataTable] = useState([]);
  const [sorting, setSorting] = useState({ col: "_id", dir: "desc" });
  const [pagination, setPagination] = useState({ page: 1, perpage: 10 });
  const [totalRows, setTotalRows] = useState(0);
  const [search, setSearch] = useState("");
  const [localReferalCode, setLocalReferalCode] = useState("");
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    dispatch(fetchUserDetails());
    document.title = "Referral User";
    setLocalReferalCode(JSON.parse(localStorage.getItem("referralCode")));
  }, []);

  useEffect(() => {
    fetchData();
  }, [search, pagination, sorting]);
  const { role } = useSelector((state) => state.user.data);
  const { userListStatus } = useSelector((state) => state.user);

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const copyUrl = `${API_URL}/signup/${localReferalCode}`;
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
    // {
    //   id: "S_No",
    //   name: "S.No.",
    //   sortable: true,
    //   selector: (row, index) => index + 1,
    // },
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

  // copy clip board js code
  const handleCopyClipBoard = () => {
    const base_URL = `${API_URL}/signup?code=${localReferalCode}`;
    const tempInput = document.createElement("input");
    tempInput.setAttribute("value", base_URL);
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    setAlert(true);
  };

  const fetchData = () => {
    setTimeout(function () {
      UserDetailsService.getOne({
        search: search,
        page: pagination.page,
        perpage: pagination.perpage,
        sortby: sorting.col,
        sortdir: sorting.dir,
      })
        .then((response) => {
          setDataTable(response.data.data.paginatedData);
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
  if (role && role === "2") {
    router.push("/admin/dashboard");
  }

  if (userListStatus.status === "LOADING") {
    return <Loader />;
  }

  if (userListStatus.status === "ERROR") {
    return <ErrorMessage message={userListStatus.message} />;
  }

  return (
    <HorizontalLayout>
      <Grid container spacing={3} mb="25px">
        <Grid item xs={12} lg={12}>
          <DashboardCard title="Referral Code">
            {alert && (
              <Box sx={{ width: "100%" }}>
                <Collapse in={open}>
                  <Alert
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setAlert(false);
                        }}>
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}>
                    Referral Code successfully copied!
                  </Alert>
                </Collapse>
              </Box>
            )}
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              border="2px dashed #FFE933"
              width="50%"
              padding="5px 8px">
              <Typography color="textSecondary" variant="h4" marginRight="5px">
                {copyUrl ? copyUrl : "referral code does not exists."}
              </Typography>{" "}
              <Button
                variant="outlined"
                color="success"
                onClick={handleCopyClipBoard}>
                Copy URL
              </Button>
            </Stack>
          </DashboardCard>
        </Grid>
      </Grid>
      <BaseCard
        title="User Referred"
        variant={theme.palette.primary.contrastText}>
        <Box component="form" className="searchBox d-flex">
          <TextField
            onChange={handleSearch}
            placeholder="Type Here FirstName LastName Email PhoneNumber"
            label="Search"
            value={search}
            className="inputSearch"
            variant="outlined"
            sx={{ width: "100%" }}
          />
        </Box>

        {userListStatus.status === "SUCCESS" && (
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

export default Dashboard;
