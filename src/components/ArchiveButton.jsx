import React from "react";

export default function ArchiveButton({ id, archived, onArchive}) {
	return <button className="note-item__archive" onClick={() => onArchive(id)}>{(!archived) ? 'Archive' : 'Move'}</button>
}