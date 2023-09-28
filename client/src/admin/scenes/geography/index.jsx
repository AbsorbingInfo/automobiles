import { Box } from "@mui/material";
import GeographyChart from "../../components/GeographyChart";
import Header from "../../components/Header";

const Geography = () => {
  return (
    <Box m="20px">
      <Header title="Geography" subtitle="Simple Geography Chart" />

      <Box
        height="75vh"
        border={`1px solid ${"#e0e0e0"}`}
        borderRadius="4px"
      >
        <GeographyChart />
      </Box>
    </Box>
  );
};

export default Geography;
