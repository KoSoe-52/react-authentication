import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AppHeader = () => {
    const [username,setusername] = useState("");
    const [showmenu,setshowmenu] = useState(false);
    const navigate = useNavigate("");
    const location = useLocation();
    useEffect(()=>{
        if(location.pathname =="/login" || location.pathname == "/register")
        {
            setshowmenu(false);
        }else
        {
            let username = sessionStorage.getItem("username");
            if(username =='' || username == null)
            {
                navigate("/login");
            }else
            {
                setusername(username);
            }
            setshowmenu(true);
        }
        
    },[location]);
    return ( 
        <div>
            {showmenu && 
                <div className="header">
                    <Link to={"/"}>Home |</Link>
                    <Link to={"/customer"}>Customer |</Link>
                    <Link to={"/login"}>Logout</Link>
                    <span>Welcome! {username}</span>
                </div>
            }
        </div>
     );
}
 
export default AppHeader;