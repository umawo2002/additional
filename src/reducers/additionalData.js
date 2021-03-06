/*
    荷札出力済
    PRINT_TAG_DONE

    送り状出力済
    PRINT_INVOICE_DONE

    明細表出力済
    PRINT_DETAILS_DONE
*/


import {
    ACCEPT_ORDER,
    ADDITIONAL_ORDER_FETCH,
    DELETE_ADDITIONAL_ORDER,
    PRINT_TAG_DONE,
    // PRINT_INVOICE_DONE,
    // PRINT_DETAIL_DONE,
    PRINT_INVOICE_CSV
} from '../actions'

const additionalData = (state = [], action) => {
    switch (action.type) {
        case ACCEPT_ORDER:
            const newData = state.map((val, ind) => {
                if (val.order_no === action.order_no && val.cid === action.cid && val.category === action.category) {
                    val.accepted_at = action.accepted_at
                    val.accepted_user = action.accepted_user
                }
                return val
            })
            return newData
        case ADDITIONAL_ORDER_FETCH:
            return action.additionalData
        case DELETE_ADDITIONAL_ORDER:
            return state.filter(event => event.id !== action.id)
        case PRINT_TAG_DONE:
            return state.filter(event => event.id === action.id)

        case PRINT_INVOICE_CSV:
            return state.filter(event => event.id === action.id)

        default:
            return state
    }
}
export default additionalData
