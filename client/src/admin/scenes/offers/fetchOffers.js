import { useEffect, useState } from "react";
import { useAuthContext } from "../../../utils/hooks/useAuthContext"

const useFetchOffers = () => {
    const [offers, setOffers] = useState([])
    const { user } = useAuthContext();
    const fetchOffers = async () => {
        const response = await fetch('http://localhost:4000/offer' ,{
            headers: {'Authorization': `Bearer ${user.token}`},
          })
        const json = await response.json()
        if (response.ok) {
            setOffers(json)
        }
    }
    useEffect(() => {
        if(user){
            fetchOffers()
        }
    }, [])
    return offers;
};
export default useFetchOffers;