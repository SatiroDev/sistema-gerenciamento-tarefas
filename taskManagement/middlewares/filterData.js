export const filterData = (req, res, next) => {
    const data = req.body
    const filteredInformation = {}
    for (const field of Object.keys(data)) {
        if (typeof(data[field]) === 'string') {
            filteredInformation[field] = data[field].trim()
        } else {
            filteredInformation[field] = data[field]
        }
    }
    req.body = filteredInformation
    next()
}