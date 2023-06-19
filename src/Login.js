import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    const navigate = useNavigate();
    const loginProcess = (e) => {
        e.preventDefault();
        /**
         * form validation is passed
         */
        if(isValidate())
        {
            fetch("http://localhost:8000/user/?username=" + username).then((res) =>{
                return res.json();
            }).then((resp) => {
                console.log(resp);
                if(Object.keys(resp).length === 0)
                {
                    toast.warning("Please enter valid username");
                }else
                {
                    if(resp[0].password === password)
                    {
                        toast.success("Success");
                        sessionStorage.setItem("username",username);
                        navigate("/");
                    }else
                    {
                        toast.warning("Please enter valid password");
                    }
                }
            }).catch((err)=>{
                toast.error("Failed in "+err.message);
            });
        }
    }
    const isValidate = (e) => {
        let isproceed = true;
        if(username ==='' || username === null)
        {
            isproceed = false;
            toast.warning("Please enter valid username");
        }
        if(password ==='' || password ===null)
        {
            isproceed = false;
            toast.warning("Please enter valid password");
        }
        return isproceed;
    }
    useEffect(()=>{
        sessionStorage.clear();
    })
    return ( 
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container mt-3" onSubmit={loginProcess}>
                        <div className="card">
                            <div className="card-header">
                                <h3>Login </h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input className="form-control" onChange={(e) => setusername(e.target.value)}></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" onChange={(e) => setpassword(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-success">Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default Login;