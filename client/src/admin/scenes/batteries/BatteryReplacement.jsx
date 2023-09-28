import React, {useEffect, useState} from 'react'
import { TextField, Box, Typography, InputLabel, Select, MenuItem, FormControl, Button } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { useLocation } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import LoadingIcon from '../../../assets/loading.svg';
import useFetchBattery from "./fetchBattery"
import moment from 'moment'

const BatteryReplacement = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const batteryId = searchParams.get('battery');
    const { getBatteryByIdApi, createBatteryReplacementApi, updateReceivedFromCustomerDateApi, 
      updateSentToDealerDateApi, updateReceivedFromDealerDateApi, updateDeliveredDateApi } = useFetchBattery();
    const [replacedBatteryData, setReplacedBatteryData] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isNewForm, setIsNewForm] = useState(false);
    const [isDateFormOpen, setIsDateFormOpen] = useState(false);
    const [newSerialNumber, setNewSerialNumber] = useState('');
    const [selectedSerialNumber, setSelectedSerialNumber] = useState('');
    const [dateType, setDateType] = useState('');
    const [date, setDate] = useState('');
    const [replacementDataChange, setReplacementDataChange] = useState(false)


    useEffect(() => {
      if(isLoading){
        setTimeout(async() => {
          const data = await getBatteryByIdApi(batteryId)
          setReplacedBatteryData(data);
          setIsLoading(false);
        }, 1000)
      }else{
        fetchUpdatedRows();
      }
    },[replacementDataChange])

    const fetchUpdatedRows = async() => {
      const data = await getBatteryByIdApi(batteryId)
      setReplacedBatteryData(data)
    }


    const replacementColumns = [
    {
      field: "serialNumber",
      headerName: "Serial Number",
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
      field: "receivedFromCustomerDate",
      headerName: "Received From Customer",
      headerClassName: 'text-lg',
      flex: 0.3,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        const [formattedDate, setFormattedDate] = useState('Not Set')
        useEffect(() => {
          if(params.row.receivedFromCustomerDate){
            setFormattedDate(moment(params?.value).format("DD/MM/YYYY"))
          }
        })
      return(
        <div className='whitespace-normal hover:text-[#c35574] hover:underline hover:cursor-pointer'
        onClick={() =>{
          setDateType('Received From Customer');
          setIsDateFormOpen(true)
          setSelectedSerialNumber(params.row.serialNumber)
          if(params.value){
            setDate(params.value)
          }
        }}
        >
          {formattedDate}
        </div>
      )},
    },
    {
      field: "sentToDealerDate",
      headerName: "Sent To Dealer",
      headerClassName: 'text-lg',
      flex: 0.3,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        const [formattedDate, setFormattedDate] = useState('Not Set')
        useEffect(() => {
          if(params.row.sentToDealerDate){
            setFormattedDate(moment(params?.value).format("DD/MM/YYYY"))
          }
        })
      return(
        <div className='whitespace-normal hover:text-[#c35574] hover:underline hover:cursor-pointer'
        onClick={() =>{
          setDateType('Sent To Dealer');
          setIsDateFormOpen(true)
          setSelectedSerialNumber(params.row.serialNumber)
        }}
        >
          {formattedDate}
        </div>
      )},
    },
    {
      field: "receivedfromDealerDate",
      headerName: "Received From Dealer",
      headerClassName: 'text-lg',
      flex: 0.3,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        const [formattedDate, setFormattedDate] = useState('Not Set')
        useEffect(() => {
          if(params.row.receivedFromDealerDate){
            setFormattedDate(moment(params?.value).format("DD/MM/YYYY"))
          }
        })
      return(
        <div className='whitespace-normal hover:text-[#c35574] hover:underline hover:cursor-pointer'
        onClick={() =>{
          setDateType('Received From Dealer');
          setIsDateFormOpen(true)
          setSelectedSerialNumber(params.row.serialNumber)
        }}
        >
          {formattedDate}
        </div>
      )},
    },
    {
      field: "deliveredDate",
      headerName: "Delivered",
      headerClassName: 'text-lg',
      flex: 0.3,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        const [formattedDate, setFormattedDate] = useState('Not Set')
        useEffect(() => {
          if(params.row.deliveredDate){
            setFormattedDate(moment(params?.value).format("DD/MM/YYYY"))
          }
        })
      return(
        <div className='whitespace-normal hover:text-[#c35574] hover:underline hover:cursor-pointer'
        onClick={() =>{
          setDateType('Delivered');
          setIsDateFormOpen(true)
          setSelectedSerialNumber(params.row.serialNumber)
        }}
        >
          {formattedDate}
        </div>
      )},
    },
    { field: 'isResolved', hide: true },
  ];

  const handleNewReplacement = () => {
    setIsNewForm(true)
  }
  const handleNewReplacementClose = () => {
    setIsNewForm(false)
    setNewSerialNumber('');
  }
  const handleDateFormClose = () => {
    setIsDateFormOpen(false)
    setDate('');
  }
  
  const newReplacemnt = async(e) =>{
    try {
      await createBatteryReplacementApi( batteryId, newSerialNumber);
      setReplacementDataChange(prevState => !prevState);
      setIsNewForm(false);
      alert("Battery Replacement Record Submitted");
      setNewSerialNumber('');
      e.target.reset();
      setError('');
    } catch (error) {
      setError(error.message);
    }
  }

  const newReplacemntSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      newReplacemnt(e);
      setIsSubmitting(false);
    }, 2000)
  }

  const UpdateRecievedFromCustomer = async(e) =>{
    try {
      await updateReceivedFromCustomerDateApi( batteryId, selectedSerialNumber, date);
      setReplacementDataChange(prevState => !prevState);
      setIsDateFormOpen(false);
      setDate('');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  }

  const updateSentToDealerDate = async(e) =>{
    try {
      await updateSentToDealerDateApi( batteryId, selectedSerialNumber, date);
      setReplacementDataChange(prevState => !prevState);
      setIsDateFormOpen(false);
      setDate('');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  }

  const updateReceivedFromDealerDate = async(e) =>{
    try {
      await updateReceivedFromDealerDateApi( batteryId, selectedSerialNumber, date);
      setReplacementDataChange(prevState => !prevState);
      setIsDateFormOpen(false);
      setDate('');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  }

  const updateDeliveredDate = async(e) =>{
    try {
      await updateDeliveredDateApi( batteryId, selectedSerialNumber, date);
      setReplacementDataChange(prevState => !prevState);
      setIsDateFormOpen(false);
      setDate('');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  }

  const handleDateUpdate = (e) => {
    e.preventDefault();
    if(dateType == 'Received From Customer'){
      setIsSubmitting(true);
      setTimeout(() => {
        UpdateRecievedFromCustomer(e);
        setIsSubmitting(false);
      }, 2000)
    }else if(dateType == 'Sent To Dealer'){
      setIsSubmitting(true);
      setTimeout(() => {
        updateSentToDealerDate(e);
        setIsSubmitting(false);
      }, 2000)
    }else if(dateType == 'Received From Dealer'){
      setIsSubmitting(true);
      setTimeout(() => {
        updateReceivedFromDealerDate(e);
        setIsSubmitting(false);
      }, 2000)
    }else if(dateType == 'Delivered'){
      setIsSubmitting(true);
      setTimeout(() => {
        updateDeliveredDate(e);
        setIsSubmitting(false);
      }, 2000)
    }
  }

  const getRowClassName = (params) => {
    const isResolved = params.row.isResolved;
    if (!isResolved) {
      return 'battery-not-resolved';
    }
    return ''; 
  };

  const columnVisibility = {
    isResolved: false,
  };
  
  const styleForInputFields = {
    '& .MuiInputLabel-root': {
      color: '#00101f !important',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#00101f !important',
      },
      '&:hover fieldset': {
        borderColor: '#00101f !important',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00101f !important',
      },
      '& .MuiInputBase-input': {
        color: '#00101f !important',
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: '#00101f !important',
      },
    },
    label: {
        fontSize: '1rem',
      }
  };

  const styleButton = {
    color: 'white !important',
    backgroundColor: '#0369a1',
    fontWeight: 700,
    '&:hover': {
      backgroundColor: '#075985',
    },
    '&:focus': {
      ring: '4px',
      ringColor: '#bae6fd',
    },
    '&.dark-mode:focus': {
      ringColor: '#bae6fd',
    },
  }

  return (
    <Box m="8px">
      {!isLoading && 
      <Box my="20px" className='flex justify-between'>
        <Typography
          variant="h3"
          color='#e0e0e0'
          fontWeight="bold"
          sx={{ m: "0 0 5px 8px" }}
        >
        Replacements for <span className='italic text-green-300'>{replacedBatteryData.serialNumber}</span>
        </Typography>
        <Box
          width="content"
          m="0 10px"
          backgroundColor= "#0B666A"
          borderRadius="4px"
          className='flex items-center px-4'
          sx={{
            '&:hover': {
              backgroundColor: '#2D4356',
              opacity: [0.9, 0.8, 0.7],
              cursor: "pointer"
            },
          }}
          onClick = {handleNewReplacement}
        > 
        <div className='font-extrabold'>
          New Replacement
        </div>
        </Box>
      </Box>}
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
        {!isLoading && 
        <DataGrid
          sx={{                                   
            "& .MuiDataGrid-columnHeaderTitle": {
              whiteSpace: "normal",
              lineHeight: "normal"
            },
            "& .MuiDataGrid-columnHeader": {
              height: "unset !important"
            },
            "& .MuiDataGrid-columnHeaders": {
              maxHeight: "168px !important"
            }
          }}
          disableColumnMenu
          rows={ replacedBatteryData.replacement }
          columns={ replacementColumns }
          getRowId={ (row) => row.serialNumber }
          getRowClassName={ getRowClassName }
          columnVisibilityModel={columnVisibility}
          sortModel={[
            {
              field: 'isResolved',
              sort: 'asc',
            },
          ]}

        />
        }
        </Box>
        {isNewForm && (
          <div className="fixed inset-0 flex justify-center items-center shadow-xl z-10">
            <div className="bg-[#A3C7D6] rounded-lg w-96">
              <div className="flex justify-between items-center p-2">
                <div className='font-bold text-lg text-[#001a33]'>
                  New Replacement
                </div>
                <CloseIcon
                  style={{ color: 'black', cursor: 'pointer', width: '25px', height: '25px' }}
                  onClick={handleNewReplacementClose}
                  className="rounded"
                />
              </div>
              <form onSubmit={newReplacemntSubmit} className="p-4">
                  <div className="w-full">
                    <TextField
                      className="w-full"
                      required
                      id="outlined-required"
                      label="New Serial No."
                      onChange={(e) =>{ 
                        const value = e.target.value.toUpperCase();
                        setNewSerialNumber(value)}}
                      value={newSerialNumber}
                      type="text"
                      sx={styleForInputFields}
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

         {(isLoading || isSubmitting) && (
            <div className='fixed top-0 left-0 h-full w-full bg-[#00000080] z-20'>
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <img src={LoadingIcon} alt="Loading..." />
              </div>
            </div>
          )}
      </Box>
  )
}

export default BatteryReplacement
