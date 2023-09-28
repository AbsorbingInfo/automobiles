import { useEffect, useState } from "react";
import { useAuthContext } from "../../../utils/hooks/useAuthContext"

const useFetchCustomersCount = () => {
    const [customersCount, setCustomersCount] = useState([])
    const { user } = useAuthContext();
    const fetchCustomersCount = async () => {
        const response = await fetch('http://localhost:4000/customer/count', {
            headers: {'Authorization': `Bearer ${user.token}`},
          })
        const json = await response.json()
        if (response.ok) {
        setCustomersCount(json)
        }
    }
    useEffect(() => {
        if(user){
            fetchCustomersCount()
        }
    }, [])
    return customersCount;
};
export default useFetchCustomersCount;