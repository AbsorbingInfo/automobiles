import { useEffect, useState } from "react"
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import useFetchMechanics from "./fetchMechanics"
import StyledBox from "../../components/StyledBox";
import CustomToolbar from '../../components/CustomToolbar'
import { mechanicColumns } from "./MechanicColumn";

const Mechanics = () => {
  const [mechanicsData, setMechanicsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getRowId = (row) => row._id;
  const { mechanics } = useFetchMechanics()

  useEffect(() => {
    setMechanicsData(mechanics);
    setIsLoading(false);
  },[mechanics])
  
  return (
    <Box m="8px">
      <Header
        title="Mechanics"
      />
      <StyledBox>
        {!isLoading && 
        <DataGrid
          disableColumnMenu
          rows={mechanicsData}
          columns={mechanicColumns}
          components={{ Toolbar: CustomToolbar }}
          getRowId={getRowId}
        />
        }
      </StyledBox>
    </Box>
  );
};

export default Mechanics;
