import React from 'react'

const UnAuthorized = () => {
	return (
		<div className="bg-[#100] w-full h-screen flex flex-wrap flex-col justify-center items-center">
			<div className="mx-auto items-center flex-col flex">
				<h1 className="animate-bounce text-red-600 text-5xl">
					<code>Access Denied</code>
				</h1>
				<div className="h-5 pt-4 w-full">
					<div className="bg-white w-full h-full"></div>
				</div>
				<h3 className="animate-slide-in-right text-white py-4 text-2xl">
					You don't have permission to view this site.
				</h3>
				<h3 className="">🚫🚫🚫🚫</h3>
				<h6 className=" text-red-600">
					<strong>Error Code</strong>: 403 forbidden
				</h6>
			</div>
		</div>
	)
}

export default UnAuthorized
