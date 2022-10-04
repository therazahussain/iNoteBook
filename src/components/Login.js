import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

function Login(props) {
    const [credentials, setCredentials] = useState({email: "", password:""})
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const responce = await fetch("http://localhost:5000/api/auth/login",{
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        })
        const json = await responce.json();
        console.log(json);

        if(json.success) {
            // redirect to home page
            localStorage.setItem("token",json.authToken);
            props.showAlert("Logged In","success")
            navigate("/")
        }else{
            props.showAlert("Failed to Login, Try with Correct Credentials ","danger")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})    
    }

    return (
        <div className="container mx-3 my-3" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} name="password"/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login