import { useEffect, useState, useContext } from "react"
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CustomToolbar from '../../components/CustomToolbar'
import { useLocation } from 'react-router-dom';
import { useAuthContext } from "../../../utils/hooks/useAuthContext"
import moment from 'moment'

const Invoices = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { user } = useAuthContext();
  const getRowId = (row) => row._id;
  const [allInvoices, setAllInvoices] = useState([]);
  const [header, setHeader] = useState('');
  const [id, setId] = useState('');
  const paramNames = Array.from(searchParams.keys());


  const fetchCustomerInvoices = async (id) => {
    try{
      const response = await fetch(`http://localhost:4000/invoice/${id}`, {
          headers: {'Authorization': `Bearer ${user.token}`},
      })
      if (response.ok) {
      const invoiceList = await response.json()
      setAllInvoices(invoiceList);
      }
    }catch (error) {
        throw error;
    }
  }

  const fetchMechanicInvoices = async (id) => {
    try{
      const response = await fetch(`http://localhost:4000/invoice/mechanic/${id}`, {
          headers: {'Authorization': `Bearer ${user.token}`},
      })
      if (response.ok) {
      const invoiceList = await response.json()
      setAllInvoices(invoiceList);
      }
    }catch (error) {
        throw error;
    }
  }

  const fetchMonthlyMechanicInvoices = async (id) => {
    try{
      const response = await fetch(`http://localhost:4000/invoice/mechanic/monthly/${id}`, {
          headers: {'Authorization': `Bearer ${user.token}`},
      })
      if (response.ok) {
      const invoiceList = await response.json()
      setAllInvoices(invoiceList);
      }
    }catch (error) {
        throw error;
    }
  }

  useEffect(() =>{
    if (paramNames.includes('customer')) {
      setId(searchParams.get('customer'))
      setHeader(searchParams.get('id'))
      fetchCustomerInvoices(id)
    } else if (paramNames.includes('mechanictotal')) {
      setId(searchParams.get('mechanictotal'))
      setHeader(searchParams.get('id'))
      fetchMechanicInvoices(id)
    } else if (paramNames.includes('mechanicmonthly')) {
      setId(searchParams.get('mechanicmonthly'))
      setHeader(searchParams.get('id'))
      fetchMonthlyMechanicInvoices(id)
    }
  },[id])

  const columns = [
    {
      field: "amount",
      headerName: "Amount",
      headerClassName: 'text-xl',
      cellClassName: "name-column--cell",
      flex: 1,
      sortable: false,
      minWidth: 150,
      renderCell: (params) => (
        <div className='whitespace-normal text-lg font-semibold'>
          ₹ {params.value}
        </div>
      ),
    },
    {
      field: "createdAt",
      headerName: "Date",
      headerClassName: 'text-lg',
      flex: 1,
      minWidth: 170,
      sortable: false,
      type: 'date',
      valueFormatter: params => moment(params?.value).format("DD/MM/YYYY"),
    },
    {
      field: "invoiceLink",
      headerName: "Link",
      headerClassName: 'text-lg',
      flex: 1,
      minWidth: 170,
      sortable: false,
      renderCell: (params) => (
        <div className='text-lg whitespace-normal'>
          <Link to={params.value} target="_blank" rel="noopener noreferrer">
            <img src='/google-drive.png' className='h-10 inline' />
          </Link>
        </div>
      ),
    }
  ];

  return (
    <Box m="8px">
      <Box my="20px" className='flex justify-between'>
        <Typography
          variant="h3"
          color='#e0e0e0'
          fontWeight="bold"
          sx={{ m: "0 0 5px 8px" }}
        >
        Invoice List for <span className='italic text-green-300'>{header}</span>
        </Typography>
      </Box>
      <Box
      m="10px 0 0 0"
      height="75vh"
      width="97vw"
      sx={{
            "& .MuiDataGrid-root": {
                border: "none",
            },
            "& .MuiDataGrid-cell": {
                border: "1px solid #33404c",
                fontSize: "16px",
            },
            "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#B42B51",
                borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
                backgroundColor: '#00101f',
            },
            "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: "#B42B51",
            },
            "& .MuiCheckbox-root": {
                color: `white !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `white !important`,
            },
          }}
      >
        <DataGrid
          disableColumnMenu
          rows={ allInvoices }
          columns={ columns}
          components={{ Toolbar: CustomToolbar }}
          getRowId={ getRowId }
        />
      </Box>
    </Box>
  );
};

export default Invoices;
