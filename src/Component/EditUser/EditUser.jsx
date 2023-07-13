import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useController, useForm } from "react-hook-form";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const EditUser = () => {
    const UpdatedUser = useLoaderData()
  



    const [country, setCountry] = useState('bd');
    const { register, handleSubmit, reset, control } = useForm();

    const { field } = useController({
        name: "phone",
        control,
        rules: { required: true }
    });

    const onSubmit = data => {
        if (data) {
            console.log(data)
            fetch(`https://usermanagement-one.vercel.app/edit/${UpdatedUser?._id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(datas => {

                    if (datas?.modifiedCount > 0) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Your toy has been Updated',
                            showConfirmButton: false,
                            timer: 1500
    
                        })
                        reset()
                    }

                })
        }

    };
    const handleCountryChange = (value) => {
        setCountry(value);
    };
    return (
        <div>
            <div className='grid grid-cols-1  h-screen w-full'>
                {/* <div className='hidden sm:block'> */}
                {/* <img className='w-full h-full object-cover' src={loginImg} alt="" /> */}
                {/* </div> */}

                <div className='bg-gray-800 flex flex-col justify-center'>
                    <Link to="/"> <button className=' w-full md:w-[60%]  md:ml-40 my-5 cursor-pointer py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>Back to home</button></Link>
                    <form onSubmit={handleSubmit(onSubmit)} className='max-w-[400px] w-full mx-auto rounded-lg p-8 px-8'>
                        <h2 className='text-4xl dark:text-white font-bold text-center'>Update Details</h2>
                        <div className='flex flex-col text-gray-400 py-2'>
                            <label>Username</label>
                            <input className='rounded-lg bg-white mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'  defaultValue={UpdatedUser?.name}  type="text" {...register("name", { required: true, maxLength: 20 })} />

                        </div>
                        <div className='flex flex-col text-gray-400 py-2'>
                            <label>Email</label>

                            <input className='rounded-lg bg-white mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' defaultValue={UpdatedUser?.email} type="email"  {...register("email", { required: true })} />
                        </div>
                        <div className='flex flex-col text-gray-400 py-2'>
                            <label>Phone Number</label>


                            <PhoneInput
                                className=" bg-white rounded-lg mt-3 text-black"
                                defaultValue={UpdatedUser?.phone}
                                country={country}
                                value={field.value}
                                onChange={field.onChange}
                                inputProps={{
                                    ...field,
                                    required: true
                                }}
                                onChangeCountry={handleCountryChange}
                            />

                        </div>

                        <input className='w-full my-5 cursor-pointer py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' type="submit" value="Upadate" />


                    </form>
                </div>
            </div>

        </div>
    );
};

export default EditUser;