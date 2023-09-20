import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Customer = () => {
    const [customer,setcustomer] = useState([]);
    const [haveedit,editchange] = useState(false);
    const [haveadd,addchange] = useState(false);
    const [haveremove,removechange] = useState(false);
    const [haveview,viewchange] = useState(false);
    const navigate = useNavigate();
    const loadCustomer = () => {
        fetch("http://localhost:8000/customer").then((res)=>{
            return res.json();
        }).then((resp) => {
            setcustomer(resp);
        }).catch((err)=>{
            toast.error(err.message);
        });
    } 
    const getUserAccesses = () => {
        let userrole = sessionStorage.getItem("userrole")!=null?sessionStorage.getItem("userrole").toString():"";
        fetch("http://localhost:8000/roleaccess?role="+userrole+"&menu=customer").then((res) =>{
            if(!res.ok)
            {
                navigate("/");
                toast.warning("You have not authorized to access customer page!");
            }
            return res.json();
        }).then((resp) => {
            if(resp.length > 0)
            {
                let userobj = resp[0];
                viewchange(true);
                editchange(userobj.haveedit);
                addchange(userobj.haveadd);
                removechange(userobj.haveremove);
            }else
            {
                navigate("/");
                toast.warning("You have not authorized to access customer page");
            }
        }).catch((err)=>{
            toast.error("get user access " +err.message);
        })
    }
    const handleadd = () =>{
        if(haveadd)
        {
            toast.success("Handle Add");
        }else
        {
            toast.warning("Permission denied");
        }
    }
    const handleedit = () =>{
        if(haveedit)
        {
            toast.success("Handle Edit");
        }else
        {
            toast.warning("Permission denied");
        }
    }
    const handleremove = () =>{
        if(haveremove)
        {
            toast.success("Handle Remove");
        }else
        {
            toast.warning("Permission denied");
        }
    }
    
    useEffect(()=>{
        getUserAccesses();
        loadCustomer();
    },[]);
    return ( 
        <div>
            <h2>Customer page</h2>
            <button onClick={handleadd} className="btn btn-md btn-success float-right">+ Add Customer</button>
            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {customer && 
                        customer.map(customer =>(
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>
                                <button onClick={handleedit} className="btn btn-md btn-success mr-4">Edit</button>
                                <button onClick={handleremove} className="btn btn-md btn-danger ml-3">Delete</button>
                            </td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
     );
}
 
export default Customer;