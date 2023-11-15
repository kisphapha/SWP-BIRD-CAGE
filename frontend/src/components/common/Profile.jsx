/* eslint-disable react/no-unescaped-entities */
import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import { Button, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import './Profile.css'
import axios from 'axios'

const Profile = (props) => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [dob, setDob] = useState('')

    const [tempName, setTempName] = useState('')
    const [tempPhone, setTempPhone] = useState('')
    const [tempDob, setTempDob] = useState('')

    useEffect(() => {
        if (props.user) {
            setName(props.user.Name)
            setPhoneNumber(props.user.PhoneNumber)
            if (props.user.DateOfBirth) {
                setDob(props.user.DateOfBirth.substr(0, 10))
            }
        }
    }, [props.user])

    const handleNameChange = (event) => {
        setTempName(event.target.value)
    }

    const handlePhoneNumberChange = (event) => {
        setTempPhone(event.target.value)
    }

    const handleDOBChange = (value) => {
        const dateString = value.$y + '-' + (parseInt(value.$M) + 1) + '-' + value.$D
        console.log(dateString)
        setTempDob(dateString)
    }

    const handleSubmit = async () => {
        const _name = tempName ? tempName : name
        const _phone = tempPhone ? tempPhone : phoneNumber
        const _dob = tempDob ? tempDob : dob

        const response = await axios.get(
            'http://localhost:3000/users/update/?name=' + _name + '&email=' + props.user.Email + '&phone=' + _phone + '&dob=' + _dob
        )
        if (response.data) {
            sessionStorage.setItem('loginedUser', JSON.stringify(response.data))
            alert('User is updated')
        }
    }

    return (
        <div>
            <div className="form-header">
                <h1>Hồ sơ cá nhân</h1>
                <p>Quản lý hồ sơ của bạn để tăng độ tin cậy</p>
            </div>
            <hr />
            <div className="form-inner">
                {props.user != null && (
                    <table>
                        <tr>
                            <td>Tên</td>
                            <td>
                                <TextField
                                    fullWidth
                                    label={'Họ tên'}
                                    variant="standard"
                                    onChange={handleNameChange}
                                    value={tempName ? tempName : name}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>
                                <TextField fullWidth label={'Email'} variant="standard" value={props.user.Email} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>SĐT</td>
                            <td>
                                <TextField
                                    fullWidth
                                    label={'Số điện thoại'}
                                    variant="standard"
                                    onChange={handlePhoneNumberChange}
                                    value={tempPhone ? tempPhone : phoneNumber}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Ngày sinh</td>
                            <td>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Ngày sinh" value={dayjs(dob)} onChange={(value) => handleDOBChange(value)} />
                                </LocalizationProvider>

                                {/*<input className="props.user-input" type="date" value={tempDob ? tempDob : dob}*/}
                                {/*     />*/}
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <Button variant="contained" onClick={() => handleSubmit()}>
                                    SAVE
                                </Button>
                            </td>
                        </tr>
                    </table>
                )}
            </div>
        </div>
    )
}

export default Profile
