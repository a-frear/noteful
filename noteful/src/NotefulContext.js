import React from 'react';

const NotefulContext = React.createContext({
    notes: [],
    folders: [],
    addNote: () => {},
    deleteNote: () => {},
})

export default NotefulContext;