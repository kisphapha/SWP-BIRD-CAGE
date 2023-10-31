import React, { useState, useEffect } from 'react'
import CategoryNav from '../../components/features/CategoryNav'
import MenuItem from '@mui/material/MenuItem'
import { UserProvider } from '../../UserContext'
import Header from '../../components/common/Header'
import DeleteIcon from '@mui/icons-material/Delete'
import ClearIcon from '@mui/icons-material/Clear'
import Navbar from '../../components/common/Navbar'
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import axios from 'axios'

export default function Custom() {
    const [categories, setCategories] = useState([])
    const [components, setComponents] = useState([])
    const [tmpName, setTempName] = useState('')
    const [tmpMaterial, setMaterial] = useState('')
    const [tmpCate, setCate] = useState('')
    const [tmpDescription, setTempDescription] = useState('')
    const [selectedImage, setSelectedImage] = useState(null)
    const [componentType, setComponentType] = useState('')
    const [selectedComponent, setSelectedComponent] = useState(null)

    const handleCategoryChange = (event) => {
        setCate(event.target.value)
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

    const handleComponentTypeChange = (event) => {
        setComponentType(event.target.value)
    }

    const handleSelectedComponentChange = (event) => {
        const selectedComponentData = components.find((component) => component.ID === event.target.value)
        setSelectedComponent(selectedComponentData)
    }

    async function fetchCategories() {
        const response = await axios.get('http://localhost:3000/category/')
        if (response.data) {
            setCategories(response.data)
        }
    }

    async function fetchComponents(categoryId) {
        const response = await axios.get('http://localhost:3000/component/getAllComponent', {
            params: {
                CateID: categoryId
            }
        })
        if (response.data) {
            setComponents(response.data)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const defaultImageClass = 'h-64 w-64 m-2 transition-transform transform-gpu rounded-lg'
    const selectedImageClass = 'h-52 w-52 m-2 hover:scale-105 border-2 border-blue-500'

    return (
        <form action="">
            <div className="w-full">
                <UserProvider>
                    <Header />
                    <Navbar />
                </UserProvider>
                <CategoryNav parents={[{ name: 'Trang chủ', link: '/' }]} current="Lồng tùy chỉnh" />
                <div className="flex-row bg-slate-50 my-8 mx-32">
                    <div className="px-8 py-4 font-bold text-red-500"> Chọn kiểu lồng</div>
                    <div className="grid grid-cols-4 place-items-center h">
                        {categories.map((category, index) => {
                            if (category.Allow_customize === true) {
                                return (
                                    <div
                                        className={selectedImage === index + 1 ? selectedImageClass : defaultImageClass}
                                        onClick={() => {
                                            fetchComponents(category.id.trim())
                                            setSelectedImage(index + 1)
                                        }}
                                        key={index}
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
                    <hr className="border border-slate-300  mx-4" />

                    <div className="flex ">
                        <div className="content-center w-1/4">
                            <div className="m-4 font-bold">Các thành phần của lồng </div>
                            <div className="w-full mx-4  flex-row space-y-4 pb-8 mb-16 bg-white">
                                <div className="w-full pl-4">
                                    <TextField fullWidth label="Tên sản phẩm" variant="standard" onChange={handleNameChange} value={tmpName} />
                                </div>
                                <div className="w-full flex place-content-between">
                                    <div className="w-72 pl-4">
                                        <TextField
                                            fullWidth
                                            select
                                            label="Móc"
                                            helperText="Chọn móc"
                                            variant="filled"
                                            onChange={handleSelectedComponentChange}
                                        >
                                            {components.map((component) => {
                                                if (component.Type === 'Móc') {
                                                    return (
                                                        <MenuItem key={component.ID} value={component.ID}>
                                                            {component.Name}
                                                        </MenuItem>
                                                    )
                                                }
                                            })}
                                        </TextField>
                                    </div>
                                    <div className="py-2">
                                        <IconButton>
                                            <ClearIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                <div className="w-full flex place-content-between">
                                    <div className="w-72 pl-4">
                                        <TextField
                                            fullWidth
                                            select
                                            label="Khung"
                                            helperText="Chọn khung"
                                            variant="filled"
                                            onChange={handleSelectedComponentChange}
                                        >
                                            {components.map((component) => {
                                                if (component.Type === 'Khung') {
                                                    return (
                                                        <MenuItem key={component.ID} value={component.ID}>
                                                            {component.Name}
                                                        </MenuItem>
                                                    )
                                                }
                                            })}
                                        </TextField>
                                    </div>
                                    <div className="py-2">
                                        <IconButton>
                                            <ClearIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                <div className="w-full flex place-content-between">
                                    <div className="w-72 pl-4">
                                        <TextField
                                            fullWidth
                                            select
                                            label="Nan"
                                            helperText="Chọn nan"
                                            variant="filled"
                                            onChange={handleSelectedComponentChange}
                                        >
                                            {components.map((component) => {
                                                if (component.Type === 'Nan') {
                                                    return (
                                                        <MenuItem key={component.ID} value={component.ID}>
                                                            {component.Name}
                                                        </MenuItem>
                                                    )
                                                }
                                            })}
                                        </TextField>
                                    </div>
                                    <div className="py-2">
                                        <IconButton>
                                            <ClearIcon />
                                        </IconButton>
                                    </div>
                                </div>

                                <div className="w-full flex place-content-between">
                                    <div className="w-72 pl-4">
                                        <TextField
                                            fullWidth
                                            select
                                            label="Nắp"
                                            helperText="Chọn nắp"
                                            variant="filled"
                                            onChange={handleSelectedComponentChange}
                                        >
                                            {components.map((component) => {
                                                if (component.Type === 'Nắp') {
                                                    return (
                                                        <MenuItem key={component.ID} value={component.ID}>
                                                            {component.Name}
                                                        </MenuItem>
                                                    )
                                                }
                                            })}
                                        </TextField>
                                    </div>
                                    <div className="py-2">
                                        <IconButton>
                                            <ClearIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                <div className="w-full flex place-content-between">
                                    <div className="w-72 pl-4">
                                        <TextField
                                            fullWidth
                                            select
                                            label="Đáy"
                                            helperText="Chọn đáy "
                                            variant="filled"
                                            onChange={handleSelectedComponentChange}
                                        >
                                            {components.map((component) => {
                                                if (component.Type === 'Đáy') {
                                                    return (
                                                        <MenuItem key={component.ID} value={component.ID}>
                                                            {component.Name}
                                                        </MenuItem>
                                                    )
                                                }
                                            })}
                                        </TextField>
                                    </div>
                                    <div className="py-2">
                                        <IconButton>
                                            <ClearIcon />
                                        </IconButton>
                                    </div>
                                </div>

                                <div className=" flex place-content-between">
                                    <div className="w-72 pl-4">
                                        <TextField
                                            fullWidth
                                            select
                                            label="Bình nước"
                                            helperText="Chọn bình nước"
                                            variant="filled"
                                            onChange={handleSelectedComponentChange}
                                        >
                                            {components.map((component) => {
                                                if (component.Type === 'Bình nước') {
                                                    return (
                                                        <MenuItem key={component.ID} value={component.ID}>
                                                            {component.Name}
                                                        </MenuItem>
                                                    )
                                                }
                                            })}
                                        </TextField>
                                    </div>
                                    <div className="py-2">
                                        <IconButton>
                                            <ClearIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                <div className="w-full flex place-content-between">
                                    <div className="w-72 pl-4">
                                        <TextField
                                            fullWidth
                                            select
                                            label="Size"
                                            helperText="Kích thước"
                                            variant="filled"
                                            onChange={handleCategoryChange}
                                            disabled
                                        >
                                            {categories.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                    <div className="py-2">
                                        <IconButton>
                                            <ClearIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full m-4 px-2">
                            <div className="font-bold mx-4">Cấu hình lồng của bạn </div>
                            <TableContainer className="m-4" component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Thành phần </TableCell>
                                            <TableCell>Hình ảnh </TableCell>
                                            <TableCell>Mô tả </TableCell>
                                            <TableCell>Thời Gian chế tạo</TableCell>
                                            <TableCell>Giá tiền </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Móc </TableCell>
                                            <TableCell>
                                                <div className="w-20 h-20">
                                                    <img
                                                        src={selectedComponent?.Image || 'https://mengjinblog.files.wordpress.com/2021/06/17.jpg'}
                                                        alt=""
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>Mô tả: {selectedComponent?.Description || 'No description available'}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div>Thời gian chế tạo: {selectedComponent?.ProductionTime || 'N/A'}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div>Giá tiền: {selectedComponent?.Price || 'N/A'}</div>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Khung </TableCell>
                                            <TableCell>
                                                <div className="w-20 h-20">
                                                    <img
                                                        src={selectedComponent?.Image || 'https://mengjinblog.files.wordpress.com/2021/06/17.jpg'}
                                                        alt=""
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>Mô tả: {selectedComponent?.Description || 'No description available'}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div>Thời gian chế tạo: {selectedComponent?.ProductionTime || 'N/A'}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div>Giá tiền: {selectedComponent?.Price || 'N/A'}</div>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Nan </TableCell>
                                            <TableCell>
                                                <div className="w-20 h-20">
                                                    <img
                                                        src={selectedComponent?.Image || 'https://mengjinblog.files.wordpress.com/2021/06/17.jpg'}
                                                        alt=""
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>Mô tả: {selectedComponent?.Description || 'No description available'}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div>Thời gian chế tạo: {selectedComponent?.ProductionTime || 'N/A'}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div>Giá tiền: {selectedComponent?.Price || 'N/A'}</div>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Nắp</TableCell>
                                            <TableCell>
                                                <div className="w-20 h-20">
                                                    <img
                                                        src={selectedComponent?.Image || 'https://mengjinblog.files.wordpress.com/2021/06/17.jpg'}
                                                        alt=""
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>Mô tả: {selectedComponent?.Description || 'No description available'}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div>Thời gian chế tạo: {selectedComponent?.ProductionTime || 'N/A'}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div>Giá tiền: {selectedComponent?.Price || 'N/A'}</div>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Đáy </TableCell>
                                            <TableCell>
                                                <div className="w-20 h-20">
                                                    <img
                                                        src={selectedComponent?.Image || 'https://mengjinblog.files.wordpress.com/2021/06/17.jpg'}
                                                        alt=""
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>Mô tả: {selectedComponent?.Description || 'No description available'}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div>Thời gian chế tạo: {selectedComponent?.ProductionTime || 'N/A'}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div>Giá tiền: {selectedComponent?.Price || 'N/A'}</div>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Bình nước </TableCell>
                                            <TableCell>
                                                <div className="w-20 h-20">
                                                    <img
                                                        src={selectedComponent?.Image || 'https://mengjinblog.files.wordpress.com/2021/06/17.jpg'}
                                                        alt=""
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>Mô tả: {selectedComponent?.Description || 'No description available'}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div>Thời gian chế tạo: {selectedComponent?.ProductionTime || 'N/A'}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div>Giá tiền: {selectedComponent?.Price || 'N/A'}</div>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div className=" flex mx-4 place-content-between">
                                <div className="w-2/4 ">
                                    <TextField
                                        fullWidth
                                        label={'Chú thích'}
                                        variant="standard"
                                        onChange={handleDescriptionChange}
                                        value={tmpDescription}
                                        multiline
                                        rows={6}
                                    />
                                </div>
                                <div className="mt-8 w-1/4">
                                    <div className="flex place-content-between">
                                        <div className=" font-bold">Thời gian hoàn thành dự kiến:</div>
                                        {/* fetch */}
                                        {/* <div>{...}</div> */}
                                    </div>
                                    <div className="flex place-content-between">
                                        <div className=" font-bold">Tổng cộng:</div>
                                        {/* fetch */}
                                        {/* <div> {...}</div> */}
                                    </div>
                                    {/* <div className="my-8 text-center"></div> */}
                                </div>
                            </div>
                            <div className="text-right">
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
