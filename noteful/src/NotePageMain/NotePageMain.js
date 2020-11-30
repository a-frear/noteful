import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'

function NotePageMain(props) {
  return (
    <section className='NotePageMain'>
      <Note
        id={props.note.id}
        name={props.note.name}
        modified={props.note.modified}
      />
      <div className='NotePageMain__content'>
        <p>{props.note.content}</p>
      </div>
    </section>
  )
}

NotePageMain.defaultProps = {
    note: {
      content: '',
    }
}

export default NotePageMain;