﻿import React from 'react'
import { useState, useEffect, useRef } from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import ImageUploading from 'react-images-uploading';
import axios from 'axios'


export default function ImageUploader({ images, setImages, maxNumber }) {
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };


    return (
        <div>
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    // write your building UI
                    <div>
                        <Button
                            variant="outlined"
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Chọn Ảnh
                        </Button>
                        &nbsp;
                        <Button variant="outlined" onClick={onImageRemoveAll}>Xóa hết ảnh</Button>
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                    <Button onClick={() => onImageUpdate(index)}>Update</Button>
                                    <Button onClick={() => onImageRemove(index)}>Remove</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </div>
    )
}
