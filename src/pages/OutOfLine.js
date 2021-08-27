import React, { useContext, useEffect } from "react";
import { Helmet } from 'react-helmet';
// import { Link as RouterLink } from 'react-router-dom'
import axios from 'axios'

import { ADDITIONAL_ORDER_FETCH } from '../actions'
import SpotList from "../components/spot/SpotList";
import AppContext from '../contexts/AppContext'

const OutOfLine = () => {
    const { state, dispatch } = useContext(AppContext)

    const fetch_order = () => {
        axios.get('http://sv8/api/line/getOutOfLine')
            .then(response => {
                console.log(response.data)
                dispatch({ type: ADDITIONAL_ORDER_FETCH, additionalData: response.data })
            })
    }

    useEffect(() => {
        fetch_order()
    }, [])

    useEffect(() => {
        const intervalId = setInterval(function () {
            fetch_order()
        }, 15000)
        return (() => clearInterval(intervalId))
    }, [])

    return (
        <>
            <Helmet>
                <title>北関東ライン | 生産管理 </title>
            </Helmet>
            {/* <header>
                <nav>
                    <div className='header-inner'>追加依頼サポートシステム</div>
                    <RouterLink to="/tags">荷札</RouterLink>
                    <RouterLink to="/invoice">送状</RouterLink>
                </nav>
            </header> */}
            <main>
                <div className={'additionalWrapper '} >
                    {state && state.additionalData.map((src, idx) => (
                        <SpotList key={idx} src={src} />
                    ))
                    }
                </div>
            </main>
        </>
    );
}
export default OutOfLine