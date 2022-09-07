import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {AiFillEdit, AiOutlineDelete} from 'react-icons/ai'
import NoteCard from './NoteCard'
import '../../App.css'
import Editnote from './Editnote';
import {editbtnClicked} from '../actions'


function Notes() {

  const updateNoteOnAdd = useSelector(state => state.updateReducer)
  const editNoteReducer = useSelector(state => state.editNoteReducer)

  const dispatch = useDispatch()

  const [notes, setNotes] = useState([])
  const [updateNoteOnDelete, setUpdateNoteOnDelete] = useState(true);
  const [respond, setRespond] = useState();
  const [editnoteID, setEditnoteID] = useState('');




  useEffect(() => {

    const fetchNotes = async (url) =>{
      const data = await fetch(url);
      const notesdata = await data.json()
        setNotes(notesdata)
      }
      setUpdateNoteOnDelete(false)
      let timer = setTimeout(() => fetchNotes('http://localhost:3000') ,  60);
      return () => {
        clearTimeout(timer);
      }
  }, [updateNoteOnAdd, updateNoteOnDelete, editNoteReducer]);


  const deleteNote = async (e) =>{
    // Get the ID of the selected

   let noteID = e.target.parentNode.getAttribute("data-note")

   //  Delete the selected note
   await fetch('http://localhost:3000/' +noteID, {
    method: 'DELETE'
  }).then((res)=> res.text())
    .then(res =>{
    setRespond(res)
  })
  setUpdateNoteOnDelete(true)

}

const editNote =   (e) =>{
  // Get the ID of the selected
   setEditnoteID( e.currentTarget.getAttribute("data-editnoteid"))
  dispatch(editbtnClicked())
   console.log(editnoteID)

}



    return (
      <div>
        {editNoteReducer === true &&
          <Editnote
          noteID={editnoteID}/>
         }
        <h1 className="mt-10 text-center text-xl">{respond}</h1>
        <div
          id="notes"
           className=" mx-12 pt-12 notes grid gap-x-8 gap-y-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
              {notes?.map((data) =>
                 <NoteCard
                   title={data.title}
                   description={data.description}
                   key={data._id}
                   noteID={data._id}
                   editnoteID={data._id}
                   onDelete={deleteNote}
                   onEdit={editNote}
                    />
                 )}

</div>
</div>

    )
  }
export default Notes;
