import { useEffect, useState } from "react";
import { useAuthContext } from "../../../utils/hooks/useAuthContext"

const useFetchTrafficCount = () => {
    const [trafficCount, setTrafficCount] = useState([])
    const { user } = useAuthContext();
    const fetchServicesCount = async () => {
        const response = await fetch('http://localhost:4000/count', {
            headers: {'Authorization': `Bearer ${user.token}`},
          })
        const json = await response.json()
        if (response.ok) {
            setTrafficCount(json)
        }
    }
    useEffect(() => {
        if(user){
         fetchServicesCount()
        }
    }, [])
    return trafficCount;
};
export default useFetchTrafficCount;