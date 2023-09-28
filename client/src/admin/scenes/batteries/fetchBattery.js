import { useEffect, useState } from "react";
import { useAuthContext } from "../../../utils/hooks/useAuthContext"

const useFetchBattery = () => {
    const [batteries, setBatteries] = useState([])
    const { user } = useAuthContext();
    const fetchBattery = async () => {
        try{
          const response = await fetch('http://localhost:4000/battery', {
          headers: {'Authorization': `Bearer ${user.token}`},
          })
          const json = await response.json()
          if (response.ok) {
          setBatteries(json)
        }
        }catch(error){
            console.log("createBatteryReplacementApi",error)
            throw error;
        }
    }
    const createBatteryReplacementApi = async ( batteryId, serialNumber) => {
        try {
            const response = await fetch(`http://localhost:4000/battery/replacement/${batteryId}`, {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({serialNumber}),
            });
        
            if (response.ok) {
                const replacedBattery = await response.json()
                return replacedBattery;
            }
        } catch (error) {
            console.log("createBatteryReplacementApi",error)
            throw error;
        }
    }
    const updateReceivedFromCustomerDateApi = async ( batteryId, serialNumber, receivedFromCustomerDate) =>  {
        try {
          const response = await fetch(`http://localhost:4000/battery/recievedfromcustomer/${batteryId}`, {
            method: 'PUT',
            body: JSON.stringify({serialNumber, receivedFromCustomerDate}),
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json'
            }
          });
          if (response.ok) {
            const replacedBattery = await response.json()
            console.log('fetch',replacedBattery)
            return replacedBattery;
          }
        } catch (error) {
          throw error;
        }
    }
    const updateSentToDealerDateApi = async ( batteryId, serialNumber, sentToDealerDate) => {
        try {
          const response = await fetch(`http://localhost:4000/battery/senttodealer/${batteryId}`, {
            method: 'PUT',
            body: JSON.stringify({serialNumber ,sentToDealerDate}),
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json'
            }
          });
          if (response.ok) {
            const replacedBattery = await response.json()
            return replacedBattery;
          }
        } catch (error) {
          throw error;
        }
    }

    const updateReceivedFromDealerDateApi = async ( batteryId, serialNumber, receivedFromDealerDate) => {
        try {
          const response = await fetch(`http://localhost:4000/battery/receivedfromdealer/${batteryId}`, {
            method: 'PUT',
            body: JSON.stringify({serialNumber ,receivedFromDealerDate}),
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const replacedBattery = await response.json()
            return replacedBattery;
          }
        } catch (error) {
          throw error;
        }
    }
    const updateDeliveredDateApi = async( batteryId, serialNumber, deliveredDate) => {
        try {
          const response = await fetch(`http://localhost:4000/battery/delivered/${batteryId}`, {
            method: 'PUT',
            body: JSON.stringify({serialNumber ,deliveredDate}),
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json'
            }
          });
      
          if (response.ok) {
            const replacedBattery = await response.json()
            return replacedBattery;
          }
        } catch (error) {
          throw error
        }
    }

    const getBatteryByIdApi = async( batteryId ) => {
        try {
          const response = await fetch(`http://localhost:4000/battery/${batteryId}`, {
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json'
            }
          });
      
          if (response.ok) {
            const replacedBattery = await response.json()
            return replacedBattery;
          }
        } catch (error) {
          throw error;
        }
    }

    useEffect(() => {
        if(user){
            fetchBattery()
        }
    }, [])
    return {batteries, getBatteryByIdApi, createBatteryReplacementApi, updateReceivedFromCustomerDateApi, updateSentToDealerDateApi, updateReceivedFromDealerDateApi, updateDeliveredDateApi};
};
export default useFetchBattery;