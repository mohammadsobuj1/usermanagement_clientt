import { Link } from "react-router-dom";
import {  FaBell } from "react-icons/fa";

const NavBar = (user) => {

const {users} = user



    return (
        <div>
           
            <div className="navbar bg-gray-500 ">
                <div className="navbar-start font-bold text-xl text-white">
                User Management
                </div>
                <div className="navbar-center">
                <Link  to="/adduser"> <button className='  cursor-pointer p-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>Add Users </button></Link>
                </div>
                <div className="navbar-end">
                   
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                           <FaBell className="text-2xl text-white"/>
                            <span className="badge badge-xl text-white font-bold badge-error indicator-item"> {users?.length} </span>
                        </div> 
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NavBar;