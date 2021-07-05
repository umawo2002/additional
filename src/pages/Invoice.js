import React, { useContext, useState, useRef } from 'react'
import { CSVLink } from 'react-csv';
import AppContext from '../contexts/AppContext'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Grid from '@material-ui/core/Grid';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ja from "date-fns/locale/ja"
import { headers } from '../data/invoice_data'
import { getDay } from 'date-fns';
import { dateYMD } from '../utils/common'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const Invoice = () => {
    const classes = useStyles()
    const { state } = useContext(AppContext)

    const src = state.additionalData[0]

    const [manageNo, setManageNo] = useState(src.order_no)
    const [selectedDate, setSelectedDate] = useState(dateYMD(Date()))
    const [selectedDueDate, setSelectedDueDate] = useState(src.due_date);
    const [timeZoneCateStatus, setTimeZoneCateStatus] = useState('')
    const [distPostNo, setDistPostNo] = useState('')
    const [distPrefectures, setDistPrefectures] = useState(src.prefectures)
    const [distPlace, setDistPlace] = useState(src.place)
    const [distPlace2, setDistPlace2] = useState('')
    const [distName, setDistName] = useState(src.dist_name)
    const [distTelNo, setDistTelNo] = useState(src.dist_tel_no)
    const [srcTelNo, setSrcTelNo] = useState('0297-27-1611')
    const [srcPostNo, setSrcPostNo] = useState('303-0046')
    const [srcAddress, setSrcAddress] = useState('茨城県常総市内守谷町きぬの里1-3-3')
    const [srcName, setSrcName] = useState('潮田 正人')
    const [hinName, setHinName] = useState(src.cate_name)

    const [isSubmit, setIsSubmit] = useState(false)

    const [dat, setDat] = useState([])

    // const submitRef = useRef()

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
    const handleDateChange = (date) => {
        setSelectedDate(dateYMD(date))
        console.log(selectedDate)
    };

    const handleDueDateChange = (date) => {
        setSelectedDueDate(dateYMD(date))
        console.log(selectedDueDate)
    };

    const handleSubmit = (e) => {
        setDat([
            {
                orderNo: manageNo,
                invoiceCate: "0",
                coolCate: "0",
                shipDate: selectedDate,
                dueDate: selectedDueDate,
                timeZone: timeZoneCateStatus,
                distTelNo: distTelNo,
                distPostNo: distPostNo,
                distAddress: distPrefectures + distPlace + distPlace2,
                distName: distName,
                distKeisyou: "様",
                srcTelNo: srcTelNo,
                srcPostNo: srcPostNo,
                srcAddress: srcAddress,
                srcName: srcName,
                srcHinName: hinName,
                custCode: "029727161101",
                unchinCode: "01"
            }
        ])
        console.log(dat)
        setIsSubmit(!isSubmit)
        // isSubmit && 
        // setTimeout(
        //     submitRef.current.link.click(), 1000
        // )
        e.preventDefault();
    }

    return (
        <React.Fragment>
            {/* <header>
                <nav>
                    <div className='header-inner'>追加依頼サポートシステム</div>
                </nav>
            </header> */}
            <main>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <div style={{ padding: 20 }}>
                        <Grid container spacing={3}>
                            <Grid container item xs={12} spacing={1}>
                                <TextField required label="お客様管理番号(受注番号など)" defaultValue={manageNo} onChange={setManageNo} />
                            </Grid>
                            <Grid container item xs={12} spacing={1}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ja}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="yyyy/MM/dd"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="出荷予定日"
                                        value={selectedDate}
                                        minDate={new Date()}
                                        onChange={date => handleDateChange(date)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>

                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ja}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="yyyy/MM/dd"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="お届け予定日"
                                        value={selectedDueDate}
                                        onChange={date => handleDueDateChange(date)}
                                        minDate={new Date()}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>


                                <InputLabel variant="standard" htmlFor="timeZoneCate">
                                    配達時間帯
                                </InputLabel>
                                <NativeSelect
                                    defaultValue={timeZoneCateStatus}
                                    onChange={(e) => setTimeZoneCateStatus(e.target.value)}
                                    inputProps={{
                                        name: 'timeZoneCate',
                                        id: 'timeZoneCate',
                                    }}
                                >
                                    {timeZoneCate.map((n) =>
                                        <option value={n.code}>
                                            {n.name}
                                        </option>
                                    )
                                    }
                                </NativeSelect>
                            </Grid>
                            <Grid container item xs={12} spacing={1}>
                                <TextField required label="お届け先郵便番号" defaultValue={distPostNo} onChange={(e) => setDistPostNo(e.target.value)} />
                                <TextField required label="お届け先住所(都道府県)" defaultValue={distPrefectures} onChange={(e) => setDistPrefectures(e.target.value)} />
                                <TextField required label="お届け先住所(市区町村)" defaultValue={distPlace} onChange={(e) => setDistPlace(e.target.value)} />
                                <TextField required label="お届け先住所(番地、その他)" defaultValue={distPlace2} onChange={(e) => setDistPlace2(e.target.value)} />
                            </Grid>
                            <Grid container item xs={12} spacing={1}>
                                <TextField required label={'お届け先(' + src.orderer + ')'} defaultValue={distName} onChange={(e) => setDistName(e.target.value)} />
                                <TextField required label={'お届け先電話番号(' + src.orderer + ')'} defaultValue={distTelNo} onChange={(e) => setDistTelNo(e.target.value)} />
                            </Grid>
                            <Grid container item xs={12} spacing={1}>
                                <TextField required label="ご依頼主電話番号" defaultValue={srcTelNo} onChange={(e) => setSrcTelNo(e.target.value)} />
                                <TextField required label="ご依頼主郵便番号" defaultValue={srcPostNo} onChange={(e) => setSrcPostNo(e.target.value)} />
                                <TextField required label="ご依頼主住所" defaultValue={srcAddress} onChange={(e) => setSrcAddress(e.target.value)} />
                                <TextField required label="ご依頼主名" defaultValue={srcName} onChange={(e) => setSrcName(e.target.value)} />
                            </Grid>
                            <Grid container item xs={12} spacing={1}>
                                <TextField required label="品名１" defaultValue={hinName} onChange={(e) => setHinName(e.target.value)} />
                            </Grid>
                        </Grid>
                        <button type="submit">CSV作成</button>
                        {isSubmit && <CSVLink data={dat} headers={headers} filename={manageNo + ".csv"}> 生成 </CSVLink>}
                    </div>
                </form>
            </main >
        </React.Fragment >
    )
}
export default Invoice
