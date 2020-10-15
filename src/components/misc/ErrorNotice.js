import React from 'react'

export default function ErrorNotice(props) {
	return (
		<div className='container error-message'>
			<div className='col-md-6 mx-auto'>
				<div
					className='alert alert-danger alert-dismissible fade show'
					role='alert'
				>
					<button
						onClick={() => props.clearMessage(undefined)}
						type='button'
						className='close'
						data-dismiss='alert'
						aria-label='Close'
					>
						<span aria-hidden='true'>&times;</span>
					</button>
					<strong>That's wrong!</strong> {props.message}
				</div>
			</div>
		</div>
	)
}
