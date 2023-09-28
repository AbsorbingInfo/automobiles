import { Box, Typography } from "@mui/material";

const StatBox = ({ title, subtitle, icon }) => {

  return (
    <Box width="100%" m="0 30px">
      <Box >
        <Box display="flex">
          {icon}
        <Typography variant="h5" className="pl-3" 
        sx={{ 
          color: '#45CFDD',
          fontSize: 20,
          fontWeight: 600
          }}>
          {subtitle}
        </Typography>
        </Box>

        <Typography
          variant="h4"
          fontWeight="bold"
          className="flex justify-center"
          sx={{ color: "#e0e0e0"}}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
