import './cardsCss.css';

const CardGrid = (
    { gridItems = null }
) => {
    return (
        <section className="p-4 w-full flex flex-wrap gap-4 sm:flex-col md:flex-row">
            {gridItems?.map(o=>o)}
        </section>
    );
}

export default CardGrid;