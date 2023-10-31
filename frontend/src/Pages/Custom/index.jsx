import React, { useState, useEffect } from 'react';
import CategoryNav from '../../components/features/CategoryNav';
import MenuItem from '@mui/material/MenuItem';
import { UserProvider } from '../../UserContext';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

export default function Custom() {
    const [categories, setCategories] = useState([]);
    const [components, setComponents] = useState([]);
    const [tmpName, setTempName] = useState('');
    const [tmpDescription, setTempDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedComponent, setSelectedComponent] = useState(null);

    const handleCategoryChange = (event) => {
        setCate(event.target.value);
    };

    const handleNameChange = (event) => {
        setTempName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setTempDescription(event.target.value);
    };

    const handleSelectedComponentChange = (event) => {
        const selectedComponentData = components.find((component) => component.ID === event.target.value);
        setSelectedComponent(selectedComponentData);
    };

    async function fetchCategories() {
        const response = await axios.get('http://localhost:3000/category/');
        if (response.data) {
            setCategories(response.data);
        }
    }

    async function fetchComponents(categoryId) {
        const response = await axios.get('http://localhost:3000/component/getAllComponent', {
            params: {
                "CateID": categoryId 
            }
        });
        if (response.data) {
            setComponents(response.data);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const defaultImageClass = 'h-64 w-64 m-2 transition-transform transform-gpu rounded-lg';
    const selectedImageClass = 'h-52 w-52 m-2 hover:scale-105 border-2 border-blue-500';


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
                                );
                            }
                        })}
                    </div>
                    <div className="flex my-12 place-content-between m-8">
                        <div className="w-2/5 mx-4 pr-20 flex-row space-y-4 pb-8 mb-16">
                            <div className="w-3/4">
                                <TextField fullWidth label="Tên sản phẩm" variant="standard" onChange={handleNameChange} value={tmpName} />
                            </div>
                            <TextField
                                fullWidth
                                label="Móc"
                                helperText="Chọn móc"
                                variant="filled"
                                onChange={handleSelectedComponentChange}
                            >
                                {components.map((component) => {
                                    if (component.Type === "Móc") {
                                        return (
                                            <MenuItem key={component.ID} value={component.ID}>
                                                {component.Name}
                                            </MenuItem>
                                        )
                                    }
                                })}
                            </TextField>
                            <TextField
                                fullWidth
                                select
                                label="Khung"
                                helperText="Chọn khung"
                                variant="filled"
                                onChange={handleSelectedComponentChange}
                            >
                                {components.map((component) => {
                                    if (component.Type === "Khung") {
                                        return (
                                            <MenuItem key={component.ID} value={component.ID}>
                                                {component.Name}
                                            </MenuItem>
                                        )
                                    }
                                })}
                            </TextField>
                            <TextField
                                fullWidth
                                select
                                label="Nan"
                                helperText="Chọn nan"
                                variant="filled"
                                onChange={handleSelectedComponentChange}
                            >
                                {components.map((component) => {
                                    if (component.Type === "Nan") {
                                        return (
                                            <MenuItem key={component.ID} value={component.ID}>
                                                {component.Name}
                                            </MenuItem>
                                        )
                                    }
                                })}
                            </TextField>
                            <TextField
                                fullWidth
                                select
                                label="Nắp"
                                helperText="Chọn nắp"
                                variant="filled"
                                onChange={handleSelectedComponentChange}
                            >
                                {components.map((component) => {
                                    if (component.Type === "Nắp") {
                                        return (
                                            <MenuItem key={component.ID} value={component.ID}>
                                                {component.Name}
                                            </MenuItem>
                                        )
                                    }
                                })}
                            </TextField>
                            <TextField
                                fullWidth
                                select
                                label="Đáy"
                                helperText="Chọn đáy "
                                variant="filled"
                                onChange={handleSelectedComponentChange}
                            >
                                {components.map((component) => {
                                    if (component.Type === "Đáy") {
                                        return (
                                            <MenuItem key={component.ID} value={component.ID}>
                                                {component.Name}
                                            </MenuItem>
                                        )
                                    }
                                })}
                            </TextField>
                        </div>
                        <div className="w-2/5 mr-40">
                            <div className="my-4 mt-12">
                                <TextField
                                    fullWidth
                                    select
                                    label="Bình nước"
                                    helperText="Chọn bình nước"
                                    variant="filled"
                                    onChange={handleSelectedComponentChange}
                                >
                                    {components.map((component) => {
                                        if (component.Type === "Bình nước") {
                                            return (
                                                <MenuItem key={component.ID} value={component.ID}>
                                                    {component.Name}
                                                </MenuItem>
                                            )
                                        }
                                    })}
                                </TextField>
                            </div>
                            <div className="my-4 w-full">
                                <TextField
                                    fullWidth
                                    select
                                    label="Size"
                                    helperText="Kích thước"
                                    variant="filled"
                                    onChange={handleCategoryChange}
                                >
                                    {categories.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <div className="flex w-full">
                                    <div className="w-20 h-20">
                                        <img src={selectedComponent?.Image || 'https://mengjinblog.files.wordpress.com/2021/06/17.jpg'} alt="" />
                                    </div>
                                    <div className="w-full ml-4">
                                        <div>Mô tả: {selectedComponent?.Description || 'No description available'}</div>
                                        <div className="flex place-content-between">
                                            <div>Thời gian chế tạo: {selectedComponent?.ProductionTime || 'N/A'}</div>
                                            <div>Giá tiền: {selectedComponent?.Price || 'N/A'}</div>
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
    );
}
