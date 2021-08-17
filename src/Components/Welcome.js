import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {

    return (
        <div>
            <h1>Welcome! Are you ready to have your serenity ignited?</h1>
            <p>
                Whether you are looking for the healing energies of Reiki or handcrafted soaps and lip balms, you will find much to choose from here. Let us walk your journey with you to find peace, happiness, and serenity. To see more information on energy healing, visit the <Link to='/serenity-in-healing'>Reiki Healing</Link> page. If you would like help deciding where to start, head over to the <Link to='/contact-me'>Contact Page</Link>.

            </p>

        </div>
    )

}

export default Welcome