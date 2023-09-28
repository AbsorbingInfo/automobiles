import { useEffect, useState ,useContext } from "react"
import { Box, Typography , TextField, Button, MenuItem, FormControl, Select, Menu} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import BuildIcon from '@mui/icons-material/Build';
import Header from "../../components/Header";
import useFetchServices from "./fetchServices";
import useFetchMechanics from "./fetchMechanics";
import StyledBox from "../../components/StyledBox";
import FmdBadIcon from '@mui/icons-material/FmdBad';
import CustomToolbar from '../../components/CustomToolbar'
import LoadingIcon from '../../../assets/loading.svg';
import {styleSelect, styleMenuItem} from '../../../utils/muiStyles'


const CurrentService = () => {
  const { serviceData, updateServiceStatus, updateMechanic } = useFetchServices('Current');
  const mechanicData = useFetchMechanics();
  const getRowId = (row) => row._id; 
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [mechanicsNames,setMechanicNames] = useState(mechanicData);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      fetchData()
    },1000)
    setIsLoading(false)
  }, [serviceData]);

  useEffect(() => {
    setMechanicNames(mechanicData);
  },[mechanicData])

  const fetchData = () =>{
    setData( serviceData)
  }

  const statusComparator = (v1, v2) => {
    const order = ['Pending', 'Pickedup', 'Servicing', 'Serviced', 'Delivered'];
    const index1 = order.indexOf(v1);
    const index2 = order.indexOf(v2);
    return index1 - index2;
  };

  const columns = [
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 150,
      sortable: false,
      headerClassName: 'text-lg',
      sortComparator: statusComparator,
      renderCell: ( params ) => { 
        const menuItemStyle = (item) =>{
          return  {
            '&.MuiMenuItem-root': {
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '8px 16px',
              backgroundColor: item == 'Pending' ? "#F97B22" : item == 'Pickedup' ? "#7A316F" : item == 'Serviced'? "#EA5455" : item == 'Servicing'? "#1D5B79" : "#3da58a",
              '&:hover': {
                backgroundColor:"#292929",
              },
            },
          };
        }

        const handleClick = (event ,id) => {
          setAnchorEl(event.currentTarget);
          setSelectedRowId(id);
        };

        const handleMenuSelect = (selectedStatus) => {
          updateServiceStatus(selectedRowId,selectedStatus)
          setAnchorEl(null);
        };
      
        return (
        <div>
          <Box
            width="content"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              params.row.status == 'Pending' ? "#F97B22" : 
              params.row.status == 'Pickedup' ? "#7A316F" : 
              params.row.status == 'Serviced'? "#EA5455" :
              params.row.status == 'Servicing'? "#1D5B79" : 
              "#3da58a" 
            }
            borderRadius="4px"
            sx={{
              '&:hover': {
                backgroundColor: "#141414",
                opacity: [0.9, 0.8, 0.7],
                cursor: "pointer"
              },
            }}
            onClick = {(event) => handleClick(event, params.row._id)}
          >
            {params.row.status === "Pending" && <NewReleasesIcon />}
            {params.row.status === "Pickedup" && <WarehouseIcon/>}
            {params.row.status === "Servicing" && <BuildIcon/>}
            {params.row.status === "Serviced" && <LocalParkingIcon/>}
            {params.row.status === "Delivered" && <VerifiedIcon />}
            <Typography color={"#e0e0e0"} sx={{ ml: "5px" }}>
              {params.row.status} 
            </Typography>
          </Box>
          <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          >
          <MenuItem sx={menuItemStyle("Pickedup")} onClick={(event) => handleMenuSelect('Pickedup')}>Picked-up</MenuItem>
          <MenuItem sx={menuItemStyle("Servicing")} onClick={(event) => handleMenuSelect('Servicing')}>Servicing</MenuItem>
          <MenuItem sx={menuItemStyle("Serviced")} onClick={(event) => handleMenuSelect('Serviced')}>Serviced</MenuItem>
          <MenuItem sx={menuItemStyle("Delivered")} onClick={(event) => handleMenuSelect('Delivered')}>Delivered</MenuItem>
          </Menu>
      </div>
        );
      },
    },
    {
      field: "Mechanic",
      headerName: "Mechanic",
      headerClassName: 'text-lg',
      minWidth: 180,
      sortable: false,
      renderCell:(params) =>{
        const [selectedMechanicName, setSelectedMechanicName] = useState('');

        useEffect(() => {
          if (params.row.mechanic && params.row.mechanic.name) {
            setSelectedMechanicName(params.row.mechanic.name);
          }
        }, []);
  
        const handleChange = (event) => {
          setSelectedMechanicName(event.target.value);
          updateMechanic(params.row._id, event.target.value);
        };

        const MenuProps = {
          PaperProps: {
            style: {
              background:"#001C30"
            },
          },
        };
        
        return (
        <div style={{ whiteSpace: 'pre-wrap', maxHeight: 100, overflowX: 'visible' }}>
          
          {(params.row.status === 'Servicing' & (selectedMechanicName.length<1)) ? <FmdBadIcon className="absolute ml-[137px] text-[#91C8E4]"/> : ''}
          <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
            <Select
              value={mechanicsNames.length>0 ? selectedMechanicName : ''}
              onChange={handleChange}
              MenuProps={MenuProps}
              sx={styleSelect}
            >
              {mechanicsNames.map((mechanic) => (
                <MenuItem
                  key={mechanic._id}
                  value={mechanic.name}
                  sx={styleMenuItem}
                >
                  {mechanic.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
       )
     },
    },
    {
      field: "registeredNo",
      headerName: "Regd No.",
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
      field: "make",
      headerName: "Make",
      headerClassName: 'text-lg',
      flex: 1,
      minWidth: 110,
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
      flex: 1,
      minWidth: 170,
      sortable: false,
      renderCell: (params) => (
        <div className='whitespace-normal'>
          {params.value}
        </div>
      ),
    },
    {
      field: "issue",
      headerName: "Issue",
      headerClassName: 'text-lg',
      flex: 1,
      minWidth: 200,
      sortable: false,
      renderCell: (params) => (
        <div className='whitespace-normal'>
          {params.value}
        </div>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: 'text-lg',
      flex: 1,
      minWidth: 150,
      sortable: false,
      cellClassName: "name-column--cell",
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
      flex: 1,
      minWidth: 136,
      sortable: false,
      renderCell: (params) => (
        <div className='text-lg whitespace-normal'>
          {params.value}
        </div>
      ),
    },
    {
      field: "location",
      headerName: "Location",
      headerClassName: 'text-lg',
      flex: 1,
      minWidth: 100,
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
      minWidth: 200,
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
      minWidth: 100,
      sortable: false,
      renderCell: (params) => (
        <div className='whitespace-normal'>
          {params.value}
        </div>
      ),
    }
  ];
  
  //Default sort
  const defaultSortModel = [
    {
      field: 'status',
      sort: 'asc',
    },
  ];

  return (
    <Box m="8px">
    <Header title="Current Services"/>
    <StyledBox>
      {!isLoading && 
      <DataGrid
          disableColumnMenu
          rows={data}
          columns={columns}
          getRowId={getRowId}
          components={{ Toolbar: CustomToolbar }}
          sortModel={defaultSortModel}
        />
      }
        
    </StyledBox>
      {(isLoading) && (
          <div className='fixed top-0 left-0 h-full w-full bg-[#00000080] z-20'>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <img src={LoadingIcon} alt="Loading..." />
            </div>
          </div>
        )}
  </Box>
  );
};

export default CurrentService;