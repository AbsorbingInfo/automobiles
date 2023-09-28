import { Typography, Box } from "@mui/material";

const Header = ({ title }) => {
  return (
    <Box>
      <Typography
        variant="h2"
        color={"#e0e0e0"}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
