import React, { useContext, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import AppContext from '../contexts/AppContext'

import TagLabel from "../components/additional/TagLabel";
import { LABEL_LOADING } from '../actions'

const TagLabels = () => {
    const { state, dispatch } = useContext(AppContext)

    console.log(state)

    useEffect(() => {
        axios.get(`http://sv8/api/additional/getLabelsInfo/${state.choiceLabel.cid}/${state.choiceLabel.order_no}`)
            .then(response => {
                console.log(response.data)
                dispatch({
                    type: LABEL_LOADING,
                    labelData: response.data
                })
            })
    }, [])

    return (
        <React.Fragment>
            <header>
                <nav>
                    <div className='header-inner'>追加依頼サポートシステム</div>
                    <Link to="/">main!</Link>
                </nav>
            </header>
            <main>
                <div className={'additionalWrapper '} >
                    {state.labelData.map((src, idx) => (
                        <TagLabel key={idx} src={src} />
                    ))}
                </div>
            </main>
        </React.Fragment >
    );
}
export default TagLabels
