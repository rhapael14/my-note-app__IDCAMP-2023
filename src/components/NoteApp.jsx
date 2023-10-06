import React from "react";
import NoteInput from "./NoteInput";
import { getNotes } from "../utils/index";
import NoteList from "./NoteList";

class NoteApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			notes: getNotes(),
			search: '',
		}

		this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
		this.onDeleteHandler = this.onDeleteHandler.bind(this);
		this.onSearchHandler = this.onSearchHandler.bind(this);
		this.onArchiveHandler = this.onArchiveHandler.bind(this);
	}

	onAddNoteHandler({ title, body, archived }) {
		this.setState((prevState) => {
			return {
				notes: [
					...prevState.notes,
					{
						id: +new Date(),
						title,
						body,
						archived,
						createdAt: +new Date(),
					}
				]
			};
		});
	}

	onDeleteHandler(id) {
		const notes = this.state.notes.filter(note => note.id !== id);
		this.setState({ notes });
	}

	onSearchHandler(e) {
		this.setState(() => {
			return {
				search: e.target.value,
			}
		})
	}
	
	onArchiveHandler(id) {
		const notes = this.state.notes.map((note) => {
			if (note.id === id) return (note.archived === false) ? {...note, archived: true} : {...note, archived: false};
			return note;
		});
		this.setState({ notes });
	}

	render() {
		const notes = this.state.notes.filter((note) => note.title.toLowerCase().includes(this.state.search.toLowerCase()));
		
		const enableNotes = notes.filter((note) => {
			return note.archived === false;
		})

		const archivedNotes = notes.filter((note) => {
			return note.archived === true;
		})

		return (
			<div className="note-app">
				<nav className="note-header">
					<h1 className="note-header__title">My Notes</h1>
					<input className="note-header__search" type="search" placeholder="Search your note here..." value={this.state.search} onChange={this.onSearchHandler} />
				</nav>
				<NoteInput addNote={this.onAddNoteHandler}/>
				<article className="note-body">
					<section className="note-body__left">
						<h2 className="note-body__title">Active Note</h2>
						{
							(enableNotes.length !== 0) 
							? <NoteList notes={enableNotes} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} /> 
							: <p className="note-body__warning">No Note Available</p>
						}
					</section>
					<section className="note-body__right">
						<h2 className="note-body__title">Archived Note</h2>
						{
							(archivedNotes.length !== 0) 
							? <NoteList notes={archivedNotes} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} /> 
							: <p className="note-body__warning">No Note Available</p>
						}
					</section>
				</article>
			</div>
		);
	}
}

export default NoteApp;