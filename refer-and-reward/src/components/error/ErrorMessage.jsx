import { Box, Typography } from "@mui/material";
import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h5" color={"error"} align="center">
        {message}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
