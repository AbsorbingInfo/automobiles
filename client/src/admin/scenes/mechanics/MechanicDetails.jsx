import React,{ useEffect, useState } from 'react'
import useFetchMechanics from "./fetchMechanics"
import { useLocation } from 'react-router-dom';


const MechanicDetails = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const batteryId = searchParams.get('mechanic');
	const [mechanic, setMechanic] = useState([]);
	const { fetchMechanic } = useFetchMechanics()
	let formattedDob,formattedDate

	useEffect(() => {
		fetchData()
	},[])

	const fetchData = async() => {
		const data= await fetchMechanic(batteryId)
		setMechanic(data);
	}
	
	if(mechanic.length<0){
		// DOB mechanic
		const dob = new Date(mechanic.dob);
		const day = String(dob.getDate()).padStart(2, "0");
		const month = String(dob.getMonth() + 1).padStart(2, "0");
		const year = dob.getFullYear();
		formattedDob = `${day}/${month}/${year}`;

		//Year of Qualification
		const [yearOfQual, monthOfQual, dayOfQual] = new Date(mechanic.yearOfQualification).toISOString().split('T')[0].split('-');
		formattedDate = `${dayOfQual}/${monthOfQual}/${yearOfQual}`;
	}

  return (
    <section>
			<div className="pb-8 px-4 pt-3 mx-auto max-w-2xl lg:pb-16 bg-[#00101f]">
				<div className="grid gap-4 text-base grid-cols-2">
				<h2 className="mb-4 text-lg font-bold border-b text-white col-span-2">Personal Information</h2>
					<img src={mechanic.photoLink} className='rounded-full h-50 w-50 row-span-4 border-[#CD728B] border-[2px]' />
					<div className='bg-[#152432] p-2 rounded-xl border-y flex items-center'>
							<h2 className="text-xl font-bold  text-[#CD728B]">{mechanic.name}</h2>
					</div>
					<div className='bg-[#152432] p-2 rounded-xl flex items-center'>
							<div className='font-semibold mr-2'>Father's Name:</div>
							<div className='text-[#E0A7B7]'>{mechanic.fathersName}</div>
					</div>
					<div className='bg-[#152432] p-2 rounded-xl flex items-center'>
							<div className='font-semibold mr-2'>Date of Birth:</div>
							<div className='text-[#E0A7B7]'>{formattedDob}</div>
					</div>
					<div className='bg-[#152432] p-2 rounded-xl flex items-center'>
							<div className='font-semibold mr-2'>Maritial Status:</div>
							<div className='text-[#E0A7B7]'>{mechanic.maritialStatus}</div>
					</div>
					
					<div className='bg-[#152432] p-2 rounded-xl flex items-center'>
							<div className='font-semibold mr-2'>Address:</div>
							<div className='text-[#E0A7B7]'>{mechanic.address}</div>
					</div>
					<div className='bg-[#152432] p-2 rounded-xl flex items-center'>
							<div className='font-semibold mr-2'>Village Address:</div>
							<div className='text-[#E0A7B7]'>{mechanic.villageAddress}</div>
					</div>
					<div className='bg-[#152432] p-2 rounded-xl flex items-center'>
							<div className='font-semibold mr-2'>PAN Number:</div>
							<div className='text-[#E0A7B7]'>{mechanic.panNo}</div>
					</div>
					<div className='bg-[#152432] p-2 rounded-xl flex items-center'>
							<div className='font-semibold mr-2'>Aadhaar Number:</div>
							<div className='text-[#E0A7B7]'>{mechanic.aadhaarNo}</div>
					</div>
					<div className='bg-[#152432] p-2 rounded-xl flex items-center'>
							<div className='font-semibold mr-2'>Phone Number:</div>
							<div className='text-[#E0A7B7]'>{mechanic.phoneNo}</div>
					</div>
					
					<h2 className="mb-4 mt-5 text-lg font-bold border-b text-white col-span-2">Emergency Contact</h2>
					<div className='bg-[#152432] p-2 rounded-xl flex items-center'>
							<div className='font-semibold mr-2'>Name:</div>
							<div className='text-[#E0A7B7]'>{mechanic.emergencyName}</div>
					</div>
					<div className='bg-[#152432] p-2 rounded-xl flex items-center'>
							<div className='font-semibold mr-2'>Relaton:</div>
							<div className='text-[#E0A7B7]'>{mechanic.emergencyRelaton}</div>
					</div>
					<div className='bg-[#152432] p-2 rounded-xl flex items-center'>
							<div className='font-semibold mr-2'>Phone Number:</div>
							<div className='text-[#E0A7B7]'>{mechanic.emergencyPhoneNo}</div>
					</div>
					<h2 className="mb-4 mt-5 text-lg font-bold border-b text-white col-span-2">Qualification</h2>
							<div className='bg-[#152432] p-2 rounded-xl flex items-center'>
									<div className='font-semibold mr-2'>Qualification</div>
									<div className='text-[#E0A7B7]'>{mechanic.qualification}</div>
							</div>
							<div className='bg-[#152432] p-2 rounded-xl flex items-center'>
									<div className='font-semibold mr-2'>Year:</div>
									<div className='text-[#E0A7B7]'>{formattedDate}</div>
							</div>
							<div className='bg-[#152432] p-2 rounded-xl flex items-center'>
									<div className='font-semibold mr-2'>Experience:</div>
									<div className='text-[#E0A7B7]'>{mechanic.experience}</div>
							</div>
					<h2 className="mb-4 mt-5 text-lg font-bold border-b text-white col-span-2">Reference</h2>
							<div className='bg-[#152432] p-2 rounded-xl flex items-center'>
									<div className='font-semibold mr-2'>Name:</div>
									<div className='text-[#E0A7B7]'>{mechanic.referenceName}</div>
							</div>
							<div className='bg-[#152432] p-2 rounded-xl flex items-center'>
									<div className='font-semibold mr-2'>Phone Number:</div>
									<div className='text-[#E0A7B7]'>{mechanic.referencePhoneNo}</div>
							</div>
					</div>
			</div>
		</section>
  )
}

export default MechanicDetails