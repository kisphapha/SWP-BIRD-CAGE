/* eslint-disable react/jsx-key */
import { React, useState, useEffect } from 'react'
import CategoryNav from '../../components/features/CategoryNav'
import MenuItem from '@mui/material/MenuItem'
import { UserProvider } from '../../UserContext'
import Header from '../../components/common/Header'
import Navbar from '../../components/common/Navbar'
import { Button, Grid, RadioGroup, TextField, ToggleButtonGroup } from '@mui/material'
import axios from 'axios'
export default function Custom() {
    const [categories, setCategories] = useState([])
    const [tmpName, setTempName] = useState('')
    const [tmpMaterial, setMaterial] = useState('')
    const [tmpCate, setCate] = useState('')
    const [tmpDescription, setTempDescription] = useState('')
    const [selectedImage, setSelectedImage] = useState(null)

    const handleCategoryChange = (event) => {
        setCategories(event.target.value.trim())
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

    const defaultImageClass = 'h-64 w-64 m-2 transition-transform transform-gpu rounded-lg'
    const selectedImageClass = 'h-52<w-52></w-52> <w-52></w-52> m-2 hover:scale-105 border-2 border-blue-500'

    return (
        <form action="">
            <div className="w-full">
                <UserProvider>
                    <Header />
                    <Navbar />
                </UserProvider>
                <CategoryNav parents={[{ name: 'Trang chủ', link: '/' }]} current="Lồng tùy chỉnh"></CategoryNav>
                <div className="flex-row bg-slate-50 my-8 mx-32">
                    <div className="px-8 py-4 font-bold text-red-500"> Chọn kiểu lồng</div>
                    <div className="grid grid-cols-4 place-items-center h">
                        {categories.map((category, index) => {
                            if (category.Allow_customize == true) {
                                return (
                                    <div
                                        className={selectedImage === index + 1 ? selectedImageClass : defaultImageClass}
                                        onClick={() => setSelectedImage(index + 1)}
                                    >
                                        <img className="max-h-52" src={category.imageUrl} alt="" />
                                        <div className="text-center">
                                            <h1 className="font-bold my-2">{category.name}</h1>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <div className="flex my-12 place-content-between m-8">
                        <div className="w-2/5 mx-4 pr-20 flex-row space-y-4 pb-8 mb-16">
                            <div className="w-3/4">
                                {/* <div>name</div> */}
                                <TextField fullWidth label={'Tên sản phẩm'} variant="standard" onChange={handleNameChange} value={tmpName} />
                            </div>

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
                                <TextField fullWidth select label="Size" helperText="Kích thước " variant="filled" onChange={handleCategoryChange}>
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
                            <div className=" my-4 w-full">
                                <TextField fullWidth select label="Size" helperText="Kích thước " variant="filled" onChange={handleCategoryChange}>
                                    {categories.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <div className="flex w-full">
                                    {/* <div className="w-20 h-20">
                                        <img src="https://mengjinblog.files.wordpress.com/2021/06/17.jpg" alt="" />
                                    </div> */}
                                    <div className="w-full ml-4">
                                        <div>Mô tả :Phù hợp chim ........</div>
                                        <div className="flex place-content-between">
                                            <div>40x60x80 </div>
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

                            <div>Tổng cộng:</div>
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
