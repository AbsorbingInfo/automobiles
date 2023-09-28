import { useEffect, useState } from "react";
import { useAuthContext } from "../../../utils/hooks/useAuthContext"

const useFetchRevenueCount = () => {
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [gstRevenue, setGstRevenue] = useState(0)
    const [noGstRevenue, setNoGstRevenue] = useState(0)
    const [mechanicRevenue, setMechanicRevenue] = useState(0)
    const { user } = useAuthContext();

    const fetchTotalRevenue = async () => {
        const response = await fetch('http://localhost:4000/invoice/totalrevenue', {
            headers: {'Authorization': `Bearer ${user.token}`},
          })
        const json = await response.json()
        if (response.ok) {
            setTotalRevenue(json)
        }
    }
    const fetchGstRevenue = async () => {
        const response = await fetch('http://localhost:4000/invoice/gstrevenue', {
            headers: {'Authorization': `Bearer ${user.token}`},
          })
        const json = await response.json()
        if (response.ok) {
            setGstRevenue(json)
        }
    }
    const fetchNoGstRevenue = async () => {
        const response = await fetch('http://localhost:4000/invoice/nogstrevenue', {
            headers: {'Authorization': `Bearer ${user.token}`},
          })
        const json = await response.json()
        if (response.ok) {
            setNoGstRevenue(json)
        }
    }
    const fetchMechanicRevenue = async () => {
        const response = await fetch('http://localhost:4000/invoice/mechanicrevenue', {
            headers: {'Authorization': `Bearer ${user.token}`},
          })
        const json = await response.json()
        if (response.ok) {
            setMechanicRevenue(json)
        }
    }
    useEffect(() => {
        if(user){
            fetchTotalRevenue()
            fetchGstRevenue()
            fetchNoGstRevenue()
            fetchMechanicRevenue()
        }
    }, [])
    return { totalRevenue, gstRevenue, noGstRevenue, mechanicRevenue };
};
export default useFetchRevenueCount;