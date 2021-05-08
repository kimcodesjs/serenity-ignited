import React, {useState} from 'react'
import Overview from './Overview'
import { Link } from 'react-router-dom'


const Dashboard = () => {

    const [activeAdmin, setActive] = useState('reiki')

    const handleClick = (event) => {
        if (event.target.name === 'soaps') {
            setActive('soaps')
        } else {
            setActive('reiki')
        }
    }
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