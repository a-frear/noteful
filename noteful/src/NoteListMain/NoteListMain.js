import { React, Component } from 'react';
import NotefulContext from '../NotefulContext';
import { getNotesForFolder } from '../notes-helpers';
import Note from '../Note/Note';
import './NoteListMain.css';
import PropTypes from 'prop-types';

class NoteListMain extends Component {
    static defaultProps = {
        match: {
          params: {}
        }
      }
    static contextType = NotefulContext

    render() {
        const { folder_id } = this.props.match.params
        const { notes=[] } = this.context
        const notesForFolder = getNotesForFolder(notes, folder_id)
      
        return (
          <section className='NoteListMain'>
            <ul>
              {notesForFolder.map(note =>
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
}

export default NoteListMain;

NoteListMain.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }),
}
