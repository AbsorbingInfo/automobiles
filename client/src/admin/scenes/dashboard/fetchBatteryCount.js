import { useEffect, useState } from "react";
import { useAuthContext } from "../../../utils/hooks/useAuthContext"

const useFetchBatteryCount = () => {
    console.log("sasas")
    const [batteryCount, setBatteryCount] = useState('')
    const { user } = useAuthContext();
    const fetchBatteryCount = async () => {
        const response = await fetch('http://localhost:4000/battery/count', {
            headers: {'Authorization': `Bearer ${user.token}`},
          })
        const json = await response.json()
        if (response.ok) {
            setBatteryCount(json)
        }
    }
    useEffect(() => {
        if(user){
            fetchBatteryCount()
        }
    }, [])
    return batteryCount;
};
export default useFetchBatteryCount;