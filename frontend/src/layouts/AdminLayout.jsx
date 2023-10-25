import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import TabAdmin from '../components/features/TabAdmin'

export default function AdminLayout() {
    try {
        if (JSON.parse(sessionStorage.loginedUser).Role == 'Admin') {
            return (
                <div className="flex bg-gray-50" style={{ paddingLeft: '256px' }}>
                    <div>
                        <TabAdmin />
                    </div>
                    <div style={{ width: '100%', padding: '1% ', display: 'flex', justifyContent: 'center' }}>
                        <Outlet />
                    </div>
                </div>
            )
        }
    } catch (error) {
        console.log(error)
    }
    return (
        <div>
            <img
                className="w-screen h-screen"
                src="https://freefrontend.com/assets/img/403-forbidden-html-templates/2021-error-403.png"
                alt="403 Error"
            />
        </div>
    )
}
