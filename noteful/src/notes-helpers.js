/* Take the array of folders and the folderId.
Find the folder with an id that matches the folderId*/
export const findFolder = (folders=[], folder_id) =>
  folders.find(folder => folder.id == folder_id)

/*Take the array of notes and the noteId 
Go through the notes and find the notes with a noteId that matches the noteId*/
export const findNote = (notes=[], noteId) =>
  notes.find(note => note.id == noteId)


/* Take the array of notes and the folderId. 
If there is no folder Id, go with all the notes
If there is a folder Id, filter through the notes and return only the note with the folder id*/
export const getNotesForFolder = (notes=[], folder_id) => (
  (!folder_id)
    ? notes
    : notes.filter(note => note.folder_id == folder_id)
)

/*Take the array of notes and the folderId
Filter through the notes and return the length of the notes whose folderId matches the folderID*/
export const countNotesForFolder = (notes=[], folder_id) =>
  notes.filter(note => note.folder_id == folder_id).length
