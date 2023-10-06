import React from 'react';

class NoteInput extends React.Component {
	constructor(props) {
		super(props);

		// state
		this.state = {
			title: '',
			body: '',
			archived: false,
			charLimit: 50,
		}

		// bind
		this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
		this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
		this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
	}

	onTitleChangeEventHandler(e) {
		if(e.target.value.length > 50) return;

		this.setState(() => {
			return {
				title: e.target.value,
				charLimit: 50 - e.target.value.length
			}
		});
	}

	onBodyChangeEventHandler(e) {
		this.setState(() => {
			return {
				body: e.target.value,
			}
		});
	}

	onSubmitEventHandler(e) {
		e.preventDefault();
		this.props.addNote(this.state);
		this.setState(() => {
			return {
				title: '',
				body: '',
				charLimit: 50,
			}
		})
	}

	render() {
		return (
			<form className='form-input' onSubmit={this.onSubmitEventHandler}>
				<h2 className='form-input__header'>New Note</h2>
				<p className={(this.state.charLimit === 0) ? 'form-input__limit--limited' : 'form-input__limit'}>Character limit: {this.state.charLimit}</p>
				<input className="form-input__title" type="text" placeholder='Title' value={this.state.title} onChange={this.onTitleChangeEventHandler} />
				<textarea className="form-input__body" type="text" placeholder='Write your note here...' value={this.state.body} onChange={this.onBodyChangeEventHandler}></textarea>
				{
					(this.state.title && this.state.body) 
					? <button className='form-input__submit' type='submit'>Create</button>
					: <button className='form-input__submit' type='submit' disabled>Create</button> 
				}
			</form>
		);
	}
}

export default NoteInput;