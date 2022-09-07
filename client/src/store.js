import updateReducer   from './components/updateReducer'
import editNoteReducer   from './components/editNoteReducer'

import { configureStore } from '@reduxjs/toolkit'
import {combineReducers} from '@reduxjs/toolkit'


export default configureStore({
  reducer: {
    updateReducer,
    editNoteReducer
  },
})
