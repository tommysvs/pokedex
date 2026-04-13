const Card = (
    {
        cardHeader = null,
        cardBody = null,
        cardFooter = null,
    }
) => {
    return (
        <div className="w-72 shrink-0 flex flex-col rounded-lg text-gray-800 shadow-md">
            {cardHeader}
            {cardBody}
            {cardFooter}
        </div>
    )
}

export default Card;