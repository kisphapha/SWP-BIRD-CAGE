import { ButtonBase, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React from 'react'
import { Button } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
export default function NewProduct() {
    const materials = [
        {
            value: 'iron',
            label: 'Iron'
        },
        {
            value: 'wood',
            label: 'Wood'
        },
        {
            value: 'inox',
            label: 'Inox'
        },
        {
            value: 'bamboo',
            label: 'Bamboo'
        }
    ]
    const categories = [
        {
            value: 'iron',
            label: 'Lồng Vuông Cáp Quang'
        },
        {
            value: 'wood',
            label: 'Lồng Trụ Tròn'
        },
        {
            value: 'inox',
            label: 'Lồng 2 tầng'
        },
        {
            value: 'bamboo',
            label: 'Lồng kiểu Singapore'
        }
    ]

    return (
        <form action="" className="w-full mb-96">
            <div className="flex mx-60 my-2 ">
                <div className="px-4 flex flex-col basis-1/2 items-center gap-4 py-10 justify-start">
                    <div>General</div>
                    <div className="w-3/4">
                        {/* <div>name</div> */}
                        <TextField fullWidth label={'Name'} variant="standard" />
                    </div>
                    <div className="w-3/4">
                        {/* <div>material</div> */}
                        <TextField fullWidth select label="Category" helperText="Please select category" variant="filled">
                            {categories.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <div className="w-3/4">
                        {/* <div>material</div> */}
                        <TextField fullWidth select label="Material" helperText="Please select material" variant="filled">
                            {materials.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="w-3/4">
                        {/* <div>bird suitable</div> */}

                        <TextField fullWidth label={'Bird Suitable'} variant="standard" />
                    </div>
                    <div className="w-3/4">
                        {/* <div>price</div> */}
                        <TextField fullWidth label={' Price'} variant="standard" />
                    </div>
                    <div className="w-3/4">
                        {/* <div>discount</div> */}
                        <TextField fullWidth label={'Discount'} variant="standard" />
                    </div>
                    <div className="w-3/4">
                        {/* <div>description</div> */}
                        <TextField fullWidth label={'Description'} variant="standard" multiline rows={6} />
                    </div>
                    <div className="w-3/4">
                        {/* <div>description</div> */}
                        <TextField fullWidth label={'Image-url'} variant="standard" multiline rows={6} />
                    </div>
                </div>
                <div className="px-4 pl-40 flex flex-col basis-1/2 items-start gap-4 py-10">
                    <div>
                        <div>Size </div>
                        <div className="flex-col my-2">
                            <div className="">
                                {/* <div>height</div> */}
                                <div>
                                    <TextField fullWidth label={'Height'} variant="standard" />
                                </div>
                            </div>
                            <div className="mt-5">
                                {/* <div>width</div> */}
                                <div>
                                    <TextField fullWidth label={'Width'} variant="standard" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-12">
                            <FormControl>
                                <FormLabel id="status">Status</FormLabel>
                                <RadioGroup aria-labelledby="status" defaultValue="available">
                                    <FormControlLabel value="available" control={<Radio />} label="available" />
                                    <FormControlLabel value="unavailable" control={<Radio />} label="unavailable" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>

                    <div>
                        <div className="mt-12"> Stock </div>
                        <div>
                            <TextField />
                        </div>
                    </div>
                    <Button variant="contained"> update</Button>
                </div>
            </div>
        </form>
    )
}
