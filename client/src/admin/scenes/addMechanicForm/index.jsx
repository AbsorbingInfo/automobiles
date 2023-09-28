import React, { useState }  from 'react'
import { useAuthContext } from "../../../utils/hooks/useAuthContext"
import { TextField, Box, InputLabel, Select, MenuItem, FormControl, Button } from '@mui/material';
import { styleForInputFields, styleButton, styleSelect, styleMenuItem, menuProps} from '../../../utils/muiStyles'


const index = () => {
    const [name,setName] = useState('');
    const [fathersName,setFathersName] = useState('');
    const [address,setAddress] = useState('');
    const [villageAddress,setVillageAddress] = useState('');
    const [phoneNo,setPhoneNo] = useState('');
    const [dob,setDob] = useState('');
    const [aadhaarNo, setAadhaarNo] = useState('');
    const [panNo,setPanNo] = useState('');
    const [maritialStatus,setMaritialStatus] = useState('');
    const [emergencyName,setEmergencyName] = useState('');
    const [emergencyRelaton,setEmergencyRelaton] = useState('');
    const [emergencyPhoneNo,setEmergencyPhoneNo] = useState('');
    const [qualification,setQualification] = useState('');
    const [yearOfQualification,setYearOfQualification] = useState('');
    const [experience,setExperience] = useState('');
    const [referenceName,setReferenceName] = useState('');
    const [referencePhoneNo, setReferencePhoneNo] = useState('');
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    const createMechanic = async(e) =>{
        const formData = new FormData();
        formData.append('image', e.target.elements.image.files[0]);
        formData.append('name', name);
        formData.append('fathersName', fathersName);
        formData.append('address', address);
        formData.append('villageAddress', villageAddress);
        formData.append('aadhaarNo', aadhaarNo);
        formData.append('phoneNo', phoneNo);
        formData.append('dob', dob);
        formData.append('maritialStatus', maritialStatus);
        formData.append('panNo', panNo);
        formData.append('emergencyName', emergencyName);
        formData.append('emergencyRelaton', emergencyRelaton);
        formData.append('emergencyPhoneNo', emergencyPhoneNo);
        formData.append('qualification', qualification);
        formData.append('yearOfQualification', yearOfQualification);
        formData.append('experience', experience);
        formData.append('referenceName', referenceName);
        formData.append('referencePhoneNo', referencePhoneNo);
        const response = await fetch('http://localhost:4000/mechanic/', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${user.token}`}
        });
        if (!response.ok) {
            const json = await response.json();
            setError(json.error)
        } 
        if (response.ok) {
            const json = await response.json();
            alert("Mechanic Added")
            setName('');
            setFathersName('');
            setAddress('');
            setVillageAddress('');
            setPhoneNo('');
            setDob('');
            setAadhaarNo('');
            setPanNo('');
            setMaritialStatus('');
            setEmergencyName('');
            setEmergencyRelaton('');
            setEmergencyPhoneNo('');
            setQualification('');
            setYearOfQualification('');
            setExperience('');
            setReferenceName('');
            setReferencePhoneNo('');
            e.target.reset();
            console.log('New Mechanic added:', json);
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
        const phoneNumber = e.target.value
        if (/^\d{0,10}$/.test(phoneNumber)) {
          setPhoneNo(phoneNumber)
        }
    }

    const emergencyPhoneNumberChange = (e) => {
        const phoneNumber = e.target.value
        if (/^\d{0,10}$/.test(phoneNumber)) {
          setEmergencyPhoneNo(phoneNumber)
        }
    }

    const referencePhoneNumberChange = (e) => {
        const phoneNumber = e.target.value
        if (/^\d{0,10}$/.test(phoneNumber)) {
          setReferencePhoneNo(phoneNumber)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(user){
            try{
                createMechanic(e);
            }catch(error){
                setError('Error connecting to the server. Please try again later.');
            }
        }
    }

  return (
        <section className={"#e0e0e0" }>
            <div className="pb-8 px-4 pt-3 mx-auto max-w-2xl lg:pb-16">
              <h2 className="mb-4 text-xl font-bold border-b text-white">Add Mechanic</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 grid-cols-2">
                    <h2 className="mb-4 text-lg font-medium border-b text-gray-200 col-span-2">Personal Information</h2>
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            required
                            className="w-full"
                            label="Name"
                            onChange={(e) => setName(capitalizeWords(e.target.value))}
                            value={name}
                            type='text'
                            sx={styleForInputFields}
                            />
                        </Box>
                        <Box
                        className="w-full"
                        >
                            <TextField
                            className="w-full"
                            label="Fathers Name"
                            onChange={(e) => setFathersName(capitalizeWords(e.target.value))}
                            value={fathersName}
                            sx={styleForInputFields}
                            type='text'
                            />
                        </Box>
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            className="w-full"
                            label="Address"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                            type='text'
                            maxLength={10}
                            sx={styleForInputFields}
                            />
                        </Box> 
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            className="w-full"
                            label="Village Address"
                            onChange={(e) => setVillageAddress(e.target.value)}
                            value={villageAddress}
                            type='text'
                            sx={styleForInputFields}
                            />
                        </Box> 
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            className="w-full"
                            label="Phone Number"
                            onChange={phoneNumberChange}
                            value={phoneNo}
                            type='text'
                            sx={styleForInputFields}
                            inputMode='numeric'
                            maxLength={10}
                            />
                        </Box> 
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            label="Date of Birth"
                            className="w-full"
                            type='date'
                            onChange={(e) => setDob(e.target.value)}
                            value={dob}  
                            sx={styleForInputFields}
                            InputLabelProps={{
                                shrink: true,
                              }}
                            />
                        </Box>
                        <Box className="w-full">
                            <FormControl fullWidth sx={styleForInputFields}>
                                <InputLabel id="brand-label">Maritial Status</InputLabel>
                                <Select
                                labelId="brand-label"
                                label="Maritial Status"
                                value={maritialStatus}
                                onChange={(e) => setMaritialStatus(e.target.value)}
                                sx={styleSelect}
                                MenuProps={menuProps}
                                >
                                    <MenuItem sx={styleMenuItem} value="Married">Married</MenuItem>
                                    <MenuItem sx={styleMenuItem} value="Single">Single</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            className="w-full"
                            label="Aadhaar Number"
                            onChange={(e) => setAadhaarNo(e.target.value)}
                            value={aadhaarNo}
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
                            label="Pan Number"
                            onChange={(e) => setPanNo(e.target.value.toUpperCase())}
                            value={panNo}
                            type='text'
                            sx={styleForInputFields}
                            />
                        </Box>
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            required
                            className="w-full"
                            label="Image"
                            id="image"
                            type='file'
                            sx={styleForInputFields}
                            accept= 'image/*'
                            max="5242880"
                            InputLabelProps={{
                                shrink: true,
                              }}
                            />
                        </Box>
                      <h2 className="mb-4 text-lg font-medium border-b text-gray-200 col-span-2">Emergency Contact</h2>
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            className="w-full"
                            label="Name"
                            onChange={(e) => setEmergencyName(capitalizeWords(e.target.value))}
                            value={emergencyName}
                            type='text'
                            sx={styleForInputFields}
                            />
                        </Box>
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            className="w-full"
                            label="Relation"
                            onChange={(e) => setEmergencyRelaton(capitalizeWords(e.target.value))}
                            value={emergencyRelaton}
                            type='text'
                            sx={styleForInputFields}
                            />
                        </Box>
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            className="w-full"
                            label="Phone Number"
                            onChange={emergencyPhoneNumberChange}
                            value={emergencyPhoneNo}
                            type='text'
                            sx={styleForInputFields}
                            inputMode='numeric'
                            />
                        </Box>
                      <h2 className="mb-4 text-lg font-medium border-b text-gray-200 col-span-2">Qualification</h2>
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            className="w-full"
                            label="Qualification"
                            onChange={(e) => setQualification(e.target.value)}
                            value={qualification}
                            type='text'
                            placeholder='10, 12, diploma'
                            sx={styleForInputFields}
                            />
                        </Box>
                        <Box 
                        className="w-full"      
                        >
                            <TextField
                            label="Year of Qualification"
                            className="w-full"
                            type='date'
                            onChange={(e) => setYearOfQualification(e.target.value)}
                            value={yearOfQualification}  
                            sx={styleForInputFields}
                            InputLabelProps={{
                                shrink: true,
                              }}
                            />
                        </Box>
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            className="w-full"
                            label="Experience"
                            onChange={(e) => setExperience(e.target.value)}
                            value={experience}
                            type='text'
                            sx={styleForInputFields}
                            />
                        </Box>
                        <h2 className="mb-4 text-lg font-medium border-b text-gray-200 col-span-2">Reference</h2>
                        <Box 
                        className="w-full"                      
                        >
                            <TextField
                            className="w-full"
                            label="Name"
                            onChange={(e) => setReferenceName(capitalizeWords(e.target.value))}
                            value={referenceName}
                            type='text'
                            sx={styleForInputFields}
                            />
                        </Box>
                        <Box 
                        className="w-full"         
                        >
                            <TextField
                            className="w-full"
                            label="Phone Number"
                            onChange={referencePhoneNumberChange}
                            value={referencePhoneNo}
                            type='text'
                            sx={styleForInputFields}
                            inputMode='numeric'
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
  )
}

export default index