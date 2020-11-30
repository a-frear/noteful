import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './NoteListNav.css';
import { countNotesForFolder } from '../notes-helpers'

function NotesListNav(props){
    return (
    <div className='NoteListNav'>
      <ul className='NoteListNav__list'>
        {props.folders.map(folder =>
          <li key={folder.id}>
            <NavLink
              className='NoteListNav__folder-link'
              to={`/folder/${folder.id}`}
            >
              <span className='NoteListNav__num-notes'>
                {countNotesForFolder(props.notes, folder.id)}
              </span>
              {folder.name}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
        
    )
}

export default NotesListNav;