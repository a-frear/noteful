import React from 'react';
import Button from '../Button/Button';
import './NotePageNav.css';

function NotePageNav(props) {
    return (
    <div className='NotePageNav'>
        <Button 
        tag='button'
        role='link'
        onClick={() => props.history.goBack()}
        className='NotePageNav__back-button'
      >Back 
      </Button>
      {props.folder && (
        <h3 className='NotePageNav__folder-name'> <em>Folder:</em>
          <br/>
          {props.folder.name}
        </h3>
      )}
    </div>
    )
}

export default NotePageNav;