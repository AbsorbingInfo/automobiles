import { useEffect, useState } from "react";
import { useAuthContext } from "../../../utils/hooks/useAuthContext"

const useFetchMechanics = () => {
    const [mechanics, setMechanics] = useState([])
    const { user } = useAuthContext();
    const fetchMechanics = async () => {
        const response = await fetch('http://localhost:4000/mechanic', {
            headers: {'Authorization': `Bearer ${user.token}`},
          })
        const json = await response.json()
        if (response.ok) {
        setMechanics(json)
        }
    }
    const fetchMechanic = async (mechanicId) => {
        const response = await fetch(`http://localhost:4000/mechanic/${mechanicId}`, {
            headers: {'Authorization': `Bearer ${user.token}`},
        })
        if (response.ok) {
            const json = await response.json()
            return json;
        }
    }
    useEffect(() => {
        if(user){
            fetchMechanics()
        }
    }, [])
    return { mechanics, fetchMechanic};
};
export default useFetchMechanics;