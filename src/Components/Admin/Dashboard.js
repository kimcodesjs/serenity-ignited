import React, {useState} from 'react'
import Overview from './Overview'
import { Link } from 'react-router-dom'


const Dashboard = () => {

    
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <Link to='/admin/soaps'>Soaps Admin</Link>
            <Link to='/admin/reiki'>Reiki Admin</Link>
            <Overview />
        </div>
    )
}

export default Dashboard