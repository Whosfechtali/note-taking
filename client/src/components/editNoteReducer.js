const editNoteReducer = (state = false, action) => {
      switch(action.type){
        case 'editbtnClicked':
        return !state;
        default:
          return state
      }
}
export default editNoteReducer;
