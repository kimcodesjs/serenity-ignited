import React, {useState} from 'react'
import Overview from './Overview'
import ReikiAdmin from './ReikiAdmin'


const Dashboard = () => {

    const [active, setActive] = useState('reiki')

    
    const onClick = (e) => {
        if (e.target.innerHTML === 'Overview' && active !== 'overview') {
            setActive('overview')
        } else if (e.target.innerHTML === 'Serenity In Healing' && active !== 'reiki') {
            setActive('reiki')
        } 
    }
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={onClick}>Overview</button>
            <button onClick={onClick}>Serenity In Healing</button>
            {active === 'overview' ? <Overview /> : null}
            {active === 'reiki' ? <ReikiAdmin /> : null}
        </div>
    )
}

export default Dashboard