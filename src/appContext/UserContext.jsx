import React, { createContext, useState } from 'react'
export const userDetailsContext = createContext()
const UserContext = (props) => {
	
	const [userData, setUserData] = useState()

	return (
	
		<userDetailsContext.Provider value={[userData, setUserData]}>
			{props.children}
		</userDetailsContext.Provider>
	)
}

export default UserContext
