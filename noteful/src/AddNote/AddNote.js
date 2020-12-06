import React, { Component } from 'react';
import './AddNote.css';
import NotefulContext from '../NotefulContext';
import ValidationError from '../ValidationError/ValidationError';
import PropTypes from 'prop-types';

export default class AddNote extends Component {
  state = {
    value: '',
    folderId:'',
    content: ''
  }

  static contextType = NotefulContext;

  handleSubmit = e => {
    e.preventDefault()
    const newNote = {
      name: e.target['note-name'].value,
      content: e.target['note-content'].value,
      folderId: e.target['note-folder-id'].value,
      modified: new Date(),
    }
    fetch(`http://localhost:9090/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(note => {
        this.context.addNote(note)
        this.props.history.push(`/folder/${note.folderId}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  updateNoteName = (noteName) => {
    this.setState({
       value: noteName
       })
   }

   updateFolderId = (id) => {
    this.setState({
      folderId: id,
      touched: true
      })
  }
  
  updateContent = (content) => {
    this.setState({
      content
      })
  }

  validateSelect() {
    const select = this.state.folderId;
    console.log(select);
    if ( select=== '') {
      return "Please select a folder"
    }
  } 

  render() {
    const { folders=[] } = this.context
    const selectError = this.validateSelect();
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <form onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' name='note-name'  onChange={(e) => this.updateNoteName(e.target.value)} value={this.state.value} required />
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' name='note-content' onChange={(e) => this.updateContent(e.target.value)} required />
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select' name='note-folder-id' onChange={(e) => this.updateFolderId(e.target.value)} >
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
            <ValidationError message={selectError} />
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add note
            </button>
          </div>
        </form>
      </section>
    )
  }
};

AddNote.propTypes = {
  //this.props.history
};