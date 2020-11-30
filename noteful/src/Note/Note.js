import React from 'react';
import { Link } from 'react-router-dom';
import './Note.css';

function Note(props) {
    return (
        <div className='Note'>
            <h2 className='Note__title'>
                <Link className='link-title' to={`/note/${props.id}`}>
                {props.name}
                </Link>
            </h2>
            <h3>{props.modified}</h3>
            <p>{props.content}</p>
        </div>
    )
}

export default Note;