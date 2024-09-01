export default function Button({btnClass, title, onClick, disabled}) {
    return (
        <button onClick={onClick} className={`btn ${btnClass}`} disabled={disabled}>{title}</button>
    )
}