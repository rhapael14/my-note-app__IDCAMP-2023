import React from "react";

export default function DeleteButton({ id, onDelete}) {
	return <button className="note-item__delete" onClick={() => onDelete(id)}>Delete</button>
}