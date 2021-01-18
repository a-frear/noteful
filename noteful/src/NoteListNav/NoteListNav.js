import { React, Component } from 'react';
import { NavLink } from 'react-router-dom';
import NotefulContext from '../NotefulContext'
import './NoteListNav.css';
import { countNotesForFolder } from '../notes-helpers';

class NotesListNav extends Component {
  static contextType = NotefulContext;
  render() {
    const { folders, notes } = this.context;
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}>
                <span className='NoteListNav__num-notes'>
                  {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.name}
              </NavLink>
            </li>
          )}
        </ul>
        <NavLink 
          className='add_link'
          to={`/add-folder`}>
              Add Folder
        </NavLink>
        <NavLink
          className='add_link'
          to={`/add-note`}>
            Add Note
        </NavLink>
      </div> 
      )
  }
}

export default NotesListNav;