import { ButtonBase, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { React, useState, useEffect } from 'react'
import { Button } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import axios from 'axios'

export default function EditProductForm({ productId, close, handleFilter }) {
    const [materials, setMaterials] = useState([])
    const [categories, setCategories] = useState([])
    const [product, setProduct] = useState('')
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

    async function fetchProductDetails(id) {
        const response = await axios.get('http://localhost:3000/products/' + id)
        if (response.data) {
            setProduct(response.data)
        }
    }

    async function handleUpdate(event) {
        const _size = (tmpWidth ? tmpWidth : product.Size.split(',')[0]) + ',' + (tmpHeight ? tmpHeight : product.Size.split(',')[1])
        const json = {
            Id: product.Id,
            Name: tmpName ? tmpName : product.Name,
            Category: (tmpCate ? tmpCate : product.Category).trim(),
            material: tmpMaterial ? tmpMaterial : product.material,
            Description: tmpDescription ? tmpDescription : product.Description,
            Price: tmpPrice ? tmpPrice : product.Price,
            Stock: tmpStock ? tmpStock : product.Stock,
            Size: _size,
            SuitableBird: tmpBird ? tmpBird : product.SuitableBird,
            discount: tmpDiscount ? tmpDiscount : product.discount,
            Status: tmpStatus ? tmpStatus : product.Status,
            Url: tmpUrl ? tmpUrl : product.Url
        }
        console.log(json)
        await axios.post(`http://localhost:3000/products/update`, json)
        alert('Product updated')
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
        fetchProductDetails(productId)
    }, [productId])

    return (
        <form action="" className="w-full mb-96">
            <div className="w-full">EDIT PRODUCT</div>
            {product != '' && (
                <div className="flex my-2 ">
                    <div className="px-4 flex flex-col basis-1/3 items-center gap-4 py-10 justify-start">
                        <div className="w-3/4">
                            {/* <div>name</div> */}
                            <TextField
                                fullWidth
                                label={'Name'}
                                variant="standard"
                                onChange={handleNameChange}
                                value={tmpName ? tmpName : product.Name}
                                InputLabelProps={{ shrink: true }}
                            />
                        </div>
                        <div className="w-3/4">
                            {/* <div>material</div> */}
                            <TextField
                                fullWidth
                                select
                                label="Category"
                                helperText="Please select category"
                                variant="filled"
                                onChange={handleCategoryChange}
                                value={tmpCate ? tmpCate : product.Category}
                            >
                                {categories.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>

                        <div className="w-3/4">
                            {/* <div>material</div> */}
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                label={'Material'}
                                variant="standard"
                                onChange={handleMaterialChange}
                                value={tmpMaterial ? tmpMaterial : product.material}
                            />
                        </div>
                        <div className="w-3/4">
                            {/* <div>bird suitable</div> */}

                            <TextField
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                label={'Bird Suitable'}
                                variant="standard"
                                onChange={handleBirdChange}
                                value={tmpBird ? tmpBird : product.SuitableBird}
                            />
                        </div>
                        <div className="w-3/4">
                            {/* <div>price</div> */}
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                label={' Price'}
                                variant="standard"
                                onChange={handlePriceChange}
                                value={tmpPrice ? tmpPrice : product.Price}
                            />
                        </div>
                        <div className="w-3/4">
                            {/* <div>discount</div> */}
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                label={'Discount'}
                                variant="standard"
                                onChange={handleDiscountChange}
                                value={tmpDiscount ? tmpDiscount : product.discount}
                            />
                        </div>
                    </div>
                    <div className="px-4 pl-30 flex flex-col basis-1/3 items-start gap-4 py-10">
                        <div>
                            <div className="w-3/4">
                                {/* <div>description</div> */}
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    label={'Description'}
                                    variant="standard"
                                    multiline
                                    rows={6}
                                    onChange={handleDescriptionChange}
                                    value={tmpDescription ? tmpDescription : product.Description}
                                />
                            </div>
                            <div className="flex-col my-2">
                                <div className="">
                                    {/* <div>height</div> */}
                                    <div>
                                        <TextField
                                            InputLabelProps={{ shrink: true }}
                                            fullWidth
                                            label={'Height'}
                                            variant="standard"
                                            onChange={handleHeightChange}
                                            value={tmpHeight ? tmpHeight : product.Size ? product.Size.split(',')[1] : ''}
                                        />
                                    </div>
                                </div>
                                <div className="mt-5">
                                    {/* <div>width</div> */}
                                    <div>
                                        <TextField
                                            InputLabelProps={{ shrink: true }}
                                            fullWidth
                                            label={'Width'}
                                            variant="standard"
                                            onChange={handleWidthChange}
                                            value={tmpWidth ? tmpHeight : product.Size ? product.Size.split(',')[0] : ''}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12">
                                <FormControl>
                                    <FormLabel id="status">Status</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="status"
                                        onChange={handleStatusChange}
                                        defaultValue={product.Status == 'Enable' ? 'Enable' : 'Disable'}
                                    >
                                        <FormControlLabel value="Enable" control={<Radio />} label="Enable" />
                                        <FormControlLabel value="Disable" control={<Radio />} label="Disable" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>
                        <div>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                label={'Stock'}
                                variant="standard"
                                onChange={handleStockChange}
                                value={tmpStock ? tmpStock : product.Stock}
                            />
                        </div>
                    </div>
                    <div className="px-4 pl-30 flex flex-col basis-1/3 items-start gap-4 py-10">
                        <div>
                            <div className="w-3/4">
                                {/* <div>description</div> */}
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    label={'Image-url'}
                                    variant="standard"
                                    multiline
                                    rows={6}
                                    onChange={handleUrlChange}
                                    value={tmpUrl ? tmpUrl : product.Url}
                                />
                            </div>
                        </div>
                        <Button onClick={handleUpdate} className="py-full" variant="contained">
                            update
                        </Button>
                    </div>
                </div>
            )}
        </form>
    )
}
