import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useState,useEffect} from 'react'
import MenuItem from '@mui/material/MenuItem'
import axios from 'axios'


export default function Users() {
    const [users, setUsers] = useState([])

    const fetchUser = async () => {
        const response = await axios.get(`http://localhost:3000/users`)
        setUsers(response.data)
    }

    useEffect(() => {
        fetchUser()
        
    })

    const status = [
        {
            value: 'All',
            label: 'All'
        },
        {
            value: 'Active',
            label: 'Active'
        },
        {
            value: 'Inactive',
            label: 'Inactive'
        }
    ]
    const role = [
        {
            value: 'All',
            label: 'All'
        },
        {
            value: 'Admin',
            label: 'Admin'
        },
        {
            value: 'User',
            label: 'User'
        }
    ]
    return (
        <div className="px-2 py-2    w-full ml-8 mb-96">
            <div className="flex-col">
                <div className="my-5">Product</div>
                {/* <Button onClick={() => '/admin/NewProduct'}>New Product</Button> */}
            </div>
            <table className="bg-white px-4   gap-14 w-full">
                <tr className="items-center flex  h-10 w-full">
                    {/* <th className="w-32">
                        <div> </div>
                    </th> */}
                    <th className="w-1/6 text-left pl-14 ml-4    ">Full Name</th>
                    <th className="w-1/6 text-left ">Email</th>
                    <th className="w-1/12 text-left pl-4">Phone </th>
                    <th className="w-1/6  text-left pl-20">DateOfBirth </th>
                    <th className="w-1/12 text-left pl-4">Point </th>
                    <th className="w-1/6 text-left pl-20 ">Create </th>
                    <th className="w-1/12 text-left pl-10">Role </th>
                    <th className="w-1/12 text-left pl-10">Status</th>
                </tr>
                <tr className="items-center flex  ">
                    <th className="w-1/5 text-right pr-4">
                        <TextField className="  " id="outlined-basic" label="Full Name " variant="standard" />
                    </th>
                    <th className="w-1/5 text-left">
                        <TextField className="" id="outlined-basic" label="Email" variant="standard" />
                    </th>

                    <th className="w-52 ">
                        <TextField className="  " id="outlined-basic" label="Phone" variant="standard" />
                    </th>
                    <th className="w-52 ">
                        <TextField className=" w-32" id="outlined-basic" label="DateOfBirth" variant="standard" />
                    </th>
                    <th className="w-1/6 ">
                        <TextField className=" w-32" id="outlined-basic" label="Points" variant="standard" />
                    </th>

                    <th className="w-1/6 flex gap-3 ">
                        <TextField className="w-16" id="outlined-basic" label="From" variant="standard" />
                        <TextField className="w-16" id="outlined-basic" label="To" variant="standard" />
                    </th>
                    <th className="w-1/12">
                        <TextField className="text-left" fullWidth select label="Role" variant="filled" defaultValue="All">
                            {role.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </th>
                    <th className="w-40">
                        <TextField className="text-left" fullWidth select label="Status" variant="filled" defaultValue="All">
                            {status.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </th>
                </tr>
                <hr className=" my-2" />
                {users.map((user) => (
                    <>
                     <tr className="items-center flex ">
                        <td className="mr-4">
                            <img
                                    className="w-12 h-12"
                                    src={user.Picture }
                            />
                        </td>
                            <td className="w-52 flex ">{ user.Name}</td>
                            <td className="w-1/6  truncate mr-8" >{user.Email}</td>
                            <td className="w-1/12   gap-12 mr-16  ">{ user.PhoneNumber}</td>
                            <td className="w-1/12  text-left    mr-16 ">{ user.DateOfBirth ? user.DateOfBirth.substr(0,10) : ""}</td>
                            <td className="w-1/12  text-left mr-16   ">{user.Point}</td>
                            <td className="w-1/12  mr-16">{user.CreatedAt ? user.CreatedAt.substr(0, 10) : ""} </td>
                            <td className="w-1/12 ">{user.Role}</td>
                            <td className="w-1/12 ">
                                <TextField className="text-left" fullWidth select label="Status" variant="filled" defaultValue={user.status}>
                                    {status.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </td>
                    </tr>
                    <hr className=" my-2" />
                </>
                ))}
                
            </table>
        </div>
    )
}
