import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Address.css'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import AddressCard from '../features/AddressCard'
import { Button, TextField } from '@mui/material'

const Address = (props) => {
    const [addressList, setAddressList] = useState([])

    const [cityList, setCityList] = useState([])
    const [districtList, setDistrictList] = useState([])
    const [wardList, setWardList] = useState([])

    const [tinhTP, setTinhTP] = useState('')
    const [quanHuyen, setQuanHuyen] = useState('')
    const [phuongXa, setPhuongXa] = useState('')
    const [soNha, setSoNha] = useState('')

    const [districtIdx, setDistrictIdx] = useState(0)
    const [cityIdx, setCityIdx] = useState(0)

    const navigate = useNavigate()
    const popupRef = useRef()

    const host = 'https://provinces.open-api.vn/api/?depth=3'

    async function fetchAddresses() {
        const response = await axios.get(`http://localhost:3000/address/${props.user.Id}`)
        setAddressList(response.data)
    }

    async function fetchCity() {
        const response = await axios.get(host)
        setCityList(response.data)
    }

    async function fetchDistrict(city_code) {
        const response = await axios.get(host)
        setDistrictList(response.data[city_code].districts)
    }

    async function fetchWard(city_code, district_code) {
        const response = await axios.get(host)
        setWardList(response.data[city_code].districts[district_code].wards)
    }

    async function handleSubmit(event, close) {
        if (tinhTP != 'Chọn tỉnh thành' && quanHuyen != 'Chọn quận huyện' && phuongXa != 'Chọn phường xã' && soNha != '') {
            await axios.post(
                `http://localhost:3000/address/new?city=${tinhTP}&district=${quanHuyen}&ward=${phuongXa}&location=${soNha}&userid=${props.user.Id}`
            )
            alert('ADdress added')
            fetchAddresses()
            close()
        } else {
            alert('Xin vui lòng điền đầy đủ thông tin')
        }
    }
    function handleClose() {
        setDistrictList([])
        setWardList([])
        setTinhTP('Chọn tỉnh thành')
        setQuanHuyen('Chọn quận huyện')
        setPhuongXa('Chọn phường xã')
        setSoNha('')
    }

    useEffect(() => {
        fetchCity()
        fetchAddresses()
    }, [])
    //File có popup dùng để create
    return (
        <div>
            <div className="address-header">
                <h1>My Address</h1>
                <Popup
                    trigger={
                        <button type="button" className="add-btn">
                            + Add new address
                        </button>
                    }
                    position="right center"
                    modal
                    ref={popupRef} // Assign the ref to the Popup component
                    onClose={handleClose} // Call the handleClose method when the Popup is closed
                >
                    {(close) => (
                        <div className="popup-address">
                            <h1>Thêm địa chỉ</h1>
                            <TextField
                                select
                                label="Chọn tỉnh thành"
                                className="location"
                                id="city"
                                SelectProps={{
                                    native: true
                                }}
                                onChange={(event) => {
                                    setCityIdx(event.target.selectedIndex - 1)
                                    fetchDistrict(event.target.selectedIndex - 1)
                                    setTinhTP(event.target.value)
                                }}
                            >
                                <option value="" selected>
                                    Chọn tỉnh thành
                                </option>
                                {cityList.map((city, index) => (
                                    <option key={city.code} value={city.name}>
                                        {city.name}
                                    </option>
                                ))}
                            </TextField>
                            <TextField
                                select
                                label="Chọn quận huyện"
                                className="location"
                                id="district"
                                SelectProps={{
                                    native: true
                                }}
                                onChange={(event) => {
                                    setDistrictIdx(event.target.selectedIndex - 1)
                                    fetchWard(cityIdx, event.target.selectedIndex - 1)
                                    setQuanHuyen(event.target.value)
                                }}
                            >
                                <option value="" selected>
                                    Chọn quận huyện
                                </option>
                                {districtList.map((district, index) => (
                                    <option key={district.code} value={district.name}>
                                        {district.name}
                                    </option>
                                ))}
                            </TextField>

                            <TextField
                                select
                                label="Chọn phường xã"
                                className="location"
                                id="ward"
                                SelectProps={{
                                    native: true
                                }}
                                onChange={(event) => {
                                    setPhuongXa(event.target.value)
                                }}
                            >
                                <option value="" selected>
                                    Chọn phường xã
                                </option>
                                {wardList.map((ward, index) => (
                                    <option key={ward.code} value={ward.name}>
                                        {ward.name}
                                    </option>
                                ))}
                            </TextField>
                            <TextField
                                className="location"
                                type="text"
                                placeholder="Số nhà"
                                onChange={(event) => {
                                    setSoNha(event.target.value)
                                }}
                            ></TextField>
                            <div className="buttons">
                                {/* <button className="decision" onClick={close}></button> */}
                                <Button variant="contained" onClick={close}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={(event) => {
                                        handleSubmit(event, close)
                                    }}
                                >
                                    Ok
                                </Button>
                            </div>
                        </div>
                    )}
                </Popup>
            </div>
            <hr />
            <div className="address-list">
                <h1>Address</h1>
                <table>
                    {addressList.map((address) => (
                        <tr key={address}>
                            <AddressCard
                                id={address.ID}
                                street={address.SoNha}
                                city={address.TinhTP}
                                district={address.QuanHuyen}
                                ward={address.PhuongXa}
                                fetchAddress={fetchAddresses}
                            />
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default Address
