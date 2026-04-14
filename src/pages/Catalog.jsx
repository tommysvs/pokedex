import { useState, useEffect } from 'react';
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
        <section className='mx-auto max-w-7xl px-4 md:px-0'>
            <div className="relative mt-6 overflow-hidden rounded-3xl border border-slate-600/55 bg-slate-950/82 p-6 shadow-[0_8px_22px_rgba(2,6,23,0.28)] md:p-8">
                <div className="absolute -left-10 -top-12 h-40 w-40 rounded-full bg-slate-500/25 blur-3xl" />
                <div className="absolute -right-14 -bottom-14 h-48 w-48 rounded-full bg-slate-400/20 blur-3xl" />
                <div className="relative">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-300">Pokémon Catalog</p>
                        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-100 md:text-5xl">Pokédex</h1>
                        <p className="mt-2 text-sm text-slate-200">Explore the catalog and open any Pokémon in one tap.</p>
                        <p className="mt-4 text-sm font-semibold text-slate-200">
                            Page <span className="font-black text-white">{page}</span> · Showing <span className="font-black text-white">{PokemonListData?.length ?? 0}</span> · Total <span className="font-black text-white">{totalItems || '-'}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative mt-6">
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