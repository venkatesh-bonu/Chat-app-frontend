import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import {  useSelector } from 'react-redux'
import Cookies from 'js-cookie'
const ProtectedRoute = ({element}) => {
    const {user} = useSelector(state => state.auth)
    if(!user) return <Navigate to = "/login" replace />
    return element ? element : <Outlet/>
}

export default ProtectedRoute