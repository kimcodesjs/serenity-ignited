import React, {useState} from 'react'
import Overview from './Overview'
import SoapsAdmin from './SoapsAdmin'
import ReikiAdmin from './ReikiAdmin'

const Dashboard = () => {

    const [activeAdmin, setActive] = useState('soaps')

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
            <Overview />
            <button onClick={handleClick} name='soaps'>Soaps Admin</button>
            <button onClick={handleClick} name ='reiki'>Reiki Admin</button>
            {activeAdmin === 'soaps' ? <SoapsAdmin /> : <ReikiAdmin />}
            
        </div>
    )
}

export default Dashboard