import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'


function SignUp(props) {

    const [credentials, setCredentials] = useState({name:"",email: "", password:"",cpassword: ""})
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const responce = await fetch("http://localhost:5000/api/auth/signup",{
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name:credentials.name,
                email:credentials.email,
                password:credentials.password})
        })
        const json = await responce.json();
        console.log(json);

        if(json.success) {
            // redirect to home page
            localStorage.setItem("token",json.authToken);
            props.showAlert("Signed Up In","success")
            navigate("/")
        }else{
            props.showAlert("Failed to SignUp","danger")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})    
    }

    return (
        <>
            <div className="container mx-3 my-3" onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" onChange={onChange} name="name" aria-describedby="emailHelp" minLength={3} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" onChange={onChange} name="password" minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="cpassword" onChange={onChange} name="cpassword" minLength={5} required/>
                    </div>
                    <button type="submit" className="btn btn-primary" >Sign Up</button>
                </form>
            </div>
        </>
    )
}

export default SignUp