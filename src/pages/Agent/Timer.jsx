import React, { useEffect, useState } from 'react'

function Timer({ name, isActive, toggleTimer }) {
	const [time, setTime] = useState(0)

	useEffect(() => {
		let interval

		if (isActive) {
			const startTime = localStorage.getItem(`timer_${name}`)
			const initialTime = startTime ? convertToSeconds(startTime) : 0

			if (!isNaN(initialTime)) {
				setTime(initialTime)

				interval = setInterval(() => {
					setTime((prevTime) => {
						const newTime = prevTime + 1
						localStorage.setItem(`timer_${name}`, formatDuration(newTime))
						return newTime
					})
				}, 1000)
			}
		} else {
			clearInterval(interval)
		}

		return () => {
			clearInterval(interval)
		}
	}, [isActive, name])

	const convertToSeconds = (formattedTime) => {
		const [hours, minutes, seconds] = formattedTime.split(':').map(Number)
		return hours * 3600 + minutes * 60 + seconds
	}

	const formatDuration = (totalSeconds) => {
		const hours = Math.floor(totalSeconds / 3600)
			.toString()
			.padStart(2, '0')
		const minutes = Math.floor((totalSeconds % 3600) / 60)
			.toString()
			.padStart(2, '0')
		const seconds = (totalSeconds % 60).toString().padStart(2, '0')
		return `${hours}:${minutes}:${seconds}`
	}

	return (
		<div className="bg-sky-500 mx-auto text-white text-center flex-col flex  px-4 py-1 2xl:py-4 2xl:px-10 text-lg tracking-wider font-normal rounded-md">
			<div className="h-1/2 flex items-center justify-center w-full">
				<div className="text-sm 2xl:text-xl font-semibold">{name}</div>
			</div>
			<div className="flex flex-wrap pt-2 h-1/2 w-full justify-start">
				<div className="w-1/2 ">
					<label className="relative inline-flex items-center mb-1 cursor-pointer">
						<input
							type="checkbox"
							className="sr-only peer"
							checked={isActive}
							onChange={toggleTimer}
						/>
						<div
							className={`w-11 h-6 bg-gray-200 rounded-full peer ${
								isActive ? 'peer-checked:bg-blue-600' : 'dark:bg-gray-500'
							} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all `}
						/>
					</label>
				</div>
				<div className="w-1/2 text-white text-sm font-semibold pt-1">
					{formatDuration(time)}
				</div>
			</div>
		</div>
	)
}

export default Timer
