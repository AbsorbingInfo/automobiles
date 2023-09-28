import { useEffect, useState, useContext } from "react"
import { Box } from "@mui/material";
import { DataGrid, GridToolbar  } from "@mui/x-data-grid";
import Header from "../../components/Header";
import StyledBox from "../../components/StyledBox";
import { Link } from 'react-router-dom';
import { useAuthContext } from "../../../utils/hooks/useAuthContext"
import moment from 'moment'

const Customers = () => {
  const getRowId = (row) => row._id;
  const [customers, setCustomers] = useState([])
  const { user } = useAuthContext();

  const fetchCustomers = async () => {
    try{
      const response = await fetch('http://localhost:4000/customer', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()
      if (response.ok) {
        setCustomers(json)
      }
    }catch (error) {
      throw error;
    }
  }
  useEffect(() =>{
    fetchCustomers()
  },[])

  const columns = [
    {
      field: "name",
      headerName: "Name",
      headerClassName: 'text-lg',
      cellClassName: "name-column--cell",
      sortable: false,
      minWidth: 150,
      renderCell: (params) => (
        <div className='whitespace-normal'>
          {params.value}
        </div>
      ),
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      headerClassName: 'text-lg',
      flex: 0.4,
      minWidth: 140,
      sortable: false,
      renderCell: (params) => (
        <div className='text-lg whitespace-normal'>
          {params.value}
        </div>
      ),
    },
    {
      field: "registeredNo",
      headerName: "Vehicle No.",
      headerClassName: 'text-lg',
      flex: 0.3,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <div className='whitespace-normal'>
          {params.value}
        </div>
      ),
    },
    {
      field: "amount",
      headerName: "Revenue",
      headerClassName: 'text-lg',
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <div 
        className='whitespace-normal hover:text-[#c35574] hover:underline font-semibold'
        >
        <Link 
          to={{
            pathname: '/admin/customerinvoices',
            search: `?customer=${params.row._id}&id=${params.row.registeredNo}`,
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
        ₹{params.value}
        <img src='/google-drive.png' className='h-8 inline pl-2' />
        </Link>
        </div>
      ),
    },
    {
      field: "location",
      headerName: "Location",
      headerClassName: 'text-lg',
      flex: 0.3,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <div className='whitespace-normal'>
          {params.value}
        </div>
      ),
    },
    {
      field: "make",
      headerName: "Make",
      headerClassName: 'text-lg',
      flex: 0.3,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <div className='whitespace-normal'>
          {params.value}
        </div>
      ),
    },
    {
      field: "model",
      headerName: "Model",
      headerClassName: 'text-lg',
      flex: 0.3,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <div className='whitespace-normal'>
          {params.value}
        </div>
      ),
    },
    {
      field: "buildingName",
      headerName: "Building",
      headerClassName: 'text-lg',
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <div className='whitespace-normal'>
          {params.value}
        </div>
      ),
    },
    {
      field: "roomNo",
      headerName: "Room No.",
      headerClassName: 'text-lg',
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <div className='whitespace-normal'>
          {params.value}
        </div>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      headerClassName: 'text-lg',
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <div className='whitespace-normal'>
          {params.value}
        </div>
      ),
    },
    {
      field: "nextServiceDueDate",
      headerName: "Service Due",
      headerClassName: 'text-lg',
      flex: 1,
      minWidth: 150,
      sortable: false,
      type: 'date',
      valueFormatter: (params) => {
        if(params.value){
          return moment(params?.value).format("DD/MM/YYYY")
        }else{
          return "Not Set"
        }
      },
    },
    {
      field: "nextEngineOilDueDate",
      headerName: "Engine Oil Due",
      headerClassName: 'text-lg',
      flex: 1,
      minWidth: 150,
      sortable: false,
      valueFormatter: (params) => {
        if(params.value){
          return moment(params?.value).format("DD/MM/YYYY")
        }else{
          return "Not Set"
        }
      },
    },
    {
      field: "aadhaarNo",
      headerName: "Aadhaar No",
      headerClassName: 'text-lg',
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        if(params.value){
          return(
            <div className='whitespace-normal'>
              {params.value}
            </div>
          )
        }else{
          return "Not Set"
        }
      },
    },
    {
      field: "dob",
      headerName: "DOB",
      headerClassName: 'text-lg',
      flex: 1,
      minWidth: 150,
      sortable: false,
      type: 'date',
      valueFormatter: params => {
        if(params.value){
          return moment(params?.value).format("DD/MM/YYYY")
        }else{
          return "Not Set"
        }
      },
    },
    {
      field: "lastBirthdayClaim",
      headerName: "Last DOB Claim",
      headerClassName: 'text-lg',
      flex: 1,
      minWidth: 150,
      sortable: false,
      type: 'date',
      valueFormatter: (params) => {
        if(params.value){
          return moment(params?.value).format("DD/MM/YYYY")
        }else{
          return "Not Set"
        }
      },
    },
  ];
  
  return (
    <Box 
    m="8px"
    className="scrollbar-visible"
    >
      <Header
        title="Customers"
      />
      <StyledBox>
        <DataGrid
          disableColumnMenu
          rows={customers}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={getRowId}
        />
      </StyledBox>
    </Box>
  );
};

export default Customers;
