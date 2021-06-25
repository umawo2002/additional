import { ADD_EVENT_LOG } from '../actions'

const events = (state = [], action) => {
    switch (action.type) {
        case ADD_EVENT_LOG:
            const eventLog = {
                tei_name: action.tei_name,
                operatedAt: action.operatedAt
            }
            return [eventLog, ...state]
        default:
            return state
    }
}
export default events
