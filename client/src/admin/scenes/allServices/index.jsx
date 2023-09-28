import { useEffect, useState, useContext  } from "react"
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, TextField } from "@mui/x-data-grid";
import Header from "../../components/Header";
import useFetchServices from "../services/fetchServices";
import StyledBox from "../../components/StyledBox";
import CustomToolbar from '../../components/CustomToolbar'
import { allServicesColumns } from "./allServicesColumns";
import CloseIcon from '@mui/icons-material/Close';

const AllService = () => {
  const { serviceData } = useFetchServices('Delivered');
  const [data, setData] = useState(serviceData);
  const [isDateFormOpen, setIsDateFormOpen] = useState('')
  const getRowId = (row) => row._id; 

  useEffect(() => {
    setData(serviceData);
  },[serviceData])

  const defaultSortModel = [
    {
      field: 'tillDate',
      sort: 'desc',
    },
  ];

  return (
    <Box m="8px">
    <Header title="All Services" />
    <StyledBox>
      <DataGrid
        disableColumnMenu
        rows={data.map(item=>({
                ...item,
                mechanicname : item.mechanic?.name,
                serciveFromDate : item.mechanic?.fromDate
              }))}
        columns={allServicesColumns}
        getRowId={getRowId}
        components={{ Toolbar: CustomToolbar }}
        sortModel={defaultSortModel}
      />
    </StyledBox>
    {isDateFormOpen && (
      <div className="fixed inset-0 flex justify-center items-center shadow-xl z-10">
        <div className="bg-[#A3C7D6] rounded-lg w-96">
          <div className="flex justify-between items-center p-2">
            <div className='font-bold text-lg text-[#001a33]'>
              {dateType}
            </div>
            <CloseIcon
              style={{ color: 'black', cursor: 'pointer', width: '25px', height: '25px' }}
              onClick={handleDateFormClose}
              className="rounded"
            />
          </div>
          <form onSubmit={handleDateUpdate} className="p-4">
              <div className="w-full">
                <TextField
                  label='Date'
                  className="w-full"
                  id="date"
                  type='date'
                  onChange={(e) => setDate(e.target.value)}
                  value={date}  
                  sx={styleForInputFields}
                  InputLabelProps={{
                      shrink: true,
                    }}
                  />
              </div>
            <div className="py-3 mt-3 flex justify-end">
              <Button variant="contained" type="submit" sx={styleButton}>
                Submit
              </Button>
            </div>
            {error && (
              <div className="p-2.5 my-2 border-solid rounded-2xl border-2 border-red-500 text-red-700">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    )}
  </Box>
  );
};

export default AllService;