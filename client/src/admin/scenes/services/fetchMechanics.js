import { useEffect, useState } from "react";
import { useAuthContext } from "../../../utils/hooks/useAuthContext"

const useFetchMechanics = () => {
    const [mechanics, setMechanics] = useState([])
    const { user } = useAuthContext();
    const fetchsetMechanics = async () => {
        const response = await fetch('http://localhost:4000/mechanic' ,{
            headers: {'Authorization': `Bearer ${user.token}`},
          })
        const json = await response.json()
        if (response.ok) {
            setMechanics(json)
        }
    }
    useEffect(() => {
        if(user){
            fetchsetMechanics()
        }
    }, [])
    return mechanics;
};
export default useFetchMechanics;