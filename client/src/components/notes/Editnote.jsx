import {React, useEffect, useState} from 'react'
import {AiFillCheckCircle,AiFillCloseCircle } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import {editbtnClicked} from '../actions'
import '../../App.css';
import moment from 'moment';

moment().format();


export default function Editnote(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const Reducer = useSelector((state) => state.editNoteReducer);
  const dispatch = useDispatch()


  useEffect(() => {
    const fetchNotes = async (url) => {
      const data = await fetch(url);
      const notesdata = await data.json();
      setTitle(notesdata.title);
      setDescription(notesdata.description)
    };
    if (props.noteID.length !== 0) {
      fetchNotes("http://localhost:3000/" + props.noteID);
    }
  }, [Reducer]);

  const handleSubmit = (e) => {
    const data = {
      title: title,
      description: description,
      Time: moment().format()
    }
    console.log(props.noteID)
    fetch('http://localhost:3000/'+props.noteID, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(Object.entries(data)).toString()})
    dispatch(editbtnClicked())
    e.preventDefault();
  };

  const closeNotecard = (e) => {

      dispatch(editbtnClicked())
  }

  return (
    <div className="z-20 bg-yellow-200 fixed w-2/4  h-48 m-auto left-0 right-0 rounded-2xl border-2 border-[#F0F0F0] font-bold text-xl font-mono ">
      <form onSubmit={handleSubmit}>
        <input
          className="absolute w-9/12	left-6 top-4 text-2xl w-2/4"
          type="text"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
          defaultValue={title}
        />

        <textarea
          className="absolute w-9/12 left-6 top-16 text-sm"
          type="text"
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
          defaultValue={description}
        />

        <button
          className=" absolute top-2 right-4"
          onClick={closeNotecard}
        >
          <AiFillCloseCircle size = '35'/>
        </button>

        <button
          className=" absolute bottom-2 right-4"
          type="submit"
          value="submit"
        >
          <AiFillCheckCircle size = '35'/>
        </button>
      </form>
    </div>
  );
}
