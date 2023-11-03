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
    const [tmpDescription, setTempDescription] = useState('')
    const [selectedImage, setSelectedImage] = useState(null)
    // const [selectedComponents, setSelectedComponents] = useState([])

    const handleNameChange = (event) => {
        setTempName(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setTempDescription(event.target.value)
    }
    
    const componentType = ["Móc", "Khung", "Nan", "Nắp", "Đáy", "Bình nước"]
    const initialSelectedComponents = componentType.map(type => ({
        type,
        data: null
    }));
    const [selectedComponents, setSelectedComponents] = useState(initialSelectedComponents);
    
    const handleSelectedComponentChange = (event, componentType) => {
        const selectedComponentData = components.find((component) => component.ID === event.target.value);
        setSelectedComponents((prevSelectedComponents) => {
            const updatedSelectedComponents = [...prevSelectedComponents];
            const existingIndex = updatedSelectedComponents.findIndex((comp) => comp.type === componentType);

            if (existingIndex !== -1) {
                updatedSelectedComponents[existingIndex] = {
                    type: componentType,
                    data: selectedComponentData,
                };
            } else {
                updatedSelectedComponents.push({
                    type: componentType,
                    data: selectedComponentData,
                });
            }
            return updatedSelectedComponents;
        });
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

    function calculateTotalPrice(selectedComponents) {
        let total = 0;
        selectedComponents.forEach((selectedComponent) => {
            total += selectedComponent.data?.Price;
        });
        return total;
    }
    const total = calculateTotalPrice(selectedComponents);


    useEffect(() => {
        fetchCategories()
    }, [])

    const defaultImageClass = 'h-64 w-64 m-2 transition-transform transform-gpu rounded-lg'
    const selectedImageClass = 'h-52 w-52 m-2 hover:scale-105 border-2 border-blue-500'

    const sortedSelectedComponents = selectedComponents.sort((a, b) => {
        return componentType.indexOf(a.type) - componentType.indexOf(b.type);
    });

    const handleRemoveComponent = (componentType) => {
        setSelectedComponents((prevSelectedComponents) => {
            const updatedSelectedComponents = prevSelectedComponents.map((comp) => {
                if (comp.type === componentType) {
                    return { type: componentType, data: null }; // Clear data in the row
                }
                return comp;
            });
            return updatedSelectedComponents;
        });
    };
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
                    <div className="grid grid-cols-4 place-items-center">
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
                                        <img className="max-h-52 mx-auto" src={category.imageUrl} alt="" />
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
                                <div className="w-full pt-4 pl-4 h-20">
                                    <TextField helperText={`Đặt tên cho sản phẩm`} fullWidth label="Tên sản phẩm" variant="standard" onChange={handleNameChange} value={tmpName} />
                                </div>
                                {
                                    componentType.map(type => {
                                        return (
                                            <div className="w-full h-24 flex place-content-between">
                                                <div className="w-72 pl-4">
                                                    <TextField
                                                        fullWidth
                                                        select
                                                        helperText={`Chọn ${type.toLowerCase()}`}
                                                        label={type}
                                                        variant="filled"
                                                        onChange={(event) => handleSelectedComponentChange(event, type)}
                                                    >
                                                        {components.map((component) => {
                                                            if (component.Type === type) {
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
                                                        <ClearIcon onClick={() => handleRemoveComponent(type)}/>
                                                    </IconButton>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className="w-full flex place-content-between">
                                    <div className="w-72 pl-4">
                                        {/* <TextField
                                            fullWidth
                                            select
                                            label="Size"
                                            helperText="Kích thước"
                                            variant="filled"
                                            disabled
                                        >
                                            {categories.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </TextField> */}
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
                                        {sortedSelectedComponents.map((selectedComponent, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{selectedComponent.type}</TableCell>
                                                <TableCell>
                                                    <div className="w-20 h-20">
                                                        <img
                                                            src={selectedComponent.data?.Picture}
                                                            alt=""
                                                        />
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div>{selectedComponent.data?.Description || ''}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div>{selectedComponent.data?.ProductionTime || 'N/A'}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div>{selectedComponent.data?.Price.toLocaleString('vi', { style: 'currency', currency: 'VND' }) || ''}</div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div className=" flex mx-4 place-content-between">
                                <div className="w-2/4 ">
                                    <TextField
                                        fullWidth
                                        label={'Ghi chú thêm cho cửa hàng'}
                                        variant="standard"
                                        onChange={handleDescriptionChange}
                                        value={tmpDescription}
                                        multiline
                                        rows={6}
                                    />
                                </div>
                                <div className="mt-8 w-3/8">
                                    <div className="flex place-content-between">
                                        <div className=" font-bold">Thời gian hoàn thành dự kiến:</div>
                                    </div>
                                    <div className="flex place-content-between">
                                        <div className=" font-bold">Tổng cộng:</div>

                                    </div>
                                </div>
                                <div className="mt-8 w-1/8">
                                    <div className="flex place-content-between">
                                        <div className=" font-bold">N/A</div>
                                        {/* fetch */}

                                    </div>
                                    <div className="flex place-content-between">
                                        <div className=" font-bold">{total.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                                    </div>
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
