export const TypeFullOptions = {
    I_TYPE: {
        id: 'I_TYPE',
        dbType: 'i',
        label: 'い'
    },
    NA_TYPE: {
        id: 'NA_TYPE',
        dbType: 'na',
        label: 'な'
    }
}

export const TypeOptions = {
    I_TYPE: TypeFullOptions.I_TYPE.id,
    NA_TYPE: TypeFullOptions.NA_TYPE.id
}

export const AllTypeOptions = [TypeOptions.I_TYPE, TypeOptions.NA_TYPE]
export const DefaultTypeOptions = AllTypeOptions
export const AllDataTypes = [TypeFullOptions.I_TYPE.dbType, TypeFullOptions.NA_TYPE.dbType]

export const prepareTypeForDataFiltering = (typeOptions) => {
    let result = []
    typeOptions.forEach(id => {
        const fullType = Object.values(TypeFullOptions).find(t => t.id === id);
        result.push(fullType.dbType);
    });
    return result
}

export const getTypeLabel = (dbType) => {
    const fullType = Object.values(TypeFullOptions).find(t => t.dbType === dbType);
    return fullType ? fullType.label : "";
}