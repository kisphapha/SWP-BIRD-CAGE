import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import TabAdmin from '../components/features/TabAdmin'
import { UserContext } from '../UserContext'

export default function AdminLayout() {
    const { user } = useContext(UserContext)
    console.log(user)
    if (user) {
        if (user.Role == "Admin") {
            return (
                <div className="flex bg-gray-50" style={{ paddingLeft: '256px' }}>
                    <div>
                        <TabAdmin role={user.Role} />
                    </div>
                    <div style={{ width: '100%', padding: '1% ', display: 'flex', justifyContent: 'center' }}>
                        <Outlet />
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            <img
                className="w-screen h-screen"
                src="https://army.wiser.my/wp-content/uploads/2018/07/403-forbidden.jpg"
                alt="403 Error"
            />
        </div>
    )
}
