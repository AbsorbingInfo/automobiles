import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import useFetchOffers from "./fetchOffers";
import { Link } from 'react-router-dom';
import StyledBox from "../../components/StyledBox";
import CustomToolbar from '../../components/CustomToolbar'
import moment from 'moment'

const Offers = () => {
  const Data = useFetchOffers();
  const getRowId = (row) => row._id; 

  const columns = [
    {
      field: "title",
      headerName: "Title",
      headerClassName: 'text-lg',
      flex: 0.7,
      minWidth: 150,
      cellClassName: "name-column--cell",
      sortable: false,
      renderCell: (params) => (
        <div className='whitespace-normal'>
          {params.value}
        </div>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      headerClassName: 'text-lg',
      flex: 1,
      minWidth: 220,
      sortable: false,
      renderCell: (params) => (
        <div className='whitespace-normal'>
          {params.value}
        </div>
      ),
    },
    {
      field: "fromDate",
      headerName: "From Date",
      headerClassName: 'text-lg',
      flex: 0.3,
      minWidth: 130,
      sortable: false,
      type: 'date',
      valueFormatter: params => moment(params?.value).format("DD/MM/YYYY"),
    },
    {
      field: "tillDate",
      headerName: "Till Date",
      headerClassName: 'text-lg',
      flex: 0.3,
      minWidth: 130,
      sortable: false,
      type: 'date',
      valueFormatter: params => moment(params?.value).format("DD/MM/YYYY"),
    },
    {
      field: "imageLink",
      headerName: "Image",
      headerClassName: 'text-lg',
      flex: 0.2,
      minWidth: 110,
      sortable: false,
      renderCell: (params) => (
        <div className='whitespace-normal'>
          <Link to={params.value} target="_blank" rel="noopener noreferrer">
            <img src='/google-drive.png' className='h-10 inline' />
          </Link>
        </div>
      ),
    }]

  const defaultSortModel = [
    {
      field: 'status',
      sort: 'desc',
    },
  ];

  return (
    <Box m="8px">
    <Header title="Offers" />
    <StyledBox>
      <DataGrid
        disableColumnMenu
        rows={Data}
        columns={columns}
        getRowId={getRowId}
        components={{ Toolbar: CustomToolbar }}
        sortModel={defaultSortModel}
      />
    </StyledBox>
  </Box>
  );
};

export default Offers;
