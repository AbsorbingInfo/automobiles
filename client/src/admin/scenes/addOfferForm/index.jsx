import React, { useState }  from 'react'
import { useAuthContext } from "../../../utils/hooks/useAuthContext"

const index = () => {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [fromDate,setFromDate] = useState('');
    const [tillDate,setTillDate] = useState('');
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    const createOffer = async(e) =>{
        const formData = new FormData();
        formData.append('image', e.target.elements.image.files[0]);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('fromDate', fromDate);
        formData.append('tillDate', tillDate);

        const response = await fetch('http://localhost:4000/offer', {
            method: 'POST',
            body: formData,
            headers: {'Authorization': `Bearer ${user.token}`}
        });
        if (!response.ok) {
            const json = await response.json();
            setError(json.error)
        } 
        if (response.ok) {
            const json = await response.json();
            alert("Offer Posted")
            setTitle('');
            setDescription('');
            setFromDate('');
            setTillDate('');
            e.target.reset();
            console.log('New offer added:', json);
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

  return (
    <div className='h-[75vh]'>
        <section className={"#e0e0e0" }>
            <div className="pb-8 px-4 pt-3 mx-auto max-w-2xl h-[80vh] lg:pb-16">
                <h2 className="mb-4 text-xl font-bold border-b text-white">Add Offer</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="md:col-span-1 col-span-2">
                            <label htmlFor="image" className="block mb-2 text-sm font-medium text-white">Image<span className="text-red-600"> *</span></label>
                            <input type="file" name="image" id="image" className="border  text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" accept="image/*" max="5242880" required/>
                        </div>   
                        <div className="col-span-2">
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-white">Title<span className="text-red-600"> *</span></label>
                            <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" name="title" id="title" className=" border   text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder="Title" required/>
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium  text-white">Description<span className="text-red-600"> *</span></label>
                            <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" name="description" id="description" className=" border   text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder="Description" required/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="from" className="block mb-2 text-sm font-medium  text-white">From Date<span className="text-red-600"> *</span></label>
                            <input onChange={(e) => {setFromDate(e.target.value)}} type="date" name="from" id="from" className="remove-icon-input  border   text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" required/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="till" className="block mb-2 text-sm font-medium  text-white">Till Date<span className="text-red-600"> *</span></label>
                            <input onChange={(e) => {setTillDate(e.target.value)}} type="date" name="till" id="till" className="remove-icon-input  border   text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" required/>
                        </div>
                    </div>
                        <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 focus:ring-primary-900 hover:bg-primary-800">
                            Post Offer
                        </button>               
                </form>
                {error && <div className="p-2.5 my-2 border-solid rounded-2xl border-2 border-red-500 text-red-700">{error}</div>}             
            </div>
            </section>
    </div>
  )
}

export default index