import { Box, Typography } from "@mui/material";
import Logo from "@/layout/components/shared/logo/Logo";
import AuthRegister from "../../components/auth/RegisterForm";
import AuthLayout from "@/layout/components/AuthLayout";

const Register = () => {
  return (
    <AuthLayout>
      <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
        <Logo />
      </Box>
      <AuthRegister
        title="Register"
        subtext={
          <Typography
            variant="subtitle1"
            textAlign="center"
            color="textSecondary"
            mb={1}>
            Your Social Campaigns
          </Typography>
        }
      />
    </AuthLayout>
  );
};
export default Register;
