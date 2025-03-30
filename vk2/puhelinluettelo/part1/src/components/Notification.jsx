const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    if (message.includes("removed") === true) {
        return(
            <div className="warning">
                {message}
            </div> 
        )
    }

    return (
        <div className="message">
            {message}
        </div>
    )
}

export default Notification