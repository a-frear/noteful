import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import './Note.css';
import PropTypes from 'prop-types';

class Note extends Component {
    static defaultProps ={
        onDeleteNote: () => {},
      }
    static contextType = NotefulContext;

    handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`http://localhost:9090/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
        'content-type': 'application/json'
        },
    })
        .then(res => {
        if (!res.ok)
            return res.json().then(e => Promise.reject(e))
        return res.json()
        })
        .then(() => {
        this.context.deleteNote(noteId)
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(noteId)
        })
        .catch(error => {
        console.error({ error })
        })
    }

    render() {
        const { name, id, modified } = this.props;
        return (
            <div className='Note'>
                <h2 className='Note__title'>
                    <Link className='link-title' to={`/note/${id}`}>
                    {name}
                    </Link>
                </h2>
                <h3>{modified}</h3>
                <button
                    className='Note__delete'
                    type='button'
                    onClick={this.handleClickDelete}
                >
                    {' '}
                    remove
                </button>
            </div>
        )
    }
}

export default Note;

Note.defaultProps={
    id: '',
    name: '',
    modified: '',
    onDeleteNote: () => {},
}

Note.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
    onDeleteNote: PropTypes.func.isRequired,
 }
