import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './print.css'
import Labels from './Labels'

const Previews = ({ cid, order }) => {
    // const componentRef = useRef();
    const [tagInfo, getTagInfo] = useState([])
    console.log(order)

    useEffect(() => {
        axios.get(`http://sv8/api/additional/getLabelsInfo/${cid}/${order}`)
            .then(response => {
                console.log(response.data)
                getTagInfo(response.data)
            })
    }, [])

    return (
        <>
            {tagInfo.map((val) => {
                return <Labels props={val} />
            })
            }
        </>
    )
}

// Print.propTypes = {
//     classes: PropTypes.object.isRequired,
//     src: PropTypes.object.isRequired
// };

// export default withStyles(styles)(Previews);

export default Previews