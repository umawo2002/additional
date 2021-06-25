/*
    荷札出力済
    PRINT_TAG_DONE

    送り状出力済
    PRINT_INVOICE_DONE

    明細表出力済
    PRINT_DETAILS_DONE
*/


import {
    LABEL_LOADING,
    LABEL_DELETE,
} from '../actions'

const labelData = (state = [], action) => {
    switch (action.type) {
        case LABEL_LOADING:
            return action.labelData
        case LABEL_DELETE:
            return state.filter(event => event.parts_no !== action.src.parts_no)
        default:
            return state
    }
}
export default labelData
