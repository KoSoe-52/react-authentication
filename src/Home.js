import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
    const navigate = useNavigate();
    const [users,setusers] = useState([]);
    useEffect(()=>{
        let username = sessionStorage.getItem("username");
        if(username ==='' || username ===null)
        {
            navigate("/login");
        }
        fetch("http://localhost:8000/user").then((res) => {
            return res.json();
        }).then((res)=>{
            setusers(res);
        }).catch((e)=>{
            toast.error(e.message);
        });
    },[]);
    return ( 
        <div>
            <h1>Registration Lists</h1>
            <Link to={"/"}>Home |</Link>
            <Link to={"/login"}>Logout</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                        { users && users.map((user,index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.fullname}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.address}</td>
                                </tr>
                            ))
                        }
                </tbody>
            </table>
        </div>
     );
}
 
export default Home;