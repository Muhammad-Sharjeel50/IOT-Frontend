import React, { useState } from 'react'

function KeywordChipsInput({ onAddKeywords }) {
	
	const [inputValue, setInputValue] = useState('')
	const [keywords, setKeywords] = useState([])
	const handleInputChange = (e) => {
		setInputValue(e.target.value)
	}
	const handleInputKeyDown = (e) => {
		e.stopPropagation();
		if (e.key === 'Enter') {
			if (inputValue.trim() !== '') {
				const newKeyword = inputValue.trim()
				setKeywords((prevKeywords) => [...prevKeywords, newKeyword])
				onAddKeywords([...keywords, newKeyword ])
				setInputValue('')
			}
		}
		
	}

	const handleRemoveKeyword = (keyword) => {
		const updatedKeywords = keywords.filter((kw) => kw !== keyword)
		setKeywords(updatedKeywords)
	}

	const handleAddKeywords = () => {
		onAddKeywords(keywords)
	}

	return (
		<div className="flex flex-wrap w-ful">
			<div className="w-5/6 mr-4">
				<input
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-slate-500 placeholder:italic"
					onKeyDown={handleInputKeyDown}
					placeholder="Enter keywords and press Enter"
				/>
			</div>
			<button
				onClick={handleAddKeywords}
				className="text-white bg-sky-600 hover:bg-sky-700  text-center flex focus:outline-none font-medium rounded-lg text-md w-auto px-4 py-1 h-full active:scale-90 "
			>
				Add
			</button>
			<div className="flex flex-wrap py-2 w-full">
				{keywords.map((keyword, index) => (
					<div
						key={index}
						className="mr-1 pl-2 py-1 text-gray-600 rounded-md bg-gray-200"
					>
						{keyword}
						<span
							className="w-2 px-2 text-gray-500"
							onClick={() => handleRemoveKeyword(keyword)}
						>
							x
						</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default KeywordChipsInput
