export const I_TYPE = 'I_TYPE'
export const NA_TYPE = 'NA_TYPE'

export const I_DATATYPE = 'i'
export const NA_DATATYPE = 'na'

export const AllTypeOptions = [I_TYPE, NA_TYPE]
export const DefaultTypeOptions = AllTypeOptions
export const AllDataTypes = [I_DATATYPE, NA_DATATYPE]

export const prepareTypeForDataFiltering = (typeOptions) => {
    let result = []
    if (typeOptions.includes(I_TYPE))
        result.push('i')
    if (typeOptions.includes(NA_TYPE))
        result.push('na')
    return result
}

export const getTypeLabel = (adjType) => {
    switch (adjType) {
        case I_DATATYPE:
            return 'い'
        case NA_DATATYPE:
            return 'な'
        default:
            return ''
    }
}