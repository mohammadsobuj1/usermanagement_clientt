import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Component/Home/Home';
import AddUser from './Component/AddUser/AddUser';
import EditUser from './Component/EditUser/EditUser';
import SingleUser from './Component/SingleUser/SingleUser';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>
  },
  {
    path: '/adduser',
    element: <AddUser />
  },
  {
    path: "/edit/:id",
    element: <EditUser />,
    loader: ({ params }) => fetch(`https://usermanagement-one.vercel.app/edit/${params.id}`)
},
  {
    path: "/singledata/:id",
    element: <SingleUser />,
    loader: ({ params }) => fetch(`https://usermanagement-one.vercel.app/singledata/${params.id}`)
},
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
