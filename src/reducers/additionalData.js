/*
    荷札出力済
    PRINT_TAG_DONE

    送り状出力済
    PRINT_INVOICE_DONE

    明細表出力済
    PRINT_DETAILS_DONE
*/


import {
    ADDITIONAL_ORDER_FETCH,
    DELETE_ADDITIONAL_ORDER,
    PRINT_TAG_DONE,
    // PRINT_INVOICE_DONE,
    // PRINT_DETAIL_DONE,
} from '../actions'

const additionalData = (state = [], action) => {
    switch (action.type) {
        case ADDITIONAL_ORDER_FETCH:
            return action.additionalData
        case DELETE_ADDITIONAL_ORDER:
            return state.filter(event => event.id !== action.id)
        case PRINT_TAG_DONE:
            return state.filter(event => event.id === action.id)
        default:
            return state
    }
}
export default additionalData
