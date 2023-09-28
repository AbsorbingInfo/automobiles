import React, { useEffect, useState }  from 'react'
import { useAuthContext } from "../../../utils/hooks/useAuthContext"
import { TextField, Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LoadingIcon from '../../../assets/loading.svg';
import { styleForInputFields, styleButton } from '../../../utils/muiStyles'
import * as XLSX from 'xlsx';

const index = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [rowCount, setRowCount] = useState(0);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false)
    const [formEvent, setFormEvent] = useState(false)
    const { user } = useAuthContext();

    const sendMessages = async(e) => {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('OfferImage', e.target.elements.OfferImage.files[0]);
        formData.append('Excel', e.target.elements.Excel.files[0]);

        const response = await fetch('http://localhost:4000/adcampaign', {
            method: 'POST',
            body: formData,
            headers: {'Authorization': `Bearer ${user.token}`}
        });
        if (!response.ok) {
            setIsLoading(false)
            setError("Failed to send Messages!", response.message)
        }
        if (response.ok) {
            setIsLoading(false)
            alert("Messages Sent!")
            e.target.reset();
        }
    }
        
    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormEvent(e);
        setIsPopUpOpen(true)
        const file = e.target.elements.Excel.files[0];

        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
    
            // Assuming the first sheet is the one you want to count rows in
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
    
            // Get the range of the worksheet
            const range = XLSX.utils.decode_range(worksheet['!ref']);
            
            // Count the rows
            const rows = range.e.r - range.s.r + 1;
            setRowCount(rows)
          };
          reader.readAsArrayBuffer(file);
        }
    }

    const handleConfirm = () => {
        if(user){
            try{
                sendMessages(formEvent);
            }catch(error){
                setError('Error:',error);
            }
        }
        setIsPopUpOpen(false)
    }

  return (
    <div className='h-[75vh]'>
        <section className={"#e0e0e0" }>
            <div className="pb-8 px-4 pt-3 mx-auto max-w-2xl h-[80vh] lg:pb-16">
                <h2 className="mb-4 text-xl font-bold border-b text-white">Ad Campaign</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6">
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            required
                            className="w-full"
                            label="Offer Image"
                            id="OfferImage"
                            type='file'
                            sx={styleForInputFields}
                            max="20242880"
                            inputProps={{
                                accept:"image/png, image/jpeg"
                            }}
                            InputLabelProps={{
                                shrink: true,
                              }}
                            />
                        </Box>
                        <Box
                        className="w-full"                      
                        >
                            <TextField
                            required
                            className="w-full"
                            label="Excel File"
                            id="Excel"
                            type='file'
                            sx={styleForInputFields}
                            max="20242880"
                            inputProps={{
                                accept:".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            }}
                            InputLabelProps={{
                                shrink: true,
                              }}
                            />
                        </Box>
                        <div className='col-span-2 text-lg text-[#ffc107]'>
                            Note: For Excel, only two columns are allowed. Columns in order <span className='text-[#FFF5E0] font-bold'>[ name, phone number ]</span>
                        </div>
                    </div>
                    <Box className="py-3 my-3 flex justify-end">
                        <Button variant="contained" type="submit" sx={styleButton} >
                            Submit
                        </Button>  
                    </Box>
                    {isPopUpOpen && (
                        <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50">
                        <div className="bg-[#BAF4DD] p-6 rounded w-full sm:w-96">
                            <div className='flex justify-end'>
                                <span className=' bg-[#3F6D67] p-1 rounded-lg w-fit'>
                                    <CloseIcon 
                                    style={{ color: 'white', cursor: 'pointer', fontSize: '28px' }}
                                    onClick={() => setIsPopUpOpen(false)}
                                    />
                                </span>
                            </div>
                            <div className="text-black text-lg font-bold">
                                Approximate Charges <span className='text-2xl text-green-500'>₹{((rowCount-1) * 0.7265).toFixed(2)}</span>
                            </div>
                            <div className='flex justify-center mt-5'>
                            <Button className='items-end justify-end' variant="contained" onClick={handleConfirm} sx={styleButton} >
                                Confirm
                            </Button>
                            </div>
                        </div>
                        </div>)}      
                </form>
                    { error  && <div className="p-2.5 my-2 border-solid rounded-2xl border-2 border-red-500 text-lg text-red-300" >
                      {error}
                    </div>}
                    {isLoading  && (
                        <div className='fixed top-0 left-0 h-full w-full bg-[#00000080] z-20'>
                        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                            <img src={LoadingIcon} alt="Loading..." />
                        </div>
                        </div>
                    )}
            </div>
            
          </section>
    </div>
  )
}

export default index