import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const navigate = useNavigate();
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    const [fullname,setfullname] = useState("");
    const [email,setemail] = useState("");
    const [phone,setphone] = useState("");
    const [country,setcountry] = useState("");
    const [address,setaddress] = useState("");
    const [gender,setgender] = useState("male");
    const isValidate = () => {
        let isproceed = true;
        let errormessage = "Please enter the value in ";
        if(username =="" || username == null)
        {
            isproceed = false;
            errormessage+=" username";
        }
        if(password =="" || password == null)
        {
            isproceed = false;
            errormessage+=" password";
        }
        if(fullname =="" || fullname == null)
        {
            isproceed = false;
            errormessage+=" Full name";
        }
        if(email =="" || email == null)
        {
            isproceed = false;
            errormessage+=" email";
        }
        if(phone =="" || phone == null)
        {
            isproceed = false;
            errormessage+=" phone";
        }
        if(!isproceed)
        {
            toast.warning(errormessage);
        }
        return isproceed;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const userobj = {
                username,password,fullname,email,phone,country,address,gender
        };
        if(isValidate())
        {
            fetch("http://localhost:8000/user",{
                method : "POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(userobj)
            }).then((resp)=>{
                toast.success("Successfully created user");
                navigate("/");
            }).catch((e)=>{
                toast.error(e.message);
            });
        }
    }
    return ( 
        <div>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="card-title">
                            <h1>User Registration</h1>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Username <span className="errmsg"></span></label>
                                        <input className="form-control" onChange={(e)=>setusername(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Password <span className="errmsg"></span></label>
                                        <input type="password" className="form-control" onChange={(e)=>setpassword(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Full Name <span className="errmsg"></span></label>
                                        <input className="form-control" onChange={(e)=>setfullname(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Email <span className="errmsg"></span></label>
                                        <input className="form-control" onChange={(e)=>setemail(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Phone <span className="errmsg"></span></label>
                                        <input className="form-control" onChange={(e)=>setphone(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Country <span className="errmsg"></span></label>
                                        <select className="form-control" onChange={(e)=>setcountry(e.target.value)}>
                                            <option value="india">India</option>
                                            <option value="myanmar">Myanmar</option>
                                            <option value="singapore">Singapore</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Address <span className="errmsg"></span></label>
                                        <textarea className="form-control" onChange={(e)=>setaddress(e.target.value)}>

                                        </textarea>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Gender <span className="errmsg"></span></label>
                                        <br></br>
                                        <input type="radio" name="gender" value="male" checked={gender}  onChange={(e)=>setgender(e.target.value)}></input>
                                        <label>Male</label>
                                        <input type="radio" name="gender" value="female" onChange={(e)=>setgender(e.target.value)}></input>
                                        <label>Female</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default Register;