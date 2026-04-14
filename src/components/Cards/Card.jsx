const Card = (
    {
        cardHeader = null,
        cardBody = null,
        cardFooter = null,
    }
) => {
    return (
        <div className="group w-72 shrink-0 flex flex-col rounded-2xl border border-slate-200 bg-white text-gray-800 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            {cardHeader}
            {cardBody}
            {cardFooter}
        </div>
    )
}

export default Card;