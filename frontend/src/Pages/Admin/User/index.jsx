import {
    Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
import React, { useState, useEffect, useContext } from 'react'
import MenuItem from '@mui/material/MenuItem'
import axios from 'axios'
import Popup from 'reactjs-popup'
import { UserContext } from '../../../UserContext'
import CategoryNav from '../../../components/features/CategoryNav';
export default function Users() {
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [pageList, setPageList] = useState([])

    const { user } = useContext(UserContext)
    const [users, setUsers] = useState([])
    const [ban, setBan] = useState()
    const [role, setRole] = useState('')
    const [reason, setReason] = useState()

    const [txtName, setName] = useState('')
    const [txtEmail, setEmail] = useState('')
    const [txtPhone, setPhone] = useState('')
    const [txtDob, setDob] = useState('')
    const [txtUpperPoint, setUpperPoint] = useState('')
    const [txtUpperCreate, setUpperCreate] = useState('')
    const [txtLowerPoint, setLowerPoint] = useState('')
    const [txtRole, setTxtRole] = useState('')
    const [txtStatus, setTxtStatus] = useState('')


    const fetchUser = async () => {
        const response = await axios.get(`http://localhost:3000/users`)
        setUsers(response.data)
    }
    const updateUser = async (userId) => {
        const json = {
            userId: userId,
            role : role,
            status: ban,
            ReasonBlock : reason
        }
        if (userId != user.Id) {
            const response = await axios.post(`http://localhost:3000/admin/updateUser`, json)
            setUsers(response.data)
            alert("Đã cập nhật người dùng")
        } else {
            alert("Bạn không thể thao tác với tài khoản của mình")
        }
        
    }
    useEffect(() => {
        handleButtonClick("Người dùng","User")
    },[])

    useEffect(() => {
        handleFilter()  
    })

    const handleSwitchPage = (page) => {
        setPage(page)
    }

    const handleRole = (event) => {
        setRole(event.target.value)
    }
    const handleStatus = (event) => {
        setBan(event.target.value)
    }
    const handleReasoon = (event) => {
        setReason(event.target.value)
    }
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleDobChange = (event) => {
        setDob(event.target.value);
    };

    const handleUpperPointChange = (event) => {
        setUpperPoint(event.target.value);
    };

    const handleUpperCreateChange = (event) => {
        setUpperCreate(event.target.value);
    };

    const handleLowerPointChange = (event) => {
        setLowerPoint(event.target.value);
    };

    const handleRoleChange = (event) => {
        setTxtRole(event.target.value);
    };

    const handleStatusChange = (event) => {
        setTxtStatus(event.target.value);
    };


    const handleChange = (status, reason, role) => {
        setBan(status)
        setReason(reason)
        setRole(role)
    }

    const handleOk = (userid, close) => {
        updateUser(userid)
        setReason()
        close()
        fetchUser()
    }

    const handleFilter = async () => {
        const json = {
            name: txtName,
            email: txtEmail,
            phone: txtPhone,
            dob: txtDob,
            role: txtRole,
            upper_point: txtUpperPoint,
            lower_point: txtLowerPoint,
            create: txtUpperCreate,
            status: txtStatus,
            page: page
        }
        axios.post('http://localhost:3000/users/filter/', json)
            .then((response) => {
                setUsers(response.data.data)
                setMaxPage(Math.ceil(response.data.lines.Count / 10))
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }

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
    const roles = [
        {
            value: 'Admin',
            label: 'Admin'
        },
        {
            value: 'Staff',
            label: 'Nhân viên'
        },
        {
            value: 'User',
            label: 'Người dùng'
        }
    ]

    ///active button
    const [activeButton, setActiveButton] = useState(null)

    const handleButtonClick = (buttonName, role) => {
        setActiveButton(buttonName)
        setTxtRole(role)
    }

    return (
        <div className="px-2 py-2    w-full ml-8 mb-96">
            <div className="flex-col">
            <CategoryNav parents={[{ name: 'Trang chủ', link: '/' }]} current="Người dùng" />
                <div className="my-5">Product</div>
                {/* <Button onClick={() => '/admin/NewProduct'}>New Product</Button> */}
            </div>
            <div className="flex align-bottom ">
                {/* <div className="mx-2 ">Lồng</div> */}
                <div className="flex">
                    {roles.map(
                        (role, index) =>
                            <div key={index}>
                                <button
                                    className={`p-2 rounded-t-lg ${activeButton === role.label ? 'bg-white' : 'bg-slate-300'}`}
                                    onClick={() => handleButtonClick(role.label, role.value)}
                                >
                                    {role.label}
                                </button>
                            </div>                            
                    )}
                </div>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <div className="font-bold text-lg">Tên</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-bold text-lg w-1/2">Email</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-bold text-lg">SĐT </div>
                            </TableCell>
                            <TableCell>
                                <div className="font-bold text-lg">Ngày sinh </div>
                            </TableCell>
                            <TableCell>
                                <div className="font-bold text-lg">Điểm số </div>
                            </TableCell>
                            <TableCell>
                                 <div className="font-bold text-lg ">Ngày tạo </div>
                            </TableCell>
                            <TableCell>
                                <div className="font-bold text-lg">Trạng thái</div>
                            </TableCell>
                            <TableCell>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <TextField className="" id="outlined-basic" label="Full Name " variant="standard" onChange={ handleNameChange} />
                            </TableCell>
                            <TableCell>
                                <TextField className="" id="outlined-basic" label="Email" variant="standard" onChange={handleEmailChange} />
                            </TableCell>

                            <TableCell>
                                <TextField className="" id="outlined-basic" label="Phone" variant="standard" onChange={handlePhoneChange} />
                            </TableCell>
                            <TableCell>
                                <TextField className="" id="outlined-basic" label="DateOfBirth" variant="standard" onChange={handleDobChange} />
                            </TableCell>
                            <TableCell>
                                <TextField className="w-16" id="outlined-basic" label="From" variant="standard" onChange={handleLowerPointChange} />
                                <TextField className="w-16" id="outlined-basic" label="To" variant="standard" onChange={handleUpperPointChange} />
                            </TableCell>

                            <TableCell>
                                <TextField className="w-16" id="outlined-basic" label="Ngày tạo" variant="standard" onChange={handleUpperCreateChange} />
                            </TableCell>
                            <TableCell>
                                <TextField className="text-left" fullWidth select label="Status" variant="filled" defaultValue="All" onChange={handleStatusChange}>
                                    {status.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                <TableBody>
                {users.map((user) => (
                    <>
                    <TableRow >
                            <TableCell>
                                <div className="">
                                    <img
                                        className="w-16 h-16"
                                        src={user.Picture}
                                    />
                                    <div className="text-lg">{user.Name}</div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="truncate text-lg">{user.Email}</div>
                            </TableCell>
                            <TableCell>
                                <div className="text-lg">{ user.PhoneNumber}</div>
                            </TableCell>
                            <TableCell>
                                <div className="text-lg">{ user.DateOfBirth ? user.DateOfBirth.substr(0,10) : ""}</div>
                            </TableCell>
                            <TableCell>
                                    <div className="text-lg">{user.Point}</div>
                            </TableCell>
                            <TableCell>
                                <div className="text-lg">{user.CreatedAt ? user.CreatedAt.substr(0, 10) : ""} </div>
                            </TableCell>
                            <TableCell>
                                <div className="text-lg">{user.Status}</div>
                            </TableCell>            
                            <TableCell>
                                <Popup
                                    trigger={
                                        <button><SettingsIcon fontSize="large"/></button>
                                    }
                                    position="right center"
                                    closeOnDocumentClick={false}
                                    closeOnEscape={false}
                                    modal
                                    onOpen={() => handleChange(user.Status, user.ReasonBlocked, user.Role)}
                                >
                                    {(close) => (
                                        <div className="p-4">
                                            <div className="text-xl font-bold mb-8 mt-8">CẬP NHẬT VAI TRÒ</div>
                                            <div>
                                                <TextField className="text-left w-1/2" select label="Vai trò" variant="filled" defaultValue={user.Role} onChange={handleRole}>
                                                    {roles.map((role) => (
                                                        <MenuItem key={role} value={role.value}>{role.label }</MenuItem>
                                                    )) }
                                                </TextField>
                                            </div>
                                            <hr />

                                            <div className="text-xl font-bold mb-8 mt-8">CẬP NHẬT TRẠNG THÁI</div>
                                            <div>
                                                <TextField className="text-left w-1/2" select label="Trạng thái" variant="filled" defaultValue={user.Status} onChange={handleStatus}>
                                                    <MenuItem value="Active">Active</MenuItem>
                                                    <MenuItem value="Inactive">Inactive</MenuItem>
                                                </TextField>
                                            </div>
                                            {ban == "Inactive" && (
                                                <div>
                                                    <TextField className="text-left" fullWidth variant="standard"
                                                        label="Lí do vô hiệu hóa tài khoản này"
                                                        multiline rows={6}
                                                        onChange={handleReasoon}
                                                        defaultValue={reason}
                                                    >
                                                    </TextField>
                                                </div>
                                            )}

                                            <div className="flex justify-end">
                                                <Button variant="outlined" onClick={close}>Cancel</Button>
                                                <Button variant="outlined" onClick={() => handleOk(user.Id, close)}>OK</Button>
                                            </div>
                                        </div>
                                    )}

                                </Popup>             
                            </TableCell>
                        </TableRow >
                </>
                ))}
                        </TableBody>

                </Table>

            </TableContainer>
            <div className="flex justify-center my-4">
                {pageList.map((pg, index) => (
                    <td key={index}>
                        <div className="items-center">
                            <Button variant={index + 1 === page ? 'contained' : 'outlined'} onClick={() => handleSwitchPage(index + 1)}>
                                {index + 1}
                            </Button>
                        </div>
                    </td>
                ))}
            </div>
        </div>
    )
}
