
import { Link, useLoaderData } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";


const SingleUser = () => {
    const singleData = useLoaderData()
    const [allusers, setAllusers] = useState([])

    useEffect(() => {
        fetch(`https://usermanagement-one.vercel.app/allusers`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setAllusers(data)
                  
                }

            })

    }, [])

    return (
        <div>
            <NavBar users={allusers} />

            <div className=" font-bold text-3xl  m-8 text-center"> {singleData?.name}s Details</div>

            <div className=" ">
                <div className="overflow-x-auto">
                    <table className="table table-zebra  ">
                        {/* head */}
                        <thead className="bg-teal-300 shadow-lg text-xl text-white font-medium">
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Name</th>
                                <th>User_Id</th>
                                <th>User_Email</th>
                                <th>User_Phone</th>
                                <th>Update_Detail</th>

                            </tr>
                        </thead>
                        <tbody className="bg-gray-300 font-medium">
                            <tr >

                                <td>
                                    1
                                </td>
                                <td>
                                    {singleData?.name}

                                </td>
                                <td>{singleData?._id}</td>
                                <td>{singleData?.email}</td>
                                <td>{singleData?.phone}</td>

                                <td><Link to={`/edit/${singleData?._id}`}><button className="btn btn-circle border-none hover:bg-teal-400 text-white  bg-teal-300">
                                    <FaRegEdit className='text-xl' />
                                </button></Link></td>
                            </tr>



                        </tbody>


                    </table>
                </div>
            </div>
            <Link to="/"> <button className=' w-full md:w-[60%]  md:ml-40 my-5 cursor-pointer py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>Back to home</button></Link>
        </div>
    );
};

export default SingleUser;