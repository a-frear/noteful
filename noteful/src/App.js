import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import dummyStore from './dummy-store';
import NoteListNav from './NoteListNav/NoteListNav';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageNav from './NotePageNav/NotePageNav';
import NotePageMain from './NotePageMain/NotePageMain';
import {getNotesForFolder, findNote, findFolder} from './notes-helpers';
import './App.css';

class App extends Component { 
  state = {
    notes: [],
    folders: []
  };

  componentDidMount(){
    setTimeout(() => this.setState(dummyStore), 600)
  }

  renderNavRoutes(){
    const {notes, folders} = this.state;
    return (
      <>
        {/* The route for when you are on the main page or on a folder page */}
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact 
            key = {path}
            path = {path}
            render = {routeProps => (
              <NoteListNav
                folders={folders}
                notes={notes}
                {...routeProps}
              /> 
            )}
          />
        ))}
         {/* The route for when you are looking at a specific note */}
        <Route 
          path="/note/:noteId"
          render= {routeProps => {
            const {noteId} = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <NotePageNav {...routeProps} folder={folder} />;
          }}
        />
        {/* The route for the nav when you are adding a folder */}
        <Route path="/add-folder" component={NotePageNav} />
        {/* The route for the nav when you are adding a folder */}
        <Route path="/add-note" component={NotePageNav} />
      </>
    )
  }

  renderMainRoutes(){
    const { notes } = this.state; 

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
                render={routeProps => {
                  const {folderId} = routeProps.match.params;
                  const notesForFolder = getNotesForFolder(
                    notes,
                    folderId
                  );
                  return (
                    <NoteListMain
                      {...routeProps}
                      notes={notesForFolder}
                    />
                  );
                }}
            />
          ))}
          {/* This route is for the individual note main 
          You go through the route properites and the note id equals the noteId in the path
          and you use the findNote function to go through the notes and find the ones with that noteId
          Then you return the NotePageMain component with the properties of the route and the note that you found from the fuction */}
          <Route
            path="/note/:noteId"
            render={routeProps => {
              const {noteId} = routeProps.match.params;
              const note = findNote(notes, noteId);
              return <NotePageMain {...routeProps} note={note} />;
            }}
          />
      </>
    );
  }
  /* Here you are creating the header (not a route, because it will always be on the page*/
  render() {
    return (
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
    );
  }
}

export default App;
