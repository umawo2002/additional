export const wareki = (dt) => {

    return '2021-01-01'
}

export const tagColor = color_number => {
    let back_color
    switch (color_number) {
        case "0": back_color = "glay"; break
        case "1": back_color = "green"; break
        case "2": back_color = "red"; break
        case "3": back_color = "blue"; break
        default: back_color = "glay";
    }
    return back_color
}

export const dateYMD = date => {
    const dt = new Date(date)
    return dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate()
}