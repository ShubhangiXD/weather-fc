const Input = (props) => {
    const className = props.className;
    return (
        <div>
            <div className={className}>
                <label className="label" >
                    <span className="label-text font-Kanit text-lg text-white">{props.label}</span>
                </label>
                <input {...props} className="input text-black border-black rounded-none"
                />
            </div>
        </div>
    );
};

export default Input;