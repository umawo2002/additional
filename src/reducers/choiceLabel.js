
import { CHOICE_CID } from '../actions'

const choiceLabel = (state = [], action) => {
    switch (action.type) {
        case CHOICE_CID:
            return { cid: action.cid, order_no: action.order_no }
        default:
            return state
    }
}
export default choiceLabel