import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import * as React from 'react'
import { useState } from 'react'

const SuccessAlert = () => {
	const [open, setOpen] = useState(true)

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}

	const action = (
		<React.Fragment>
			<Button color="secondary" size="small" onClick={handleClose}>
				OK
			</Button>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	)

	return (
		<div className="bg-white text black">
			<Snackbar
				open={open}
				autoHideDuration={5000}
				onClose={handleClose}
				message="Message Sent Successfully"
				action={action}
			/>
		</div>
	)
}

export default SuccessAlert
