import { useEffect, useState } from "react";
import { useAuthContext } from "../../../utils/hooks/useAuthContext"

const useFetchServicesCount = () => {
    const [servicesCount, setServicesCount] = useState([])
    const { user } = useAuthContext();
    const fetchServicesCount = async () => {
        const response = await fetch('http://localhost:4000/service/count', {
            headers: {'Authorization': `Bearer ${user.token}`},
          })
        const json = await response.json()
        if (response.ok) {
            setServicesCount(json)
        }
    }
    useEffect(() => {
        if(user){
            fetchServicesCount()
        }
    }, [])
    return servicesCount;
};
export default useFetchServicesCount;