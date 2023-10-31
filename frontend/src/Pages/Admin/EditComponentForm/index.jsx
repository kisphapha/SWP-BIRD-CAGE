import { ButtonBase, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { React, useState, useEffect } from 'react'
import { Button } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import axios from 'axios'

export default function EditComponentForm({ ComponentId, close, handleFilter }) {
    const [materials, setMaterials] = useState([])
    const [categories, setCategories] = useState([])
    const [Component, setComponent] = useState('')
    //temp varible
    const [tmpName, setTempName] = useState('')
    const [tmpDescription, setTempDescription] = useState('')
    const [tmpPrice, setTempPrice] = useState(0)
    const [tmpBird, setTempBird] = useState('')
    const [tmpMaterial, setMaterial] = useState('')
    const [tmpDiscount, setDiscount] = useState('')
    const [tmpStock, setStock] = useState('')
    const [tmpHeight, setHeight] = useState('')
    const [tmpWidth, setWidth] = useState('')
    const [tmpUrl, setUrl] = useState('')
    const [tmpCate, setCate] = useState('')
    const [tmpStatus, setStatus] = useState('')

    async function fetchCategories() {
        const response = await axios.get('http://localhost:3000/category/')
        if (response.data) {
            setCategories(response.data)
        }
    }

    async function fetchComponentDetails(id) {
        const response = await axios.get('http://localhost:3000/Components/' + id)
        if (response.data) {
            setComponent(response.data)
        }
    }

    async function handleUpdate(event) {
        const _cate = (tmpCate ? tmpCate : Component.Category).trim()
        const _size =
            _cate != 'PK' ? (tmpWidth ? tmpWidth : Component.Size.split(',')[0]) + ',' + (tmpHeight ? tmpHeight : Component.Size.split(',')[1]) : ''
        if (!tmpDiscount) setDiscount(0)
        const json = {
            Id: Component.Id,
            Name: tmpName ? tmpName : Component.Name,
            Category: _cate,
            material: tmpMaterial ? tmpMaterial : Component.material,
            Description: tmpDescription ? tmpDescription : Component.Description,
            Price: tmpPrice ? tmpPrice : Component.Price,
            Stock: tmpStock ? tmpStock : Component.Stock,
            Size: _size,
            SuitableBird: _cate != 'PK' ? (tmpBird ? tmpBird : Component.SuitableBird) : '',
            discount: tmpDiscount ? tmpDiscount : Component.discount,
            Status: tmpStatus ? tmpStatus : Component.Status,
            Url: tmpUrl ? tmpUrl : Component.Url
        }
        console.log(json)
        await axios.post(`http://localhost:3000/Components/update`, json)
        alert('Component updated')
        close()
        handleFilter()
    }

    const handleNameChange = (event) => {
        setTempName(event.target.value)
    }
    const handleBirdChange = (event) => {
        setTempBird(event.target.value)
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
    const handleDiscountChange = (event) => {
        setDiscount(event.target.value)
    }
    const handleHeightChange = (event) => {
        setHeight(event.target.value)
    }
    const handleWidthChange = (event) => {
        setWidth(event.target.value)
    }
    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }
    const handleCategoryChange = (event) => {
        setCate(event.target.value)
    }
    const handleStatusChange = (event) => {
        setStatus(event.target.value)
    }

    useEffect(() => {
        fetchCategories()
        fetchComponentDetails(ComponentId)
    }, [ComponentId])

    return (
        <form action="" className="w-full ">
            {/* <div className="m-4 font-bold text-lg">Chỉnh sửa sản phẩm </div> */}
            {Component != '' && (
                <div className=" px-4 ">
                    <div className="">
                        {/* <div>name</div> */}
                        <TextField
                            fullWidth
                            label={'Name'}
                            variant="standard"
                            onChange={handleNameChange}
                            value={tmpName ? tmpName : Component.Name}
                            InputLabelProps={{ shrink: true }}
                        />
                    </div>
                    <div className="flex place-content-around">
                        <div className="w-1/2 my-2  ">
                            <div className="">
                                {/* <div>material</div> */}
                                <TextField
                                    fullWidth
                                    select
                                    label="Category"
                                    helperText="Please select category"
                                    variant="filled"
                                    onChange={handleCategoryChange}
                                    value={tmpCate ? tmpCate : Component.Category}
                                >
                                    {categories.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="">
                                {/* <div>material</div> */}
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    label={'Material'}
                                    variant="standard"
                                    onChange={handleMaterialChange}
                                    value={tmpMaterial ? tmpMaterial : Component.material}
                                />
                            </div>
                            {(tmpCate ? tmpCate.trim() : Component.Category.trim()) != 'PK' && (
                                <>
                                    <div className="">
                                        {/* <div>bird suitable</div> */}

                                        <TextField
                                            InputLabelProps={{ shrink: true }}
                                            fullWidth
                                            label={'Bird Suitable'}
                                            variant="standard"
                                            onChange={handleBirdChange}
                                            value={tmpBird ? tmpBird : Component.SuitableBird}
                                        />
                                    </div>
                                </>
                            )}
                            <div className="">
                                {/* <div>price</div> */}
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    label={' Price'}
                                    variant="standard"
                                    onChange={handlePriceChange}
                                    value={tmpPrice ? tmpPrice : Component.Price}
                                />
                            </div>
                            <div className="">
                                {/* <div>discount</div> */}
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    label={'Discount'}
                                    variant="standard"
                                    onChange={handleDiscountChange}
                                    value={tmpDiscount ? tmpDiscount : Component.discount}
                                />
                            </div>
                        </div>
                        <div className=" flex gap-8 ">
                            {(tmpCate ? tmpCate.trim() : Component.Category.trim()) != 'PK' && (
                                <div className="">
                                    <div className="my-2">Kích thước</div>
                                    <div className="flex gap-4">
                                        <div className="w-12 ">
                                            {/* <div>height</div> */}
                                            <div>
                                                <TextField
                                                    InputLabelProps={{ shrink: true }}
                                                    fullWidth
                                                    label={'Height'}
                                                    variant="standard"
                                                    onChange={handleHeightChange}
                                                    value={tmpHeight ? tmpHeight : Component.Size ? Component.Size.split(',')[1] : ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-12 ">
                                            {/* <div>width</div> */}
                                            <div>
                                                <TextField
                                                    InputLabelProps={{ shrink: true }}
                                                    fullWidth
                                                    label={'Width'}
                                                    variant="standard"
                                                    onChange={handleWidthChange}
                                                    value={tmpWidth ? tmpHeight : Component.Size ? Component.Size.split(',')[0] : ''}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="w-20 my-2">
                                <div>Số Lượng</div>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    label={''}
                                    variant="standard"
                                    onChange={handleStockChange}
                                    value={tmpStock ? tmpStock : Component.Stock}
                                />
                            </div>
                            <div className="my-2">
                                <FormControl>
                                    <FormLabel id="status">
                                        <div className="font-bold">Status</div>
                                    </FormLabel>
                                    <RadioGroup
                                        className=""
                                        aria-labelledby="status"
                                        onChange={handleStatusChange}
                                        defaultValue={Component.Status == 'Enable' ? 'Enable' : 'Disable'}
                                    >
                                        <div>
                                            <FormControlLabel value="Enable" control={<Radio />} label="Enable" />
                                        </div>
                                        <div>
                                            <FormControlLabel value="Disable" control={<Radio />} label="Disable" />
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div>
                            <div className="">
                                {/* <div>description</div> */}
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    label={'Description'}
                                    variant="standard"
                                    multiline
                                    rows={6}
                                    onChange={handleDescriptionChange}
                                    value={tmpDescription ? tmpDescription : Component.Description}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div>
                            <div className="">
                                {/* <div>description</div> */}
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    label={'Image-url'}
                                    variant="standard"
                                    multiline
                                    rows={6}
                                    onChange={handleUrlChange}
                                    value={tmpUrl ? tmpUrl : Component.Url}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="my-2 text-right">
                        <Button onClick={handleUpdate} className="py-full" variant="contained">
                            update
                        </Button>
                    </div>
                </div>
            )}
        </form>
    )
}
