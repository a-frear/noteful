import { React, Component } from 'react';
import NotefulContext from '../NotefulContext'
import { getNotesForFolder } from '../notes-helpers'
import Note from '../Note/Note'
import './NoteListMain.css'

class NoteListMain extends Component {
    static defaultProps = {
        match: {
          params: {}
        }
      }
    static contextType = NotefulContext

    render() {
        const { folderId } = this.props.match.params
        const { notes=[] } = this.context
        const notesForFolder = getNotesForFolder(notes, folderId)
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