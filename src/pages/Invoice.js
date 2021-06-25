import React, { useContext } from 'react'
import AppContext from '../contexts/AppContext'

const Invoice = () => {
    const { state } = useContext(AppContext)

    console.log(state.additionalData[0])

    const src = state.additionalData[0]

    // var states = [
    //     { code: "CA", name: "California" },
    //     { code: "HI", name: "Hawaii" },
    //     { code: "TX", name: "Texas" },
    //     { code: "WA", name: "Washington" }];
    // var options = states.map(
    //     (n) => (
    //         <option key={n.code} value={n.code}>
    //             {n.name}
    //         </option>
    //     )
    // );

    let states = [
        { code: 0, name: "発払い" },
        { code: 2, name: "コレクト" },
        { code: 3, name: "ＤＭ便" },
        { code: 4, name: "タイム" },
        { code: 5, name: "着払い" },
        { code: 7, name: "ネコポス" },
        { code: 8, name: "宅急便コンパクト" },
        { code: 9, name: "宅急便コンパクトコレクト" }
    ]

    const options = states.map(
        (n) => (
            <option key={n.code} value={n.code}>
                {n.name}
            </option>
        )
    );

    let coolCate = [
        { code: 0, name: "通常" },
        { code: 1, name: "クール冷凍" },
        { code: 2, name: "クール冷蔵" }
    ]

    const coolOptions = coolCate.map(
        (n) => (
            <option key={n.code} value={n.code} >
                {n.name}
            </option>
        )
    )

    let timeZoneCate = [
        { code: '', name: "指定なし" },
        { code: '0812', name: "午前中" },
        { code: '1416', name: "14～16時" },
        { code: '1618', name: "16～18時" },
        { code: '1820', name: "18～20時" },
        { code: '1921', name: "19～21時" },
        { code: '0010', name: "午前10時まで" },
        { code: '0017', name: "午後5時まで" }
    ]


    const timeZoneOptions = timeZoneCate.map(
        (n) => (
            <option key={n.code} value={n.code} >
                {n.name}
            </option>
        )
    )


    return (
        <React.Fragment>
            <header>
                <nav>
                    <div className='header-inner'>追加依頼サポートシステム</div>
                </nav>
            </header>
            <main>
                <table>
                    <tr>
                        <th>お客様管理番号</th>
                        <td>
                            <input type='text' value={src.order_no} /></td>
                    </tr>

                    <tr>
                        <th>送り状種類</th>
                        <td>
                            <select >
                                {options}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>クール区分</th>
                        <td>
                            <select>
                                {coolOptions}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>伝票番号</th>
                        <td>
                            <input type='text' />
                        </td>
                    </tr>
                    <tr>
                        <th>出荷予定日</th>
                        <td>
                            <input type='date' value={src.dod} />
                        </td>
                    </tr>
                    <tr>
                        <th>お届け予定日</th><td>
                            <input type='date' value={src.due_date} />
                        </td>
                    </tr>
                    <tr>
                        <th>配達時間帯</th><td>
                            <select>
                                {timeZoneOptions}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>お届け先郵便番号</th><td>
                            <input type='text' />
                        </td>
                    </tr>
                    <tr>
                        <th>お届け先住所(都道府県)</th><td>
                            <input type='text' value={src.prefectures} />
                        </td>
                    </tr>
                    <tr>
                        <th>お届け先住所(市区町村)</th><td>
                            <input type='text' value={src.place} />
                        </td>
                    </tr>
                    <tr>
                        <th>お届け先住所(番地、その他)</th><td>
                            <input type='text' />
                        </td>
                    </tr>
                    <tr>
                        <th>お届け先名(監督)</th><td>
                            <input type='text' value={src.director_name} />
                        </td>
                    </tr>
                    <tr>
                        <th>お届け先名(ｶﾅ)</th><td>
                            <input type='text' />
                        </td>
                    </tr>
                    <tr>
                        <th>敬称</th><td>
                            <input type='text' value='様' />
                        </td>
                    </tr>
                    <tr>
                        <th>お届け先電話番号</th><td>
                            <input type='text' value={src.director_tel_name} />
                        </td>
                    </tr>
                    <tr>
                        <th>お届け先名(基礎業者)</th><td>
                            <input type='text' value={src.foundation_contractor_name} />
                        </td>
                    </tr>
                    <tr>
                        <th>お届け先名(ｶﾅ)</th><td>
                            <input type='text' />
                        </td>
                    </tr>
                    <tr>
                        <th>敬称</th><td>
                            <input type='text' value='様' />
                        </td>
                    </tr>
                    <tr>
                        <th>お届け先電話番号</th><td>
                            <input type='text' value={src.foundation_contractor_tel_number} />
                        </td>
                    </tr>
                    <tr>
                        <th>ご依頼主電話番号</th><td>
                            <input type='text' value={src.order_no} />
                        </td>
                    </tr>
                    <tr>
                        <th>ご依頼主郵便番号</th><td>
                            <input type='text' value={src.order_no} />
                        </td>
                    </tr>
                    <tr>
                        <th>ご依頼主住所</th><td>
                            <input type='text' value={src.order_no} />
                        </td>
                    </tr>
                    <tr>
                        <th>ご依頼主名</th><td>
                            <input type='text' value={src.order_no} />
                        </td>
                    </tr>
                    <tr>
                        <th>ご依頼主名(ｶﾅ)</th><td>

                            <input type='text' />
                        </td>
                    </tr>
                    <tr>
                        <th>品名１</th><td>
                            <input type='text' value={src.cate} />
                        </td>
                    </tr>
                    <tr>
                        <th></th><td>
                            <input type='text' />
                        </td>
                    </tr>
                </table>
            </main>
        </React.Fragment >
    )
}

export default Invoice
