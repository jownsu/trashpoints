import React from 'react'

const myFunctions = {
    getErrors: (errors) => {
        const errorList = []

        for (const key in errors) {
            errorList.push(errors[key][0])                           
        }

        return errorList
    }
}

export default myFunctions

