import React from 'react';
import Note from '../Note/Note'
import './NoteListMain.css'

function NoteListMain(props) {
    return (
        <section className='NoteListMain'>
            <ul>
            {props.notes.map(note =>
                <li key={note.id}>
                <Note
                    id={note.id}
                    name={note.name}
                    modified={note.modified}
                />
                </li>
            )}
            </ul>
        </section>
    )
}

export default NoteListMain;