import {useRef, useState, useEffect} from 'react'
import {AiFillEdit, AiOutlineDelete} from 'react-icons/ai'

function NoteCard (props) {


  const handleMouseOver = async (event) => {
     event.target.children[2].style.visibility = "visible";
  };

  const handleMouseLeave = (event) => {
      event.target.children[2].style.visibility = "hidden"}

    return (

      <div>
              <div className="relative rounded-2xl font-bold text-xl font-mono bg-white w-full h-48 hover:shadow-2xl hover:opacity-100"

               onMouseEnter={handleMouseOver}
               onMouseLeave={handleMouseLeave}>
                <h1 className="absolute left-6 top-4 text-2xl ">{props.title}</h1>

                <p className="absolute left-6 top-16 text-sm ">{props.description}</p>

                  <div className="invisible">

                    <button
                      className="absolute right-6 top-4"
                      onClick={props.onEdit}
                      data-editnoteid={props.editnoteID}>
                      <AiFillEdit/>
                    </button>

                  <button
                    className="absolute right-6 bottom-4"
                    onClick={props.onDelete}
                    data-note={props.noteID}>
                    <AiOutlineDelete/>
                  </button>

                  </div>

              </div>
</div>
    )
}
export default NoteCard;
