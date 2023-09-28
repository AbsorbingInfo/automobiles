import React,{useState} from 'react'
import { useAuthContext } from '../utils/hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, InputAdornment, IconButton  } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';


const AdminLogin = () => {
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()
    
    const loginAdmin = async () => {
      const login = {username,password}
      const response = await fetch('http://localhost:4000/adminlogin', {
        method: 'POST',
        body: JSON.stringify(login),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const json = await response.json()
      if (!response.ok) {
        setError(json.error)
      }
      if (response.ok) {
        setUsername('')
        setPassword('')
        localStorage.setItem('admin',JSON.stringify(json))
        dispatch({type: 'LOGIN', payload: json})
        navigate("/admin");
      }

      if (json.token) {
        const payload = JSON.parse(atob(json.token.split('.')[1]));
      if (payload.exp) {
        const expiryTimestamp = payload.exp * 1000;
        localStorage.setItem('adminTokenExpiry', expiryTimestamp);
      }
    }
    
    };
    const handleSubmit = (e) =>{
      e.preventDefault();
      loginAdmin();
    }
    
    const styleButton = {
      backgroundColor: '#45CFDD',
      color: '#292929',
      fontSize: "14px",
      fontWeight: "bold",
      padding: "7px 20px",
      '&:hover': {
      backgroundColor: '#B42B51',
      color: '#e0e0e0'
      }
    }

    const styleForInputFields = {
      '& .MuiInputLabel-root': {
        color: 'white !important',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset':{
          borderColor:'gray !important',
        },
        '&:hover fieldset': {
          borderColor: 'white !important',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white !important',
        },
        '& .MuiIconButton-root': { 
          color: 'white !important', 
        },
      },
      label: {
          fontSize: '1rem',
        }
    };
  return (
    <section className="bg-[#001a33]">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[75vh] lg:py-0">
            <div className="w-full rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0 bg-[#001529]">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tightmd:text-2xl text-white">
                        Admin
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <TextField
                             className='w-full'
                             onChange={(e) => setUsername(e.target.value)} 
                             value={username} 
                             type="text" 
                             name="username" 
                             label="Username" 
                             sx={styleForInputFields}
                             required
                            />
                        </div>
                        <div>
                            <TextField
                             className='w-full'
                             onChange={(e)=> setPassword(e.target.value)} 
                             value={password} 
                             type={showPassword ? 'text' : 'password'} 
                             name="username" 
                             label="Password" 
                             sx={styleForInputFields}
                             required
                             InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    edge="end"
                                  >
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            />
                        </div>
                        <Button
                         type="submit" 
                         sx={styleButton}
                        >
                          Log in
                        </Button>
                        {error && <div className="p-2.5 my-2 border-solid rounded-2xl border-2 border-red-500 text-red-700">{error}</div>}  
                    </form>
                </div>
            </div>
        </div>
      </section>
  )
}

export default AdminLogin