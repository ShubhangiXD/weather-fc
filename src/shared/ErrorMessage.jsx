import React from 'react'

export const ErrorMessage = () => {
    return (
        <div className="toast toast-bottom toast-end">
            <div className="alert alert-error justify-center rounded-none border-red-700">
                <span className="font-Kanit flex justify-center">Error! City not found.</span>
            </div>
        </div>
    )
}
