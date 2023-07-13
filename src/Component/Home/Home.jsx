
import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { FaEye, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";





const Home = () => {
    const [users, setUsers] = useState([])
    const [allusers, setAllusers] = useState([])

    useEffect(() => {
        fetch(`https://usermanagement-one.vercel.app/allusers`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setAllusers(data)
                    setUsers(data)
                }

            })

    }, [])




    const deleteHandaler = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://usermanagement-one.vercel.app/users/${id}`, {

                    method: "DELETE",

                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            const remaining = users.filter(toy => toy._id !== id)
                            setAllusers(remaining)
                            console.log(remaining)


                        }

                    })


            }
        })

    }







    return (
        <div>
            <NavBar users={allusers} />
   
          
            <div className=" font-bold text-3xl underline text-teal-600 m-8 text-center">All <span className="text-orange-400">Users</span></div>
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
                                <th>View</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-300 font-medium">
                            {
                                allusers?.map((user, index) =>
                                    <tr key={user._id}>

                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            {user?.name}

                                        </td>
                                        <td>{user?._id}</td>
                                        <td>
                                            <Link to={`/singledata/${user?._id}`}><button className="btn btn-circle border-none hover:bg-teal-400 text-white  bg-teal-300">
                                                <FaEye className='text-xl' />
                                            </button></Link>
                                        </td>

                                        <td><Link to={`/edit/${user?._id}`}><button className="btn btn-circle border-none hover:bg-teal-400 text-white  bg-teal-300">
                                            <FaRegEdit className='text-xl' />
                                        </button></Link></td>

                                        <td>
                                            <button onClick={() => deleteHandaler(user?._id)} className="btn btn-circle btn-outline hover:bg-red-600  bg-red-500 text-white">
                                                <FaRegTrashAlt className='text-xl' />
                                            </button>

                                        </td>

                                    </tr>


                                )
                            }


                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default Home;