import React from "react";
export const Button = (props) => {
    const className = props.className + "rounded-none text-white";
    const name = props.buttonname;
    return (
        <div>
            <button className={className} {...props}>
                {name}
            </button>
        </div>
    );
};

export default Button;