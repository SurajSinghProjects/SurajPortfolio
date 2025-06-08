import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
const Footer = () => {
  return (
    <Box sx={{ pt: 6, textAlign: "center" }}>
      <Typography>
        Refer and Reward <br />
        &copy; {new Date().getFullYear()}
        <Link href="https://dreamcyberinfoway.com/">
          &nbsp;Design & Develop by DCI
        </Link>{" "}
      </Typography>
    </Box>
  );
};

export default Footer;
