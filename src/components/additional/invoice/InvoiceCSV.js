import React, { useState } from 'react'
import { CSVLink } from 'react-csv';
// import AppContext from '../../../contexts/AppContext'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
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
    },
    place3: {
        width: '10ch',
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
    const [distPlace3, setDistPlace3] = useState(src.tei_name + '????????????????????????')
    const [distPlace4, setDistPlace4] = useState(src.custname)
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
        { code: ' ', name: "????????????" },
        { code: '0812', name: "?????????" },
        { code: '1416', name: "14???16???" },
        { code: '1618', name: "16???18???" },
        { code: '1820', name: "18???20???" },
        { code: '1921', name: "19???21???" }
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
                distPlace3: distPlace3,
                distPlace4: distPlace4,
                distName: distName,
                distKeisyou: "???",
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
                                <TextField required label="?????????????????????(??????????????????)" defaultValue={manageNo} onChange={setManageNo} />
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ja}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="yyyy/MM/dd"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="???????????????"
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
                                        label="??????????????????"
                                        value={selectedDueDate}
                                        onChange={date => handleDueDateChange(date)}
                                        minDate={new Date()}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>

                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="simple-select-outlined-label" className={classes.selected}>???????????????</InputLabel>
                                    <Select className={classes.selected}
                                        labelId="simple-select-outlined-label"
                                        id="simple-select-outlined"
                                        defaultValue={timeZoneCateStatus}
                                        onChange={(e) => setTimeZoneCateStatus(e.target.value)}
                                        label="???????????????"
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
                                <TextField required label="????????????????????????" defaultValue={distPostNo} onChange={(e) => setDistPostNo(e.target.value)} />
                                <TextField required label="??????????????????(????????????)" defaultValue={distPrefectures} onChange={(e) => setDistPrefectures(e.target.value)} />
                                <TextField required label="??????????????????(????????????)" defaultValue={distPlace} onChange={(e) => setDistPlace(e.target.value)} />
                                <TextField required label="??????????????????(??????????????????)" defaultValue={distPlace2} onChange={(e) => setDistPlace2(e.target.value)} />
                            </Grid>
                            <Grid container item xs={12} spacing={1}>
                                <TextField style={{ width: '51ch' }} label="????????????????????????" defaultValue={distPlace4} onChange={(e) => setDistPlace4(e.target.value)} />
                                <TextField style={{ width: '51ch' }} label="????????????(?????????)" defaultValue={distPlace3} onChange={(e) => setDistPlace3(e.target.value)} />
                            </Grid>
                            <Grid container item xs={12} spacing={1}>
                                <TextField required label={'????????????(' + src.orderer + ')'} defaultValue={distName} onChange={(e) => setDistName(e.target.value)} />
                                <TextField required label={'????????????????????????(' + src.orderer + ')'} defaultValue={distTelNo} onChange={(e) => setDistTelNo(e.target.value)} />
                            </Grid>
                            <Grid container item xs={12} spacing={1}>
                                <TextField required label="????????????????????????" defaultValue={srcTelNo} onChange={(e) => setSrcTelNo(e.target.value)} />
                                <TextField required label="????????????????????????" defaultValue={srcPostNo} onChange={(e) => setSrcPostNo(e.target.value)} />
                                <TextField style={{ width: '30ch' }} required label="??????????????????" defaultValue={srcAddress} onChange={(e) => setSrcAddress(e.target.value)} />
                                <TextField style={{ width: '20ch' }} required label="???????????????" defaultValue={srcName} onChange={(e) => setSrcName(e.target.value)} />
                            </Grid>
                            <Grid container item xs={12} spacing={1}>
                                <TextField required label="?????????" defaultValue={hinName} onChange={(e) => setHinName(e.target.value)} />
                                <TextField fullWidth
                                    id="outlined-multiline-static"
                                    label="??????"
                                    multiline
                                    rows={2}
                                    cols={100}
                                    defaultValue={comment}
                                    onChange={e => setComment(e.target.value)}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" variant="contained" color="primary" size="large">CSV??????</Button>
                        {isSubmit && <CSVLink data={dat} headers={headers} filename={manageNo + ".csv"}> Download </CSVLink>}
                    </div>
                </form>
            </main >
        </>
    )
}
export default InvoiceCSV
