import { combineReducers } from 'redux'
import events from './events'
import additionalData from './additionalData'
import labelData from './labelData'
import choiceLabel from './choiceLabel'

export default combineReducers({
    events,
    additionalData,
    labelData,
    choiceLabel
})
