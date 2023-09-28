import React, { useState }  from 'react'
import { useAuthContext } from "../../../utils/hooks/useAuthContext"
import { TextField, Box, InputLabel, Select, MenuItem, FormControl, Button } from '@mui/material';
import { styleForInputFields, styleButton, styleSelect, styleMenuItem, menuProps} from '../../../utils/muiStyles'

const index = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [registeredNumberError,setRegisteredNumberError] = useState(false);
    const [registeredNo, setRegisteredNo] = useState('');
    const [brand, setBrand] = useState('');
    const [otherBrand, setOtherBrand] = useState('');
    const [model, setModel] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [mrp, setMrp] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [originalBattery, setOriginalBattery] = useState('');
    const [purchaseType, setPurchaseType] = useState('New');
    const [dateOfSale, setDateOfSale] = useState('');
    const [error, setError] = useState(null);
    const [isNewCustomer, setIsNewCustomer] = useState(true);
    const [category, setCategory] = useState("");
    const { user } = useAuthContext();

    const createBattery = async(e) =>{
        try{
            let brandSubmit = brand;
            if(brand==='Other'){
                brandSubmit=otherBrand
            }
            let proRata = 'New';
            if(purchaseType !== 'New'){
                proRata = originalBattery
            }
            const createBatteryData = {registeredNo, brandSubmit, model, serialNumber, mrp, sellingPrice, dateOfSale, proRata}
            const response = await fetch('http://localhost:4000/battery', {
                method: 'POST',
                body: JSON.stringify(createBatteryData),
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                const json = await response.json();
                setError(json.error.message) 
            } 
            if (response.ok) {
                alert("Battery Record Submitted")
                setBrand('');
                setModel('');
                setSerialNumber('');
                setMrp('');
                setSellingPrice('');
                setDateOfSale('');
                setOtherBrand('');
                e.target.reset();
            }
        }catch(error){
            console.log(error)
        }
    }

    const createCustomer = async () => {
        try{
            const createCustomer = {name, phoneNumber, registeredNo, category}
            const responseCustomer = await fetch('http://localhost:4000/customer', {
            method: 'POST',
            body: JSON.stringify(createCustomer),
            headers: {
                'Content-Type': 'application/json'
            }
            })
            const jsonCustomer = await responseCustomer.json()
            if (!responseCustomer.ok) {
            setError(jsonCustomer.error)
            }
            if (responseCustomer.ok) {
            setError(null)
            setName('')
            setPhoneNumber('')
            setRegisteredNo('')
            }
        }catch(error){
            setError('Error connecting to the server. Please try again later.');
            console.log('Error:', error);
        }
      };

    const checkExistingCustomerByRegdNo = async (regdNo) => {
        try{
          const response = await fetch(`http://localhost:4000/customer/registerednumber/${regdNo}`)
          const json = await response.json()
          if (response.ok) {
            if(json.length == 1){
                setIsNewCustomer(false)
                if(json[0].name){
                    setName(json[0].name)
                }
                if(json[0].phoneNumber){
                    phoneNumberChange({ target: { value: json[0].phoneNumber } })
                }
                if(json[0].category){
                    setCategory(json[0].category)
                }
                
            }
          }
        }catch(error){
            console.log(error)
        }
    }


    const capitalizeWords = (input) => {
        const words = input.split(' ');
      
        const capitalizedWords = words.map(word => {
          if (word.length > 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          } else {
            return '';
          }
        });
    
        return capitalizedWords.join(' ');
    }

    const phoneNumberChange = (e) => {
        const phoneNumber = e.target.value;
        if (/^\d{0,10}$/.test(phoneNumber)) {
          setPhoneNumber(phoneNumber);
        }
    }

    const formatRegistrationNumber = (input) => {
        const regexSpaces = /(\w{2})(\w{2})(\w{2})(\w{4})/;
        return input.replace(regexSpaces, '$1 $2 $3 $4');
    };
    
    const handleRegistrationNumberChange = (e) => {
        const input = e.target.value.replace(/\s/g, ''); 
        const formattedInput = formatRegistrationNumber(input.toUpperCase());
        setRegisteredNo(formattedInput);
        if(formattedInput.length == 13){
            checkExistingCustomerByRegdNo(formattedInput)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const phoneNumberString = phoneNumber.toString();
        if (phoneNumberString.length != 10) {
            setError('Please enter a 10-digit phone number');
            return;
        }
        const regexFormat = /^[A-Z]{2}\s\d{2}\s[A-Z]{2}\s\d{4}$/;
        if (!regexFormat.test(registeredNo)) {
            setRegisteredNumberError(true)
            setError('Invalid format for the registered number. Please use the format MH04AB1234');
            return;
        }
        if(user){
            try{
                if(isNewCustomer){
                    createCustomer(e)
                    createBattery(e)
                }else{
                    createBattery(e);
                }
            }catch(error){
                setError('Error connecting to the server. Please try again later.');
            }
        }
    }

  return (
    <div className='h-[75vh]'>
        <section className={"#e0e0e0" }>
            <div className="pb-8 px-4 pt-3 mx-auto max-w-2xl h-[80vh] lg:pb-16">
                <h2 className="mb-4 text-xl font-bold border-b text-white">Add Battery</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 grid-cols-2"> 
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            required
                            className="w-full"
                            id="outlined-required"
                            label="Registered Number"
                            onChange={handleRegistrationNumberChange}
                            value={registeredNo}
                            type='text'
                            placeholder='MH 04 AB 1234'
                            error={registeredNumberError}
                            inputProps={{
                                maxLength: 13,
                            }}
                            sx={styleForInputFields}
                            />
                        </Box>       
                        <Box 
                        className="w-full"               
                        >
                            <TextField
                            required
                            className="w-full"
                            id="outlined-required"
                            label="Name"
                            onChange={(e) => setName(capitalizeWords(e.target.value))}
                            value={name}
                            sx={styleForInputFields}
                            type='text'
                            inputProps={{ 
                                maxLength: 25,
                            }}
                            />
                        </Box>
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            className="w-full"
                            required
                            id="outlined-required"
                            label="Phone Number"
                            onChange={phoneNumberChange}
                            value={phoneNumber}
                            type='text'
                            inputMode='numeric'
                            maxLength={10}
                            placeholder='10 Digits phone number'
                            sx={styleForInputFields}
                            />
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
                        <Box className="w-full">
                            <FormControl required fullWidth sx={styleForInputFields}>
                                <InputLabel id="brand-label">Brand</InputLabel>
                                <Select
                                labelId="brand-label"
                                label="Brand"
                                value={brand}
                                sx={styleSelect}
                                onChange={(e) => setBrand(e.target.value)}
                                MenuProps={menuProps}
                                >
                                    <MenuItem sx={styleMenuItem} value="Amaron">Amaron</MenuItem>
                                    <MenuItem sx={styleMenuItem} value="Exide">Exide</MenuItem>
                                    <MenuItem sx={styleMenuItem} value="Tata">Tata</MenuItem>
                                    <MenuItem sx={styleMenuItem} value="SF Sonic">SF Sonic</MenuItem>
                                    <MenuItem sx={styleMenuItem} value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        {brand=='Other' ? 
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            className="w-full"
                            required
                            id="outlined-required"
                            label="Other Brand"
                            onChange={(e) => setOtherBrand(capitalizeWords(e.target.value))}
                            value={otherBrand}
                            type='text'
                            sx={styleForInputFields}
                            />
                        </Box> : ""}               
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            className="w-full"
                            required
                            id="outlined-required"
                            label="Model"
                            onChange={(e) => {
                                const value = e.target.value.toUpperCase();
                                setModel(value)
                            }}
                            value={model}
                            type='text'
                            sx={styleForInputFields}
                            />
                        </Box>
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            className="w-full"
                            required
                            id="outlined-required"
                            label="Serial Number"
                            onChange={(e) =>{ 
                                const value = e.target.value.toUpperCase();
                                setSerialNumber(value)
                            }}
                            value={serialNumber}
                            type='text'
                            sx={styleForInputFields}
                            />
                        </Box>
                        <Box className="w-full">
                            <FormControl required fullWidth sx={styleForInputFields}>
                                <InputLabel id="prorata-label">Purchase Type</InputLabel>
                                <Select
                                labelId="prorata-label"
                                label="Purchase Type"
                                value={purchaseType}
                                onChange={(e) => setPurchaseType(e.target.value)}
                                sx={styleSelect}
                                MenuProps={menuProps}
                                >
                                    <MenuItem sx={styleMenuItem} value="New">New</MenuItem>
                                    <MenuItem sx={styleMenuItem} value="Pro Rata">Pro Rata</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        {purchaseType =='Pro Rata' ? 
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            className="w-full"
                            required
                            id="outlined-required"
                            label="Original Battery"
                            onChange={(e) => {
                                const value = e.target.value.toUpperCase();
                                setOriginalBattery(value)
                            }}
                            value={originalBattery}
                            type='text'
                            sx={styleForInputFields}
                            />
                        </Box> : ""}   
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            className="w-full"
                            required
                            id="outlined-required"
                            label="MRP"
                            onChange={(e) => {
                                const input = e.target.value;
                                const numericInput = input.replace(/[^0-9.]/g, '');
                                setMrp(numericInput);
                            }}
                            value={mrp}
                            type='text'
                            inputMode='numeric'
                            sx={styleForInputFields}
                            />
                        </Box>
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            className="w-full"
                            required
                            id="outlined-required"
                            label="Selling Price"
                            onChange={(e) => {
                                const input = e.target.value;
                                const numericInput = input.replace(/[^0-9.]/g, '');
                                setSellingPrice(numericInput);
                            }}
                            value={sellingPrice}
                            type='text'
                            inputMode='numeric'
                            sx={styleForInputFields}
                            />
                        </Box>
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            required
                            label="Date of Sale"
                            className="w-full"
                            id="date"
                            type='date'
                            onChange={(e) => setDateOfSale(e.target.value)}
                            value={dateOfSale}  
                            sx={styleForInputFields}
                            InputLabelProps={{
                                shrink: true,
                              }}
                            />
                        </Box>                  
                    </div>
                    <Box className="py-3 my-3 flex justify-end">
                        <Button variant="contained" type="submit" sx={styleButton} >
                            Submit
                        </Button> 
                    </Box>  
                        {error && <div className="p-2.5 my-2 border-solid rounded-2xl border-2 border-red-500 text-red-700">{error}</div>}             
                </form>                
            </div>
          </section>
    </div>
  )
}

export default index