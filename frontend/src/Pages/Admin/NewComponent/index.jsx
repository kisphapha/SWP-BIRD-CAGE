import { ButtonBase, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Checkbox } from '@mui/material'
import { React, useState, useEffect, useRef } from 'react'
import { Button } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import axios from 'axios'
import ImageUploader from '../../../components/features/ImageUploader/index'
export default function NewComponent() {
    const [categories, setCategories] = useState([])
    const [images, setImages] = useState([])
    const maxNumber = 6

    //temp varible
    const [tmpName, setTempName] = useState('')
    const [tmpColor, setColor] = useState('')
    const [tmpDescription, setTempDescription] = useState('')
    const [tmpPrice, setTempPrice] = useState(0)
    const [tmpMaterial, setMaterial] = useState('')
    const [tmpStock, setStock] = useState('')
    const [tmpUrls, setUrls] = useState([])
    const [tmpCate, setCate] = useState('')
    const [tmpType, setType] = useState([])
    const [tmpStatus, setStatus] = useState('')
    const [appliedFor, setAppliedFor] = useState([])

    async function fetchCategories() {
        const response = await axios.get('http://localhost:3000/category/')
        if (response.data) {
            setCategories(response.data)
        }
    }
    async function fetchType() {
        setType(['Móc', 'Nắp', 'Đáy', 'Nan', 'Bình nước', 'Khung', 'Cửa'])
    }

    async function handleAdd(event) {
        const json = {
            Name: tmpName,
            Category: tmpCate,
            material: tmpMaterial,
            Color: tmpColor,
            Description: tmpDescription,
            Price: tmpPrice,
            Stock: tmpStock,
            Status: tmpStatus,
            Urls: tmpUrls[0],
            Application: appliedFor
        }
        if (json.Stock && json.Name && json.Category && json.Price && json.Status) {
            await axios.post(`http://localhost:3000/component/new`, json)
            alert('Đã thêm sản phẩm')
        } else {
            alert('Vui lòng điền đủ thông tin')
        }
    }

    const handleApplyForChange = (event) => {
        const newCate = event.target.value
        const isCategoryExists = appliedFor.includes(newCate)

        if (isCategoryExists) {
            setAppliedFor(appliedFor.filter((cate) => cate !== newCate))
        } else {
            setAppliedFor([...appliedFor, newCate])
        }
    }

    const handleNameChange = (event) => {
        setTempName(event.target.value)
    }
    const handleColorChange = (event) => {
        setColor(event.target.value)
    }
    const handlePriceChange = (event) => {
        setTempPrice(event.target.value)
    }
    const handleDescriptionChange = (event) => {
        setTempDescription(event.target.value)
    }
    const handleMaterialChange = (event) => {
        setMaterial(event.target.value)
    }
    const handleStockChange = (event) => {
        setStock(event.target.value)
    }

    const handleCategoryChange = (event) => {
        setCate(event.target.value.trim())
    }
    const handleStatusChange = (event) => {
        setStatus(event.target.value)
    }

    useEffect(() => {
        fetchCategories()
        fetchType()
    }, [])

    return (
        <form action="" className="w-full mb-96">
            <div className="text-2xl ml-28">Thêm mới thành phần </div>
            <div className="flex mx-60 my-2  bg-red-100 rounded-lg">
                <div className="px-4 flex flex-col basis-1/2 items-center gap-4 py-10 justify-start">
                    {/* <div>Chung</div> */}
                    <div className="w-3/4">
                        {/* <div>name</div> */}
                        <TextField fullWidth label={'Tên sản phẩm'} variant="standard" onChange={handleNameChange} value={tmpName} />
                    </div>
                    <div className="w-3/4">
                        {/* <div>material</div> */}
                        <TextField fullWidth select label="Phân loại" helperText="Chọn phân Loại" variant="filled" onChange={handleCategoryChange}>
                            <MenuItem value={'All'}>All</MenuItem>
                            {tmpType.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="w-3/4">
                        {/* <div>material</div> */}
                        <TextField fullWidth label={'Chất Liệu'} variant="standard" onChange={handleMaterialChange} value={tmpMaterial} />
                    </div>
                    <div className="w-3/4">
                        {/* <div>material</div> */}
                        <TextField fullWidth label={'Màu sắc'} variant="standard" onChange={handleColorChange} value={tmpColor} />
                    </div>
                    <div className="w-3/4">
                        {/* <div>price</div> */}
                        <TextField fullWidth label={'Giá'} variant="standard" onChange={handlePriceChange} value={tmpPrice} />
                    </div>

                    <div className="w-3/4">
                        {/* <div>description</div> */}
                        <TextField
                            fullWidth
                            label={'Mô tả'}
                            variant="standard"
                            onChange={handleDescriptionChange}
                            value={tmpDescription}
                            multiline
                            rows={6}
                        />
                    </div>
                    <div className="w-3/4">
                        {/* <div>description</div> */}
                        {/*<TextField*/}
                        {/*    fullWidth*/}
                        {/*    label={'Link ảnh'}*/}
                        {/*    variant="standard"*/}
                        {/*    onChange={handleUrlChange}*/}
                        {/*    value={tmpUrl }*/}
                        {/*/>*/}
                    </div>
                </div>
                <div className="px-4 pl-40 flex flex-col basis-1/2 items-start gap-4 py-10">
                    <div>
                        <div>Hình ảnh </div>
                        <ImageUploader images={images} setImages={setImages} maxNumber={maxNumber} setUrls={setUrls} />
                        <div className="mt-12">
                            <FormControl>
                                <FormLabel id="status">Trạng thái</FormLabel>
                                <RadioGroup aria-labelledby="Trạng thái" defaultValue="Enable" onChange={handleStatusChange}>
                                    <FormControlLabel value="Enable" control={<Radio />} label="Enable" onClick={() => setStatus('Enable')} />
                                    <FormControlLabel value="Disable" control={<Radio />} label="Disable" onClick={() => setStatus('Disable')} />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>

                    <div>
                        <div className="mt-12">
                            <TextField fullWidth label={'Tồn kho'} variant="standard" onChange={handleStockChange} value={tmpStock} />
                        </div>
                    </div>
                    <div>
                        <div>Áp dụng cho</div>
                        {categories.map(
                            (cate) =>
                                cate.Allow_customize && (
                                    <div key={cate.id}>
                                        <Checkbox value={cate.id} onChange={handleApplyForChange} />
                                        {cate.name}
                                    </div>
                                )
                        )}
                    </div>
                    <Button variant="contained" onClick={handleAdd}>
                        {' '}
                        update
                    </Button>
                </div>
            </div>
        </form>
    )
}
