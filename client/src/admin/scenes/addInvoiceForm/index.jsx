import React, { useEffect, useState }  from 'react'
import { useAuthContext } from "../../../utils/hooks/useAuthContext"
import { TextField, Box, InputLabel, Select, MenuItem, FormControl, Button } from '@mui/material';
import LoadingIcon from '../../../assets/loading.svg';
import useFetchMechanics from "../services/fetchMechanics";
import { styleForInputFields, styleButton, styleSelect, styleMenuItem, menuProps} from '../../../utils/muiStyles'

const index = () => {
    const mechanicData = useFetchMechanics();
    const [phoneNumber,setPhoneNumber] = useState('');
    const [invoiceType,setInvoiceType] = useState('');
    const [mechanicName, setMechanicName] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [category, setCategory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();

    const createOffer = async(e) =>{
        //setIsLoading(true)
        if(phoneNumber.length < 10){
            setError("Please enter a 10 digit phone number");
            return;
        }
        const formData = new FormData();
        formData.append('invoice', e.target.elements.invoice.files[0]);
        formData.append('phoneNumber', phoneNumber);
        formData.append('invoiceType', invoiceType);
        formData.append('mechanicName', mechanicName);
        formData.append('category', category);

        const response = await fetch('http://localhost:4000/invoice', {
            method: 'POST',
            body: formData,
            headers: {'Authorization': `Bearer ${user.token}`}
        });

        if (!response.ok) {
            setIsLoading(false)
            const json = await response.json();
            setError(json[0])
            
        } 
        if (response.ok) {
            setIsLoading(false)
            alert("Invoice Submitted")
            setPhoneNumber('');
            setInvoiceType('');
            e.target.reset();
            const json = await response.json();
            //setError(json[0])
            //setSuccess(json[1])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(user){
            try{
                createOffer(e);
            }catch(error){
                setError('Error connecting to the server. Please try again later.');
            }
        }
    }

    const phoneNumberChange = (e) => {
        const phoneNumber = e.target.value
        if (/^\d{0,10}$/.test(phoneNumber)) {
          setPhoneNumber(phoneNumber)
        }
    }


  return (
    <div className='h-[75vh]'>
        <section className={"#e0e0e0" }>
            <div className="pb-8 px-4 pt-3 mx-auto max-w-2xl h-[80vh] lg:pb-16">
                <h2 className="mb-4 text-xl font-bold border-b text-white">Add Invoice</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6">
                        <Box className="w-full">
                            <FormControl required fullWidth sx={styleForInputFields}>
                                <InputLabel>Category</InputLabel>
                                <Select
                                required
                                label="Maritial Status"
                                value={invoiceType}
                                onChange={(e) => setInvoiceType(e.target.value)}
                                sx={styleSelect}
                                MenuProps={menuProps}
                                >
                                    <MenuItem sx={styleMenuItem} value="gst">Spare Parts</MenuItem>
                                    <MenuItem sx={styleMenuItem} value="mechanic">Mechanic</MenuItem>
                                    <MenuItem sx={styleMenuItem} value="noGst">Miscellaneous</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box className="w-full">
                            <FormControl required fullWidth sx={styleForInputFields}>
                                <InputLabel>Bike Category</InputLabel>
                                <Select
                                required
                                label="Bike Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                sx={styleSelect}
                                MenuProps={menuProps}
                                >
                                  <MenuItem sx={styleMenuItem} value="royalenfield">Royal Enfield</MenuItem>
                                  <MenuItem sx={styleMenuItem} value="regular">Regular Bike / Scooty</MenuItem>
                                  <MenuItem sx={styleMenuItem} value="sport">Sports Bike</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        {(invoiceType === "mechanic") && 
                        <Box className="w-full">
                            <FormControl required fullWidth sx={styleForInputFields}>
                                <InputLabel >Mechanic Name</InputLabel>
                                <Select
                                required
                                label="Maritial Status"
                                value={mechanicName}
                                onChange={(e) => setMechanicName(e.target.value)}
                                sx={styleSelect}
                                MenuProps={menuProps}
                                >
                                    {mechanicData.map((mechanic) => (
                                        <MenuItem sx={styleMenuItem} value={mechanic._id}>{mechanic.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        }
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            required
                            className="w-full"
                            label="Invoice"
                            id="invoice"
                            type='file'
                            sx={styleForInputFields}
                            max="20242880"
                            inputProps={{
                                accept:"application/pdf"
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
                            label="Phone Number"
                            onChange={phoneNumberChange}
                            value={phoneNumber}
                            type='text'
                            sx={styleForInputFields}
                            inputMode='numeric'
                            maxLength={10}
                            placeholder='10 digit'
                            />
                        </Box> 
                    </div>
                    <Box className="py-3 my-3 flex justify-end">
                        <Button variant="contained" type="submit" sx={styleButton} >
                            Submit
                        </Button>  
                    </Box>         
                </form>
                { error ? (error.length>0) && <div className="p-2.5 my-2 border-solid rounded-2xl border-2 border-red-500 text-lg text-red-300" >
                <ul>
                {error.map((item) =>  <li key={item}>{item}</li>)}
                </ul>
                </div> : ''}
                {success && <div className="p-2.5 my-2 border-solid rounded-2xl border-2 border-green-500 text-lg text-green-300">
                <ul>
                {success.map((item) =><li key={item}>{item}</li>)}
                </ul>
                </div>
                }
                {isLoading && (
                    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
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