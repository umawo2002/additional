import React, { useContext, useState } from 'react'
import { CSVLink } from 'react-csv';
import AppContext from '../../../contexts/AppContext'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ja from "date-fns/locale/ja"
import { headers, ibaInvoice } from '../../../data/invoice_data'
import { dateYMD } from '../../../utils/common'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    formControl: {
        // backgroundColor: 'red',
        minWidth: 200,
        width: 260,
    },
    selected: {
        marginTop: 8,
        marginLeft: 10,
    },
    selectEmpty: {
        marginTop: theme.spacing(3),
    },
    comment: {
        width: '25ch',
    }
}));

const InvoiceCSV = ({ src }) => {
    const classes = useStyles()
    // const { state } = useContext(AppContext)
    // const src = state.additionalData[0]

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
    const [hinName, setHinName] = useState(src.cate_name)
    const [srcTelNo, setSrcTelNo] = useState(ibaInvoice.srcTelNo)
    const [srcPostNo, setSrcPostNo] = useState(ibaInvoice.srcPostNo)
    const [srcAddress, setSrcAddress] = useState(ibaInvoice.srcAddress)
    const [srcName, setSrcName] = useState(ibaInvoice.srcName)
    const [comment, setComment] = useState(ibaInvoice.srcComment)

    const [isSubmit, setIsSubmit] = useState(false)

    const [dat, setDat] = useState([])

    // const submitRef = useRef()

    let timeZoneCate = [
        { code: ' ', name: "指定なし" },
        { code: '0812', name: "午前中" },
        { code: '1416', name: "14～16時" },
        { code: '1618', name: "16～18時" },
        { code: '1820', name: "18～20時" },
        { code: '1921', name: "19～21時" }
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
                unchinCode: "01",
                comment: comment,
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
        <>
            <main>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <div style={{ padding: 20 }}>
                        <Grid container spacing={3}>
                            <Grid container item xs={12} spacing={1}>
                                <TextField required label="お客様管理番号(受注番号など)" defaultValue={manageNo} onChange={setManageNo} />
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


                                {/* <InputLabel variant="standard" htmlFor="timeZoneCate">
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
                                </NativeSelect> */}

                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="simple-select-outlined-label" className={classes.selected}>配達時間帯</InputLabel>
                                    <Select className={classes.selected}
                                        labelId="simple-select-outlined-label"
                                        id="simple-select-outlined"
                                        defaultValue={timeZoneCateStatus}
                                        onChange={(e) => setTimeZoneCateStatus(e.target.value)}
                                        label="配達時間帯"
                                    >
                                        {timeZoneCate.map((n) =>
                                            <MenuItem value={n.code}>
                                                {n.name}
                                            </MenuItem>
                                        )}
                                    </Select>
                                </FormControl>

                            </Grid>
                            <Divider />
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
                                <TextField fullWidth
                                    id="outlined-multiline-static"
                                    label="記事"
                                    multiline
                                    rows={2}
                                    cols={100}
                                    defaultValue={comment}
                                    onChange={e => setComment(e.target.value)}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" variant="contained" color="primary" size="large">CSV作成</Button>
                        {isSubmit && <CSVLink data={dat} headers={headers} filename={manageNo + ".csv"}> Download </CSVLink>}
                    </div>
                </form>
            </main >
        </>
    )
}
export default InvoiceCSV
