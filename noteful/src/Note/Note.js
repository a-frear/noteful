import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import './Note.css';
import PropTypes from 'prop-types';
import config from '../config';

class Note extends Component {
    static defaultProps ={
        onDeleteNote: () => {},
      }
    static contextType = NotefulContext;

    handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(config.API_ENDPOINT_notes + `/${noteId}`, {
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
        const splitDate = modified.split("");
        const spliceDate = splitDate.splice(0, 10);
        return (
            <div className='Note'>
                <h2 className='Note__title'>
                    <Link className='link-title' to={`/note/${id}`}>
                    {name}
                    </Link>
                </h2>
                <h3>{spliceDate}</h3>
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
    name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
    onDeleteNote: PropTypes.func.isRequired,
 }
