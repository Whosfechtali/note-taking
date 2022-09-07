import '../../App.css';
import React, { useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
import { BiCommentAdd } from "react-icons/bi";
import Form from "./form"
import {addbtnClicked} from '../actions'

moment().format();



function Input() {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isHidden, SetisHidden] = useState(false)

  const dispatch = useDispatch()
  const counter = useSelector(state => state.updateReducer)


const postData = async (noteData) =>{

  await fetch('http://localhost:3000/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: new URLSearchParams(Object.entries(noteData)).toString()})}


  const handleSubmit = (e) =>{
    const data = {
      title: title,
      description: description,
      Time: moment().format()
    }
    SetisHidden(!isHidden)
    postData(data);
    e.preventDefault();

  }

  return (
    <div>
      {isHidden ? <Form /> :
        <div className="MobileInput relative m-auto cursor-text rounded-xl shadow-xl h-36 w-8/12 bg-white pt-3 pl-4 font-bold text-md font-mono  lg:w-5/12 md:w-6/12 sm:w-8/12">

        <form

          className=" flex flex-col "
          onSubmit={handleSubmit}>

          <input

            className="mt-5 text-sm focus: outline-0"
            name="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
             />

           <textarea

              className="mt-5 text-sm focus: outline-0"
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Take a note"
               />


           <button
             className="absolute bottom-0 right-4"
             type="submit"
             onClick={() => {dispatch(addbtnClicked())}}>
             <BiCommentAdd size={30} color={"#000000"}/>

             </button>
           </form>
         </div>

      }
    </div>







)}



export default Input;
