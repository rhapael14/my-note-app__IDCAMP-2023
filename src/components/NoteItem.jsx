import React from "react";
import NoteItemBody from "./NoteItemBody";
import DeleteButton from "./DeleteButton";
import ArchiveButton from "./ArchiveButton";

export default function NoteItem({title, createdAt, body, archived, id, onDelete, onArchive}) {
	return (
		<div className="note-item">
			<NoteItemBody title={title} createdAt={createdAt} body={body} />
			<div className="note-item__buttons">
				<DeleteButton id={id} onDelete={onDelete} />
				<ArchiveButton id={id} archived={archived} onArchive={onArchive} />
			</div>
		</div>
	);
}