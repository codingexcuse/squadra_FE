import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationComponent = ({ totalPage, handlePagination, setShowPage }) => {
  const handleOnChange = (event, page) => {
    handlePagination(page);
    setShowPage(page);
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPage}
        variant="outlined"
        color="primary"
        onChange={(event, page) => handleOnChange(event, page)}
      />
    </Stack>
  );
};

export default PaginationComponent;
