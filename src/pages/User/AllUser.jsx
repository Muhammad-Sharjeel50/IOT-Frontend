import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { BiSolidLock } from 'react-icons/bi'
import { BsTrash3Fill } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { HiOutlineLockOpen } from 'react-icons/hi'
import { IoMdKey } from 'react-icons/io'
import ReactPaginate from 'react-paginate'
import { useNavigate } from 'react-router-dom'

const itemsPerPage = 30 // Number of items to display per page

export default function AllUser({ isAdmin, filteredData, setUsers }) {
	const endPoint = process.env.REACT_APP_BASE_URL
	const navigate = useNavigate()

	const dummyData = [
		{ sno: 1, date: '2024/12/3',voltage:'230v', current: '10A', power: '5kW', energy: '50kWh', frequency: '60Hz', powerFactor: '0.9', gerneratorusage: "30w",   },
		{ sno: 2, date: '2024/12/3', voltage:'230v',current: '12A', power: '6kW', energy: '60kWh', frequency: '50Hz', powerFactor: '0.8', gerneratorusage: "30w",  },
		{ sno: 3, date: '2024/12/3',voltage:'230v', current: '14A', power: '7kW', energy: '70kWh', frequency: '55Hz', powerFactor: '0.85', gerneratorusage: "30w",   },
		{ sno: 4, date: '2024/12/3',voltage:'230v', current: '16A', power: '8kW', energy: '80kWh', frequency: '57Hz', powerFactor: '0.9', gerneratorusage: "30w",  },
		{ sno: 5, date: '2024/12/3',voltage:'230v', current: '18A', power: '9kW', energy: '90kWh', frequency: '53Hz', powerFactor: '0.95', gerneratorusage: "30w", },
		{ sno: 6, date: '2024/12/3', voltage:'230v',current: '20A', power: '10kW', energy: '100kWh', frequency: '58Hz', powerFactor: '0.92', gerneratorusage: "30w",  },
		{ sno: 7, date: '2024/12/3',voltage:'230v', current: '22A', power: '11kW', energy: '110kWh', frequency: '59Hz', powerFactor: '0.94', gerneratorusage: "30w",   },
		{ sno: 8, date: '2024/12/3',voltage:'230v', current: '24A', power: '12kW', energy: '120kWh', frequency: '56Hz', powerFactor: '0.93', gerneratorusage: "30w", },
		{ sno: 9, date: '2024/12/3',voltage:'230v', current: '26A', power: '13kW', energy: '130kWh', frequency: '54Hz', powerFactor: '0.91', gerneratorusage: "30w",},
		{ sno: 10, date: '2024/12/3',voltage:'230v', current: '28A', power: '14kW', energy: '140kWh', frequency: '52Hz', powerFactor: '0.89', gerneratorusage: "30w", },
		{ sno: 11, date: '2024/12/3',voltage:'230v', current: '10A', power: '5kW', energy: '50kWh', frequency: '60Hz', powerFactor: '0.9', gerneratorusage: "30w",   },
		{ sno: 12, date: '2024/12/3',voltage:'230v', current: '12A', power: '6kW', energy: '60kWh', frequency: '50Hz', powerFactor: '0.8', gerneratorusage: "30w", },
		{ sno: 13, date: '2024/12/3',voltage:'230v', current: '14A', power: '7kW', energy: '70kWh', frequency: '55Hz', powerFactor: '0.85', gerneratorusage: "30w", },
		{ sno: 14, date: '2024/12/3',voltage:'230v', current: '16A', power: '8kW', energy: '80kWh', frequency: '57Hz', powerFactor: '0.9', gerneratorusage: "30w",  },
		{ sno: 15, date: '2024/12/3',voltage:'230v', current: '18A', power: '9kW', energy: '90kWh', frequency: '53Hz', powerFactor: '0.95', gerneratorusage: "30w",   },
		{ sno: 16, date: '2024/12/3',voltage:'230v', current: '20A', power: '10kW', energy: '100kWh', frequency: '58Hz', powerFactor: '0.92', gerneratorusage: "30w",  },
		{ sno: 17, date: '2024/12/3',voltage:'230v', current: '22A', power: '11kW', energy: '110kWh', frequency: '59Hz', powerFactor: '0.94', gerneratorusage: "30w",  },
		{ sno: 18, date: '2024/12/3',voltage:'230v', current: '24A', power: '12kW', energy: '120kWh', frequency: '56Hz', powerFactor: '0.93', gerneratorusage: "30w",   },
		{ sno: 19, date: '2024/12/3',voltage:'230v', current: '26A', power: '13kW', energy: '130kWh', frequency: '54Hz', powerFactor: '0.91', gerneratorusage: "30w",  },
		{ sno: 20, date: '2024/12/3',voltage:'230v', current: '28A', power: '14kW', energy: '140kWh', frequency: '52Hz', powerFactor: '0.89', gerneratorusage: "30w",   },
		{ sno: 11, date: '2024/12/3', current: '10A', power: '5kW', energy: '50kWh', frequency: '60Hz', powerFactor: '0.9', gerneratorusage: "30w", },
		{ sno: 12, date: '2024/12/3', current: '12A', power: '6kW', energy: '60kWh', frequency: '50Hz', powerFactor: '0.8', gerneratorusage: "30w",   },
		{ sno: 13, date: '2024/12/3', current: '14A', power: '7kW', energy: '70kWh', frequency: '55Hz', powerFactor: '0.85', gerneratorusage: "30w",  },
		{ sno: 14, date: '2024/12/3', current: '16A', power: '8kW', energy: '80kWh', frequency: '57Hz', powerFactor: '0.9', gerneratorusage: "30w",  },
		{ sno: 15, date: '2024/12/3', current: '18A', power: '9kW', energy: '90kWh', frequency: '53Hz', powerFactor: '0.95', gerneratorusage: "30w",   },
		{ sno: 16, date: '2024/12/3', current: '20A', power: '10kW', energy: '100kWh', frequency: '58Hz', powerFactor: '0.92', gerneratorusage: "30w",   },
		{ sno: 17, date: '2024/12/3', current: '22A', power: '11kW', energy: '110kWh', frequency: '59Hz', powerFactor: '0.94', gerneratorusage: "30w",   },
	]

	return (
		<div className="h-full flex flex-col">
			<div className="flex-grow overflow-x-auto mt-16">
				<div className="shadow-2xl rounded-lg">
					<h1 className="text-xl font-bold mx-auto">Three Phase Data</h1>

					<div className="overflow-y-auto max-h-[30rem]">
						<table className="min-w-full text-center text-white font-medium border-collapse mt-2">
							<thead className="bg-[#3E97CF] sticky top-0 z-10">
								<tr>
									<th className="border px-2 md:px-4">Sno</th>
									
									<th className="border px-2 md:px-4">Date</th>
									<th className="border px-2 md:px-4">Voltage</th>
									<th className="border px-2 md:px-4">Current</th>
									<th className="border px-2 md:px-4">Power</th>
									<th className="border px-2 md:px-4">Energy</th>
									<th className="border px-2 md:px-4">Frequency</th>
									<th className="border px-2 md:px-4">Power Factor</th>
									<th className="border px-2 md:px-4">Generator Usage</th>	
								</tr>
							</thead>
							<tbody className="text-gray-700">
								{dummyData.map((item, index) => (
									<tr key={index}>
										<td className="border px-2 md:px-4">{item.sno}</td>
										<td className="border px-2 md:px-4">{item.date}</td>
										<td className="border px-2 md:px-4">{item.voltage}</td>
										<td className="border px-2 md:px-4">{item.current}</td>
										<td className="border px-2 md:px-4">{item.power}</td>
										<td className="border px-2 md:px-4">{item.energy}</td>
										<td className="border px-2 md:px-4">{item.frequency}</td>
										<td className="border px-2 md:px-4">{item.powerFactor}</td>
										<td className="border px-2 md:px-4">{item.gerneratorusage}</td>
										
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>

		// </div>	

	)
}
