import Logo from "@/layout/components/shared/logo/Logo";
import AuthLayout from "@/layout/components/AuthLayout";
import { Typography, Box } from "@mui/material";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <AuthLayout>
      <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
        <Logo />
      </Box>

      <LoginForm
        title="Login"
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
export default Login;
