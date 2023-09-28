import { useEffect, useState } from "react";
import { useAuthContext } from "../../../utils/hooks/useAuthContext"

const useFetchGstLineChartData = () => {
    const [data, setData] = useState([])
    const { user } = useAuthContext();
    const fetchGstLineChartData = async () => {
      const response = await fetch('http://localhost:4000/invoice/linechart/gst', {
          headers: {'Authorization': `Bearer ${user.token}`},
        })
      const json = await response.json()
      if (response.ok) {
        setData(json)
      }
    }
    useEffect(() => {
        if(user){
          fetchGstLineChartData()
        }
    }, [])
    const result = {
      id: "Spare Parts",
      color: "#f1b9b7",
      data: data
    }
    return result;
};

const useFetchNoGstLineChartData = () => {
  const [data, setData] = useState([])
  const { user } = useAuthContext();
  const fetchNoGstLineChartData = async () => {
    const response = await fetch('http://localhost:4000/invoice/linechart/nogst', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
    const json = await response.json()
    if (response.ok) {
      setData(json)
    }
  }
  useEffect(() => {
    if(user){
      fetchNoGstLineChartData()
    }
  }, [])
  const result = {
    id: "Miscellaneous",
    color: "#a4a9fc",
    data: data
  }
  return result;
};

const useFetchMechanicLineChartData = () => {
  const [data, setData] = useState([])
  const { user } = useAuthContext();
  const fetchMechanicLineChartData = async () => {
    const response = await fetch('http://localhost:4000/invoice/linechart/mechanic', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
    const json = await response.json()
    if (response.ok) {
      setData(json)
    }
  }
  useEffect(() => {
    if(user){
      fetchMechanicLineChartData()
    }
  }, [])
  const result = {
    id: "Mechanics",
    color: "#4cceac",
    data: data
  }
  return result;
};

const useFetchLineChartData = () => {
  const gstLineData = useFetchGstLineChartData()
  const noGstLineData = useFetchNoGstLineChartData()
  const mechanicLineData = useFetchMechanicLineChartData()

  return [gstLineData, noGstLineData, mechanicLineData];
};

export default useFetchLineChartData