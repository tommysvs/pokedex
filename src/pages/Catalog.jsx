import { useState, useEffect, useMemo } from 'react';
import CardGrid from '../components/Cards/CardGrid';
import PokemonCard from '../components/Pokemon/PokemonCard';
import Paginator from '../components/Paginator/Paginator';
import Loader from '../components/Loaders/Loader';
import { usePokemonService } from '../context/Context';


const Catalog = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [PokemonListData, setPokemonListData] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [totalItems, setTotalItems] = useState(0);
    const PokemonServiceInstance = usePokemonService();
    useEffect(
        () => {
            if (PokemonServiceInstance) {
                setIsFetching(true);
                PokemonServiceInstance.FetchList(page, limit, (list, total) => {
                    setPokemonListData(list);
                    setTotalItems(total);
                    setIsFetching(false);
                });
            }
        }
        , [page, limit, isLoaded, PokemonServiceInstance]
    );

    if (isLoaded && !PokemonListData) {
        setIsLoaded(true);
        return <div>Loading</div>
    }
    return (
        <section className='mx-auto max-w-7xl'>
            <div className="px-4 pt-6 pb-2 md:px-0">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">Pokédex</h1>
                <p className="mt-1 text-sm text-slate-500">Explore your collection of Pokémon.</p>
            </div>
            <div className="relative">
                {isFetching && <Loader />}
                <CardGrid
                    gridItems={PokemonListData?.map(o => {
                        return (
                            <PokemonCard data={o?.value} key={o?.value.id} />
                        );
                    })} />
            </div>
            <Paginator
                page={page}
                onPageChange={setPage}
                limit={limit}
                onLimitChange={setLimit}
                totalItems={totalItems}
            />
        </section>
    );
}

export default Catalog;