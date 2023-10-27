import { React, useState, useEffect } from 'react'
import CategoryNav from '../../components/features/CategoryNav'
import MenuItem from '@mui/material/MenuItem'
import { UserProvider } from '../../UserContext'
import Header from '../../components/common/Header'
import Navbar from '../../components/common/Navbar'
import { Button, Grid, RadioGroup, TextField, ToggleButtonGroup } from '@mui/material'
import axios from 'axios'
import Radio from '@mui/material/Radio'
export default function Custom() {
    const [categories, setCategories] = useState([])
    const [tmpName, setTempName] = useState('')
    const [tmpMaterial, setMaterial] = useState('')
    const [tmpCate, setCate] = useState('')
    const [tmpDescription, setTempDescription] = useState('')

    const handleCategoryChange = (event) => {
        setCate(event.target.value.trim())
    }
    const handleNameChange = (event) => {
        setTempName(event.target.value)
    }
    const handleMaterialChange = (event) => {
        setMaterial(event.target.value)
    }
    const handleDescriptionChange = (event) => {
        setTempDescription(event.target.value)
    }
    //fetch
    async function fetchCategories() {
        const response = await axios.get('http://localhost:3000/category/')
        if (response.data) {
            setCategories(response.data)
        }
    }
    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <form action="">
            <div className="w-full">
                <UserProvider>
                    <Header />
                    <Navbar />
                </UserProvider>
                <CategoryNav parents={[{ name: 'Trang chủ', link: '/' }]} current="Lồng tùy chỉnh"></CategoryNav>

                <div className="flex-row bg-slate-50 my-8 mx-32">
                    <div>Chọn kiểu lồng</div>
                    {/* fetch category custom */}
                    <RadioGroup>
                        <div className="grid grid-cols-4 place-items-center">
                            <div>
                                <img className="h-40" src="https://mengjinblog.files.wordpress.com/2021/06/17.jpg" alt="" />
                                <div className="text-center">
                                    <Radio />
                                </div>
                            </div>
                            <div>
                                <img className="h-40" src="https://i2.ntcdntempv3.com/data/images/20857/441088/002-fix.jpg?data=nht" alt="" />
                                <div className="text-center">
                                    <Radio />
                                </div>
                            </div>
                            <div>
                                <img className="h-40" src="https://i2.ntcdntempv3.com/data/images/20857/441088/002-fix.jpg?data=nht" alt="" />
                                <div className="text-center">
                                    <Radio />
                                </div>
                            </div>
                            <div>
                                <img className="h-40" src="https://mengjinblog.files.wordpress.com/2021/06/17.jpg" alt="" />
                                <div className="text-center">
                                    <Radio />
                                </div>
                            </div>
                        </div>
                    </RadioGroup>
                    <div className="flex my-12 place-content-between m-8">
                        <div className="w-2/5 mx-4 pr-20 flex-row space-y-4">
                            <div className="w-3/4">
                                {/* <div>name</div> */}
                                <TextField fullWidth label={'Tên sản phẩm'} variant="standard" onChange={handleNameChange} value={tmpName} />
                            </div>
                            <div className="w-3/4">
                                {/* <div>material</div> */}
                                <TextField fullWidth label={'Chất Liệu'} variant="standard" onChange={handleMaterialChange} value={tmpMaterial} />
                            </div>
                            <TextField
                                fullWidth
                                select
                                label="Phân loại"
                                helperText="Chọn phân Loại"
                                variant="filled"
                                onChange={handleCategoryChange}
                            >
                                {categories.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField fullWidth select label="Móc" helperText="Chọn móc" variant="filled" onChange={handleCategoryChange}>
                                {categories.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField fullWidth select label="Khung" helperText="Chọn khung" variant="filled" onChange={handleCategoryChange}>
                                {categories.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField fullWidth select label="Nan" helperText="Chọn nan" variant="filled" onChange={handleCategoryChange}>
                                {categories.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField fullWidth select label="Nắp" helperText="Chọn nắp" variant="filled" onChange={handleCategoryChange}>
                                {categories.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                select
                                label="Bình nước"
                                helperText="Chọn bình nước"
                                variant="filled"
                                onChange={handleCategoryChange}
                            >
                                {categories.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField fullWidth select label="Đáy" helperText="Chọn đáy " variant="filled" onChange={handleCategoryChange}>
                                {categories.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className="w-2/5 mr-40 ">
                            <div className=" my-4 mt-12">
                                <TextField
                                    fullWidth
                                    select
                                    label="Bình nước"
                                    helperText="Chọn bình nước"
                                    variant="filled"
                                    onChange={handleCategoryChange}
                                >
                                    {categories.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className=" my-4 w-full">
                                <TextField fullWidth select label="Đáy" helperText="Chọn đáy " variant="filled" onChange={handleCategoryChange}>
                                    {categories.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <div className="flex w-full">
                                    <div className="w-20 h-20">
                                        <img src="https://mengjinblog.files.wordpress.com/2021/06/17.jpg" alt="" />
                                    </div>
                                    <div className="w-full ml-4">
                                        <div>Mô tả : ádasdasdasdsadasdsadasdas</div>
                                        <div className="flex place-content-between">
                                            <div>Thời gian chế tạo: </div>
                                            <div> Giá tiền: 3000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <TextField
                                fullWidth
                                label={'Mô tả'}
                                variant="standard"
                                onChange={handleDescriptionChange}
                                value={tmpDescription}
                                multiline
                                rows={6}
                            />

                            <div>Giá dự tính:</div>
                            <div>Thời gian hoàn thành dự kiến:</div>
                            <div className="my-8 text-center">
                                <Button variant="contained" className="">
                                    Đặt hàng
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
