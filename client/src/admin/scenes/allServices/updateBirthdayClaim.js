import { useAuthContext } from "../../../utils/hooks/useAuthContext"

const updateAadhaarNo = async ( registeredNo, aadhaarNo ) =>  {
  const { user } = useAuthContext();
  try {
    await fetch(`http://localhost:4000/customer/aadhaar/${registeredNo}`, {
      method: 'PUT',
      body: JSON.stringify({aadhaarNo}),
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.log(error)
  }
}

const updateLastDobClaim = async ( registeredNo, date ) =>  {
  const { user } = useAuthContext();
  try {
    await fetch(`http://localhost:4000/customer/aadhaar/${registeredNo}`, {
      method: 'PUT',
      body: JSON.stringify({date}),
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.log(error)
  }
}
