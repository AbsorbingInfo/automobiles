import React, { useEffect, useState }  from 'react'
import { useNavigate } from 'react-router-dom';
import { TextField, Box, InputLabel, Select, MenuItem, FormControl, Button } from '@mui/material';
import LoadingIcon from '../assets/loading.svg';
import { useLocation } from 'react-router-dom';
import { styleForInputFields, styleButton, styleSelect, styleMenuItem, menuProps } from '../utils/muiStyles'

const BookService = () => {
  const urlLocation = useLocation();
  const searchParams = new URLSearchParams(urlLocation.search);
  const bikeCategory = searchParams.get('category');
  const [isCategoryAvailable, setIsCategoryAvailable] = useState(false);
  const [modelOptions, setModelOptions] = useState([]);
  const [name,setName] = useState('');
  const [category, setCategory] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [email,setEmail] = useState('');
  const [roomNo,setRoomNo] = useState('');
  const [buildingName,setBuildingName] = useState('');
  const [location,setLocation] = useState('');
  const [make,setMake] = useState('');
  const [model,setModel] = useState('');
  const [registeredNo,setRegisteredNo] = useState('');
  const [dob,setDob] = useState('');
  const [otherModel,setOtherModel] = useState('');
  const [issue,setIssue] = useState('');
  const [registeredNumberError,setRegisteredNumberError] = useState(false);
  const [error, setError] = useState(null);
  const [isAutoFilled, setIsAutoFilled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    if(bikeCategory !== null){
      setIsCategoryAvailable(true)
      setCategory(bikeCategory)
    }
  },[])

  const handleMakeChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === 'Aprilia') {
        setModelOptions(['SR 125', 'SR 160', 'Storm 125', 'SXR 125', 'SXR 160']);
    } else if (selectedValue === 'Bajaj') {
        setModelOptions(['Avenger (2015)', 'Avenger Cruise 220', 'Avenger Street 150 (2018)', 'Avenger Street 160', 'Avenger Street 180', 'Avenger Street 220', 'Boxer', 'CT 100', 'Discover 100', 'Discover 100 M', 'Discover 100 T', 'Discover 110', 'Discover 125', 'Discover 125 M', 'Discover 125 ST', 'Discover 125 T', 'Discover 135', 'Dominor 400', 'Platina 100', 'Platina 110', 'Pulsar 125', 'Pulsar 150', 'Pulsar 180', 'Pulsar 220F', 'Pulsar AS 150', 'Pulsar AS 200', 'Pulsar F250', 'Pulsar NS 125', 'Pulsar NS 160', 'Pulsar NS 200', 'Pulsar RS 200','V12','V15','XCD']);
    } else if (selectedValue === 'Hero') {
        setModelOptions(['Achiever Alloy', 'Ambition CBZ', 'CBZ (Old Model)', 'CBZ Extreme','CBZ Extreme Sports','Cruz','Destini 125','Duet','Glamour','Glamour 125','Glamour Fi','Glamour Xtec','HF Dawn','HF Deluxe','Hunk','Ignitor 125','Impulse 150','Karizma ZMR 223','Karizma ZMR ES','Maestro','Maestro Edge','Passion','Passion Plus','Passion Pro','Passion Pro i3s','Passion Pro TR','Passion XPro','Passion Xtec','Pleasure','Pleasure Plus','Pleasure Plus Xtec','Splendor (Old Model)','Splendor iSmart 110','Splendor NGX','Splendor Plus','Splendor Plus Xtec','Splendor Pro Classic','Super Splendor','Super Splendor 2018','Super Splendor Xtec','Winner Scooty','Xpulse 200','Xpulse 200T','Xtreme','Xtreme (2014 Model)','Xtreme 160R','Xtreme 200 R','Xtreme 200 Sports','Xtreme 2005','Xtreme Sports']);
    } else if (selectedValue === 'Honda'){
        setModelOptions(['Activa (2000-2015)','Activa 3G','Activa 4G','Activa 5G','Activa 6G','Activa I (2016-2017)','Aviator','Aviator (2016-2017)','CB 300F','CB 300R','CB 300R (2018-2019)','CB Hornet 160 R','CB Shine','CB Shine SP','CB Trigger','CB Twister','CB Unicorn','CB Unicorn 150','CB Unicorn 160','CB Unicirn Dazzier','CBF Stunner','CBR 150R','CBR 250R','CD 110','CD 110 Dream','Clik','Dio','Dream Neo','Dream Yugo','Eterno','Grazia','Hness 350','Livo 110','Navi','Navi (2016-2017)','SP 125','Unicorn','X Blade']);
    }else if (selectedValue === 'KTM'){
        setModelOptions(['125 Duke','200 Dike','250 Adventure','250 Duke','390 Adventure','390 Adventure X','390 Duke','RC 125','RC 200','RC 390'])
    }else if (selectedValue === 'Mahindra'){
        setModelOptions(['Centuro','Centuro Mirzya','Duro','Flyte 125','Gusto','Gusto 125','Mojo 300','Mojo UT 300','Mojo XT 300','Pantero','Rodeo'])
    }else if (selectedValue === 'Piaggio'){
        setModelOptions(['Vespa','Vespa Elegante 125','Vespa Elegante 150','Vespa Natte','Vespa SXL 125','Vespa SXL 150','Vespa Urban Club','Vespa VXL 125','Vespa VXL 150','Vespa ZX 125'])
    }else if (selectedValue === 'Royal Enfield'){
        setModelOptions(['Bullet 350','Bullet 500','Bullet Trail 350','Bullet Trails 500','Classic 350','Classic 500','Continental GT','Continental GT (2013-2018)','Electro','Himalayan Std','Interceptor 650','Thunderbird 350','Thunderbird 350 Twinspark','Thunder 350X','Thunderbird 500','Thunderbird 500X'])
    }else if (selectedValue === 'Suzuki'){
        setModelOptions(['Access 125','Access 125 (2007-2016)','Burgman Street','Gixxer','Gixer (2014-2018)','Gixer 150 SF (2015-2018)','Gixer 250','Gixer SF 250','Gixer SF Fi','GS150R','Hayote (2013-2016)','Hayote EP','Heat','Intruder 150','Intruder 150Fi','Lets 110','Slingshot','Slingshot Plus','Swish (2012-2015)','Swish 125','Zeus'])
    }else if (selectedValue === 'TVS'){
        setModelOptions(['Apache 165RP','Apache RR310','Apache RTR 160','Apache RTR 160 4V','Apache RTR 180 (2018-2019)','Apache RTR 180 (2019)','Apache RTR 200 4V','Centra','Fiera','Flame','Jive','Jupiter','Jupiter 125','Jupiter Grande','Max','Max 4R','Max DLX','NTorq 125','Ntorq 125 std','Phoenix','Scooty ES','Scooty Pep Dix','Scooty Pep Plus','Scooty Streak','Scooty Zest 110','Star City','Star City Plus','Star Deluxe','Victor','Victor (2012)','Victor Edge','Victor GLX','Victor GX','Wego','XL 100','XL 100 Comfort','XL 100 Heavy Duty'])
    }else if (selectedValue === 'Yamaha'){
        setModelOptions(['Aerox 155','Alpha','Cygnus Ray ZR','Enticer','Fascino','Fazer (2009-2016)','Fazer (2016-2018)','Fazer 25','Fazer Dlx','FZ 16','FZ 25','FZ FI','FZ FI v4','FZ S (2012-2016)','FZ S FI','FZ SV 2.0','FZ V 2.0','FZ X','MT 15 (2020-2021)','MT 15 v2.0','Ray','Ray Z','Ray ZR','Ray ZR 125','Saluto','Saluto RX','SS 125','SZ','SZ R','SZ RR V2.0','SZ S','SZ X','YBR 110','YBR 125','YBX','YZF R15 (2011-2018)','YZF R15 S (2016)','YZF R15 V3','YZF R15 V4'])
    }else if (selectedValue === 'Jawa'){
        setModelOptions(['42','Bobber','Perak','Standard'])
    }else{
        setModelOptions([])
    }
    setMake(event.target.value);
    // Reset the value of the second dropdown
    //setModelValue('');
  };

  const createCustomer = async () => {
    try{
        let modelSubmit = model
        if(make==='other' || model==='other'){
          modelSubmit = otherModel
        }
        const createCustomer = {name, phoneNumber, email, roomNo, buildingName, location, make, modelSubmit, registeredNo, category, dob}
        const responseCustomer = await fetch('http://localhost:4000/customer', {
        method: 'POST',
        body: JSON.stringify(createCustomer),
        headers: {
            'Content-Type': 'application/json'
        }
        })
        const jsonCustomer = await responseCustomer.json()
        if (!responseCustomer.ok) {
        setError("Internal Server Error!")
        }
        if (responseCustomer.ok) {
         setError(null)
         setName('')
         setPhoneNumber('')
         setRoomNo('')
         setBuildingName('')
         setLocation('')
         setMake('')
         setModel('')
         setOtherModel('')
         postService(jsonCustomer.customer._id);
        }
    }catch(error){
        setError('Error connecting to the server. Please try again later.');
        console.log('Error:', error);
    }
  };

  const postService = async (customerId) => {
    try{
        const bookService = {customerId, issue}
        const response = await fetch('http://localhost:4000/service', {
        method: 'POST',
        body: JSON.stringify(bookService),
        headers: {
            'Content-Type': 'application/json'
        }
        });
        const json = await response.json()
        if (!response.ok) {
        setError(json.error)
        }
        if (response.ok) {
        setError(null)
        setIssue('')
        navigateTo('/servicebooked');
        }
    }catch(error){
        setError('Error connecting to the server. Please try again later.');
    }
  };

  const checkExistingCustomerByRegdNo = async (regdNo) => {
    try{
      const response = await fetch(`http://localhost:4000/customer/registerednumber/${regdNo}`)
      const json = await response.json()
      if (response.ok) {
        if(json.length == 1){
          setEmail(json[0].email)
          handleMakeChange({ target: { value: json[0].make } })
          setModel(json[0].model)
          setRoomNo(json[0].roomNo)
          setBuildingName(json[0].buildingName)
          setName(json[0].name)
          setPhoneNumber(`${json[0].phoneNumber}`)
          setCategory(json[0].category)
          setLocation(json[0].location)
          if(json[0].otherModel){
            setOtherModel(json[0].otherModel)
          }
          if(json[0].dob){
            setDob(dob)
          }
          setIsAutoFilled(true)
        }
      }
    }catch(error){
      setError(error)
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
      setPhoneNumber(phoneNumber.slice(0, 10));
    }
  }

  const formatRegistrationNumber = (input) => {
    const stringWithSpaces = input.slice(0, 2) + ' ' + input.slice(2, 4) + ' '+ input.slice(4);
    const finalString = stringWithSpaces.slice(0, -4) + ' ' + stringWithSpaces.slice(-4);
    return finalString;
  }

  const handleRegistrationNumberChange = (e) => {
    const input = e.target.value.replace(/\s/g, '');
    const formattedInput = formatRegistrationNumber(input);
    setRegisteredNo(formattedInput.toUpperCase());

    if(registeredNo.length >= 11 && !isAutoFilled){
      checkExistingCustomerByRegdNo(formattedInput.toUpperCase())
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (phoneNumber.length != 10) {
      setError('Please enter a 10-digit phone number');
      return;
    }
    const regexFormat = /^[A-Z]{2}\s\d{2}\s[A-Z]{2}\s\d{4}$/;
    if (!regexFormat.test(registeredNo)) {
      setRegisteredNumberError(true)
      setError('Invalid format for the registered number. Please use the format MH04AB1234');
      return;
    }
    setError("");
    setIsLoading(true)
    setTimeout(() => {
      createCustomer();
      setIsLoading(false); 
    }, 2000);
  }

  return (
    <div>
        <section className=" bg-[#001a33]">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16 bg-[#001529] rounded-lg shadow-2xl">
                <h2 className="mb-4 text-xl font-bold border-b text-white">Book a service</h2>
                <div className="flex justify-end items-end w-max">
                  <h1 className="text-lg font-bold typewriter-effect text-[#98EECC]"><span className='tracking-tight'>Free pick and drop service available now.</span></h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 grid-cols-2 mt-4">
                        <Box 
                        className="w-full"                      
                        >
                          <TextField
                          required
                          className="w-full"
                          id="outlined-required"
                          label="Regd Vehicle No"
                          onChange={handleRegistrationNumberChange}
                          value={registeredNo}
                          type='text'
                          placeholder='MH04AB1234'
                          error={registeredNumberError}
                          inputProps={{ 
                            maxLength: 13
                          }}
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
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            className="w-full"
                            required
                            id="outlined-required"
                            label="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type='email'
                            placeholder='abc@example.com'
                            sx={styleForInputFields}
                            inputProps={{ 
                                maxLength: 35,
                            }}
                            />
                        </Box>
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            label="Date of birth"
                            className="w-full"
                            id="date"
                            type='date'
                            onChange={(e) => setDob(e.target.value)}
                            value={dob}  
                            sx={styleForInputFields}
                            helperText="For Excusive offers just for you"
                            InputLabelProps={{
                                shrink: true,
                              }}
                            />
                        </Box>
                        <Box className="w-full">
                            <FormControl required fullWidth sx={styleForInputFields}>
                                <InputLabel id="make-label">Make</InputLabel>
                                <Select
                                labelId="make-label"
                                label="Make"
                                value={make}
                                onChange={handleMakeChange}
                                sx={styleSelect}
                                MenuProps={menuProps}
                                >
                                    <MenuItem sx={styleMenuItem} value="Aprilia">Aprilia</MenuItem>
                                    <MenuItem sx={styleMenuItem} value="Bajaj">Bajaj</MenuItem>
                                    <MenuItem sx={styleMenuItem} value="Hero">Hero</MenuItem>
                                    <MenuItem sx={styleMenuItem} value="Honda">Honda</MenuItem>
                                    <MenuItem sx={styleMenuItem} value="KTM">KTM</MenuItem>
                                    <MenuItem sx={styleMenuItem} value="Mahindra">Mahindra</MenuItem>
                                    <MenuItem sx={styleMenuItem} value="Piaggio">Piaggio</MenuItem>
                                    <MenuItem sx={styleMenuItem} value="Royal Enfield">Royal Enfield</MenuItem>
                                    <MenuItem sx={styleMenuItem} value="Suzuki">Suzuki</MenuItem>
                                    <MenuItem sx={styleMenuItem} value="TVS">TVS</MenuItem>
                                    <MenuItem sx={styleMenuItem} value="Yamaha">Yamaha</MenuItem>
                                    <MenuItem sx={styleMenuItem} value="Jawa">Jawa</MenuItem>
                                    <MenuItem sx={styleMenuItem} value="other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        {make !== 'other' ? 
                        <Box className="w-full">
                            <FormControl required fullWidth sx={styleForInputFields}>
                                <InputLabel id="model-label">Model</InputLabel>
                                <Select
                                labelId="model-label"
                                label="Model"
                                required
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                sx={styleSelect}
                                MenuProps={menuProps}
                                >
                                    {modelOptions.map((menuItem) => (
                                        <MenuItem sx={styleMenuItem} key={menuItem} value={menuItem}>
                                            {menuItem}
                                        </MenuItem>
                                        ))}
                                    <MenuItem sx={styleMenuItem} value="other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Box> : ""}
                        {make === 'other' || model === 'other' ? 
                        <Box className="w-full">
                          <TextField
                          required
                          className="w-full"
                          id="outlined-required"
                          label="Other Model"
                          onChange={(e) => setOtherModel(e.target.value)}
                          value={otherModel}
                          type='text'
                          sx={styleForInputFields}
                          inputProps={{ 
                              maxLength: 20,
                          }}
                          />
                        </Box> : ""}
                        {!isCategoryAvailable && 
                        <Box className="w-full">
                        <FormControl required fullWidth sx={styleForInputFields}>
                            <InputLabel >Category</InputLabel>
                            <Select
                            label="Category"
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
                          }
                        <Box className="w-full">
                            <FormControl required fullWidth sx={styleForInputFields}>
                                <InputLabel id="location-label">Location</InputLabel>
                                <Select
                                labelId="location-label"
                                label="Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                sx={styleSelect}
                                MenuProps={menuProps}
                                >
                                    <MenuItem sx={styleMenuItem} value="Casa Bella">Casa Bella</MenuItem>
                                    <MenuItem sx={styleMenuItem} value="Casa Rio">Casa Rio</MenuItem>
                                    <MenuItem sx={styleMenuItem} value="Lodha Heaven">Lodha Heaven</MenuItem>
        
                                </Select>
                            </FormControl>
                        </Box>
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            required
                            className="w-full"
                            id="outlined-required"
                            label="Room No.& Wing"
                            onChange={(e) => setRoomNo(e.target.value)}
                            value={roomNo}
                            type='text'
                            placeholder='B-202'
                            sx={styleForInputFields}
                            inputProps={{ 
                                maxLength: 8,
                            }}
                            />
                        </Box>
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            required
                            className="w-full"
                            id="outlined-required"
                            label="Building Name"
                            onChange={(e) => setBuildingName(e.target.value)}
                            value={buildingName}
                            type='text'
                            placeholder='CHS Regency'
                            sx={styleForInputFields}
                            inputProps={{ 
                                maxLength: 40,
                            }}
                            />
                        </Box>
                        <Box 
                        className="col-span-2"                      
                        >
                            <TextField
                            className="w-full"
                            id="outlined-multiline"
                            label="Issue"
                            required
                            multiline
                            onChange={(e) => setIssue(e.target.value)}
                            value={issue}
                            placeholder='General Service, Brake Shoe, Clutch, Engine, etc'
                            sx={styleForInputFields}
                            inputProps={{ 
                                maxLength: 80,
                            }}
                            />
                        </Box>
                    </div>
                    <Box className="py-3 my-3 flex justify-end">
                        <Button variant="contained" type="submit" sx={styleButton} >
                            Book Service
                        </Button>  
                    </Box>  
                        {error && <div className="p-2.5 my-2 border-solid rounded-2xl border-2 border-red-500 text-red-700">{error}</div>}             
                </form>
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

export default BookService