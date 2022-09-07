import React, {useState, useEffect} from 'react';
import Input from "./input"


function Form() {
  const [isHidden, SetisHidden] = useState(true);

  return (
    <div>
      {isHidden ? (
        <div
          className="flex flex-col m-auto cursor-text rounded-xl shadow-xl h-12 w-8/12 bg-white pt-3 pl-4 font-bold text-md font-mono lg:w-5/12 md:w-6/12 sm:w-8/12"
          onMouseDown={() => SetisHidden(!isHidden)}
        >
          Enter a note...
        </div>
      ) : (
        <Input />
      )}
    </div>
  );
}


export default Form;
