import React from 'react'

export const Header = () => {
    return (
        <div className="text-white">
            <div className="flex justify-start items-center px-10">
                <p style={{ margin: "1rem 0 0 0 " }}>
                    <span class="material-symbols-outlined pr-3">
                        cyclone
                    </span>
                    <span className="font-Kanit text-3xl font-semibold">
                        Weather App
                    </span>
                </p>
            </div>
        </div>
    )
}
