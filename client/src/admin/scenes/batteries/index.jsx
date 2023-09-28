import { useEffect, useState, useContext } from "react"
import { DataGrid  } from "@mui/x-data-grid";
import Header from "../../components/Header";
import StyledBox from "../../components/StyledBox";
import useFetchBattery from "./fetchBattery"
import { Box } from '@mui/material';
import CustomToolbar from '../../components/CustomToolbar'
import { batteryColumns } from "./batteryColumn";

const Batteries = () => {
  const getRowId = (row) => row._id; 
  const { batteries } = useFetchBattery();
  const [allBatteries, setAllBatteries] = useState(batteries);

  useEffect(() => {
    setAllBatteries(batteries)
  },[batteries])
  
  const sortRows = (rows) => {
    const unresolvedRows = rows.filter((row) => row.replacement.some((r) => !r.isResolved));
    const resolvedRows = rows.filter((row) => !row.replacement.some((r) => !r.isResolved));
    return [...unresolvedRows, ...resolvedRows];
  };

  const sortedRows = sortRows(allBatteries);

  const getRowClassName = (params) => {
    const isReplacementResolved = params.row.replacement;
    let isResolved = true;
    isReplacementResolved.forEach((battery) => {
      if(!battery.isResolved){
        isResolved = false;
      }
    });
    if(!isResolved){
      return 'battery-not-resolved';
    }
    return ''; 
  };

  return (
    <Box m="8px">
      <Header
        title="Batteries"
      />
      <StyledBox>
        <DataGrid
          disableColumnMenu
          rows={ sortedRows }
          columns={ batteryColumns}
          components={{ Toolbar: CustomToolbar }}
          getRowId={ getRowId }
          getRowClassName={ getRowClassName }
        />
      </StyledBox>
    </Box>
  );
};

export default Batteries;
