import Box from "@mui/material/Box";
import React, { useCallback, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Divider from "@mui/material/Divider";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Grid } from "@mui/material";
import "./Companies.css";
import PaginationComponent from "../../components/Pagination/Pagination";
import AddUser from "../AddUser/AddUser";
import EditUser from "../EditUser/EditUser";
import Filters from "../Filter/Filters";
import ModalComponent from "../../components/Modal/ModalComponent";
import axiosInstance from "../../utils/axios";
import Header from "../../components/Header/Header";
import PopUp from "../../components/PopUp/PopUp";
import AlertMessage from "../../components/Alert/Alert";
import LoadingBar from "react-top-loading-bar";

const Companies = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [prevPage, setPrevPage] = useState(5);
  const [totalPage, setTotalPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [showPage, setShowPage] = useState(1);
  const [singleData, setSingleData] = useState("");
  const [order, setOrder] = useState("DSC");
  const [showDeleteErrorMessage, setDeleteShowErrorMessage] = useState(false);
  const [showDeleteSuccessMessage, setDeleteSuccessMessage] = useState(false);
  const [showAddErrorMessage, setAddShowErrorMessage] = useState(false);
  const [showAddSuccessMessage, setShowAddSuccessMessage] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSorting = (value) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[value].toLowerCase() > b[value].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[value].toLowerCase() < b[value].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateOpen = (getSingleData) => {
    setUpdateOpen(true);
    setSingleData(getSingleData);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  const handleFilterOpen = () => {
    setFilterOpen(true);
  };

  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  const handlePagination = (page) => {
    setPrevPage(page * 5);
  };

  const fetchData = useCallback(async () => {
    setProgress(30);
    try {
      const response = await axiosInstance.get("/get");
      setProgress(60);
      setData(response.data);
      setTotalPage(Math.ceil(response.data.length / 5));
    } catch (e) {
      setProgress(60);
      console.log(e);
    }
    setProgress(100);
  }, []);

  const deleteById = async (id) => {
    setProgress(30);
    try {
      await axiosInstance.delete(`/delete/${id}`);
      fetchData();
      setProgress(60);
      setDeleteSuccessMessage(true);
    } catch (error) {
      console.log(error);
      setProgress(60);
      setDeleteShowErrorMessage(true);
    }
    setProgress(100);
  };

  const handleDeleteMessage = () => {
    setTimeout(() => {
      setDeleteShowErrorMessage(false);
      setDeleteSuccessMessage(false);
      setShowAddSuccessMessage(false);
    }, 5000);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <LoadingBar
        height={3}
        color="#4D47C3"
        progress={progress}
        shadow={true}
      />
      <Box
        sx={{
          position: "relative",
          left: "23px",
          flexGrow: 1,
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
        width="95%"
      >
        <Grid container spacing={2}>
          <Grid item xs={2.3}>
            <Typography
              sx={{ marginLeft: "10px" }}
              fontWeight={600}
              fontSize={18}
              color={theme.palette.primary.main}
            >
              Companies
            </Typography>
          </Grid>
          <Grid item xs={6.7}>
            {handleDeleteMessage()}
            <AlertMessage
              isError={showDeleteErrorMessage}
              isSuccess={showDeleteSuccessMessage}
              errorMessage={`Unable to Delete! Error! Please Try Again`}
              successMessage="Successfully Deleted!"
            />
            <AlertMessage
              isError={false}
              isSuccess={showAddSuccessMessage}
              successMessage="Successfully Added!"
            />
          </Grid>
          <Grid item xs={3}>
            <PrimaryButton
              onClick={handleOpen}
              size="small"
              sx={{ width: "70px" }}
            >
              ADD
            </PrimaryButton>

            <ModalComponent
              showClear={false}
              open={open}
              handleClose={handleClose}
              fetchData={fetchData}
              Component={AddUser}
              title="Add New Compnay"
              setIsError={setAddShowErrorMessage}
              setIsSuccess={setShowAddSuccessMessage}
              setProgress={setProgress}
            />
            <ModalComponent
              showClear={false}
              open={updateOpen}
              handleClose={handleUpdateClose}
              fetchData={fetchData}
              Component={EditUser}
              data={singleData}
              title="Edit Company"
              setIsError={setAddShowErrorMessage}
              setIsSuccess={setShowAddSuccessMessage}
              setProgress={setProgress}
            />
            <ModalComponent
              showClear={true}
              open={filterOpen}
              handleClose={handleFilterClose}
              fetchData={fetchData}
              Component={Filters}
              title="Filters"
            />

            <PrimaryButton
              onClick={handleFilterOpen}
              size="small"
              startIcon={<FilterAltOutlinedIcon />}
              sx={{ width: "110px", marginLeft: "20px" }}
            >
              Filter
            </PrimaryButton>
          </Grid>
        </Grid>
      </Box>

      <Divider
        sx={{
          marginTop: "1rem",
          borderBottomWidth: 2,
          width: "95%",
          marginLeft: "1rem",
          borderStyle: "dashed",
          color: "#151515",
        }}
      />
      <Box
        sx={{
          position: "relative",
          left: "23px",
          flexGrow: 1,
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
        width="95%"
      >
        <Grid container spacing={2}>
          <Header handleSorting={handleSorting} order={order} />
        </Grid>
      </Box>

      <Box
        sx={{ flexGrow: 1, position: "relative", left: "23px" }}
        width="95%"
        height={400}
      >
        {data.length === 0 && (
          <Typography sx={{ fontSize: 20, marginLeft: "26rem" }}>
            No Data Available
          </Typography>
        )}
        {data.slice(prevPage - 5, prevPage).map((company, index) => {
          return (
            <Grid
              key={index}
              container
              spacing={2}
              sx={{
                borderRadius: "8px",
                backgroundColor: theme.palette.secondary.main,
                marginTop: "1rem",
              }}
            >
              <Grid item xs={2}>
                <Typography sx={{ fontSize: 14, marginBottom: "1rem" }}>
                  {company.companyName}
                </Typography>
              </Grid>
              <Grid item xs={2.7}>
                <Typography sx={{ fontSize: 14 }}>{company.email}</Typography>
              </Grid>
              <Grid item xs={1.5}>
                <Typography sx={{ fontSize: 14 }}>
                  {company.validTill}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ fontSize: 14 }}>
                  {company.orgranizationName}
                </Typography>
              </Grid>
              <Grid item xs={1.5}>
                <Typography sx={{ fontSize: 14 }}>
                  {company.companyId}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ fontSize: 14 }}>
                  <EditOutlinedIcon
                    onClick={() => handleUpdateOpen(company)}
                    fontSize="small"
                    sx={{
                      cursor: "pointer",
                      color: theme.palette.primary.main,
                    }}
                  />
                  <PopUp id={company.companyId} deleteById={deleteById} />
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </Box>
      <Box sx={{ flexGrow: 1, position: "relative", left: "23px" }} width="95%">
        <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
          <Grid item xs={4}>
            <Typography
              sx={{
                fontSize: 14,
                marginBottom: "1rem",
                color: theme.palette.headerFont,
              }}
            >
              Page: {showPage}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <PaginationComponent
              totalPage={totalPage}
              handlePagination={handlePagination}
              setShowPage={setShowPage}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Companies;
