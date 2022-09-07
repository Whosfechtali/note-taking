const updateReducer = (state = true, action) => {
      switch(action.type){
        case 'addbtnClicked':
        return !state;
        default:
          return state
      }
}
export default updateReducer;
