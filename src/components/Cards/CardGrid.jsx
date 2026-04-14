import './cardsCss.css';

const CardGrid = (
    { gridItems = null }
) => {
    return (
        <section className="w-full p-4 flex flex-wrap justify-center gap-4">
            {gridItems?.map(o=>o)}
        </section>
    );
}

export default CardGrid;