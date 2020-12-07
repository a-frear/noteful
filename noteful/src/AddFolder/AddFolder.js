import React, { Component } from 'react';
import './AddFolder.css';
import NotefulContext from '../NotefulContext';
import ValidationError from '../ValidationError/ValidationError'
import PropTypes from 'prop-types'

export default class AddFolder extends Component {
  state = {
    newFolderName: {
        value: "",
        touched: false
      },
  } 

  static contextType = NotefulContext;

  handleSubmit = e => {
    e.preventDefault()
    const folder = {
      name: e.target['folder-name'].value
    }
    fetch(`http://localhost:9090/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(folder => {
        this.context.addFolder(folder)
        this.props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  validateName() {
    const folderName = this.state.newFolderName.value;

    if(folderName === ""){
        return "Please enter a folder name"
    } else {
        return ""
    }
  }

updateFolderName = (name) => {
     this.setState({
       newFolderName: {
         value: name,
         touched: true
       }
     })
}

  render() {
    const NameError = this.validateName();
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <form onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' name='folder-name' onChange={(e) => {this.updateFolderName(e.target.value)}} required /> 
            <ValidationError message={NameError} />
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
        </form>
      </section>
    )
  }
};

AddFolder.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  })
}
