import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import NotefulContext from './NotefulContext'
import NoteListNav from './NoteListNav/NoteListNav';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageNav from './NotePageNav/NotePageNav';
import NotePageMain from './NotePageMain/NotePageMain';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import AddNoteError from './AddNote/AddNoteError';
import AddFolderError from './AddFolder/AddFolderError';
import PropTypes from 'prop-types';
import './App.css';

class App extends Component { 
  state = {
    notes: [],
    folders: [],
    error: null,
  };

  setFolders = folders => {
    this.setState({
      folders,
      error: null
    })
  }
  
  setNotes = notes => {
    this.setState({
      notes,
      error: null,
    })
  }

  componentDidMount(){
    fetch('http://localhost:9090/folders', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setFolders)
      .catch(error => this.setState({ error }))

      fetch('http://localhost:9090/notes', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.status)
          }
          return res.json()
        })
        .then(this.setNotes)
        .catch(error => this.setState({ error }))
    }

    handleDeleteNote = noteId => {
      this.setState({
          notes: this.state.notes.filter(note => note.id !== noteId)
      });
    };

    handleAddFolder = folder => {
      this.setState({
        folders: [
          ...this.state.folders,
          folder
        ]
      })
    };

    handleAddNote = note => {
      this.setState({
        notes: [
          ...this.state.notes,
          note
        ]
      })
    };
    
  renderNavRoutes() {
    return (
      <>
          {/* The route for when you are on the main page or on a folder page */}
          {['/', '/folder/:folderId'].map(path => (
            <Route
              exact 
              key={path}
              path={path}
              component={NoteListNav}
            />
          ))}
          {/* The route for when you are looking at a specific note */}
          <Route 
            path="/note/:noteId"
            component={NotePageNav}
          />
          {/* The route for the nav when you are adding a folder */}
          <Route path="/add-folder" component={NotePageNav} />
          {/* The route for the nav when you are adding a folder */}
          <Route path="/add-note" component={NotePageNav} />
      </>
    )
  }

  renderMainRoutes(){
    return (
      <>
          {/* this makes two routes
          it maps over / (main) and /folder/:folderId (list of notes with a folderId)
          since both of those pages have a list of notes (they go to the same component, NoteListMain
          the exact key is the same as the path, the path is the same as the path
          you render the properties of the route and create a folderId from the match.params (path)
          then you use the getNotesForFolder function to find the notes with that id
          And you return that compononent with the above properties*/}
          {['/', '/folder/:folderId'].map(path => (
            <Route
                exact
                key={path}
                path={path}
                component={NoteListMain}
            />
          ))}
          {/* This route is for the individual note main 
          You go through the route properites and the note id equals the noteId in the path
          and you use the findNote function to go through the notes and find the ones with that noteId
          Then you return the NotePageMain component with the properties of the route and the note that you found from the fuction */}
          <Route
            path="/note/:noteId"
            component={NotePageMain}
          />
          <AddFolderError>
            <Route
            path='/add-folder'
            component={AddFolder}
            />
          </AddFolderError>
          <AddNoteError>
          <Route
            path='/add-note'
            component={AddNote}
          />
          </AddNoteError>
      </>
    );
  }
  
  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote,
    }
    return (
      <NotefulContext.Provider value={contextValue}>
        <div className="App">
          {/* Call the renderNavRoutes() function*/}
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link className='header-title' to="/">Noteful</Link>
            </h1>
          </header>
          {/* Call the renderMainRoutes() function*/}
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </NotefulContext.Provider>
    );
  }
}

export default App;