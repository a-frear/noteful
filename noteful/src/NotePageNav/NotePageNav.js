import { React, Component } from 'react';
import NotefulContext from '../NotefulContext'
import Button from '../Button/Button';
import { findNote, findFolder } from '../notes-helpers';
import './NotePageNav.css';
import PropTypes from 'prop-types';

class NotePageNav extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = NotefulContext;

  handleClickCancel = () => {
    this.props.history.goBack()
  };

  render() {
    const { notes, folders } = this.context;
    const {noteId} = this.props.match.params;
    const note = findNote(notes, noteId) || {};
    const folder = findFolder(folders, note.folder_id);
    return (
      <div className='NotePageNav'>
          <Button 
          tag='button'
          onClick={this.handleClickCancel}
          className='NotePageNav__back-button'
        >Back 
        </Button>
        {folder && (
          <h3 className='NotePageNav__folder-name'> <em>Folder:</em>
            <br/>
            {folder.name}
          </h3>
        )}
      </div>
      )
  }
}

export default NotePageNav;

NotePageNav.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }),
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  })
};
