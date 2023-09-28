import { useEffect, useState } from "react";
import { useAuthContext } from "../../../utils/hooks/useAuthContext"

const useFetchHolidays = () => {
    const [holidays, setHolidays] = useState([])
    const { user } = useAuthContext();
    const fetchHolidays = async () => {
        const response = await fetch('http://localhost:4000/holidays', {
            headers: {'Authorization': `Bearer ${user.token}`},
          })
        const json = await response.json()
        if (response.ok) {
            setHolidays(json)
        }
    }
    useEffect(() => {
        if(user){
            fetchHolidays()
        }
    }, [])
    return holidays;
};
export default useFetchHolidays;