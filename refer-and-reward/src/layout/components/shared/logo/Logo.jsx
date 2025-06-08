import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "40px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled sx={{ display: "inline-block", width: "105px" }} href="/">
      <Image
        src="/images/logos/logo-dark.svg"
        alt="logo"
        height={40}
        width={105}
        priority
      />
    </LinkStyled>
  );
};

export default Logo;
