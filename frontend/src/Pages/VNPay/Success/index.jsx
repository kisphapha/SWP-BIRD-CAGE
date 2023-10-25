import { Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function VNPaySuccess() {
    useEffect(() => {
        sessionStorage.removeItem('cart')
    })
    const navigate = useNavigate()
    return (
        <div className="text-center m-96 p-96">
            VNPaySuccess
            <div>
                <Button variant="contained" onClick={() => navigate(`/`)}>
                    {' '}
                    Return home
                </Button>
            </div>
        </div>
    )
}
