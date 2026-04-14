import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { usePokemonService } from "../context/Context";

const TYPE_STYLE = {
    normal: "bg-stone-500",
    fire: "bg-orange-500",
    water: "bg-blue-500",
    electric: "bg-yellow-500",
    grass: "bg-green-600",
    ice: "bg-cyan-400",
    fighting: "bg-red-700",
    poison: "bg-violet-600",
    ground: "bg-amber-600",
    flying: "bg-sky-500",
    psychic: "bg-pink-500",
    bug: "bg-lime-600",
    rock: "bg-yellow-700",
    ghost: "bg-indigo-700",
    dragon: "bg-indigo-500",
    dark: "bg-neutral-800",
    steel: "bg-slate-500",
    fairy: "bg-rose-400"
};

const HERO_STYLE = {
    normal: "from-stone-500 to-stone-700",
    fire: "from-orange-500 to-red-600",
    water: "from-sky-500 to-blue-700",
    electric: "from-yellow-400 to-amber-500",
    grass: "from-green-500 to-emerald-700",
    ice: "from-cyan-300 to-sky-500",
    fighting: "from-red-600 to-rose-800",
    poison: "from-violet-500 to-purple-700",
    ground: "from-amber-500 to-yellow-700",
    flying: "from-sky-400 to-cyan-600",
    psychic: "from-pink-500 to-fuchsia-700",
    bug: "from-lime-500 to-green-700",
    rock: "from-yellow-600 to-amber-800",
    ghost: "from-indigo-500 to-indigo-800",
    dragon: "from-indigo-400 to-blue-700",
    dark: "from-zinc-700 to-zinc-900",
    steel: "from-slate-400 to-slate-700",
    fairy: "from-rose-400 to-pink-600"
};

const formatText = (value) => (
    value
        ?.split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
);

const statPercent = (value) => {
    const maxBaseStat = 180;
    return Math.max(0, Math.min(100, Math.round(((value ?? 0) / maxBaseStat) * 100)));
};

export const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const pokemonServiceInstance = usePokemonService();

    const [pokemonData, setPokemonData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const pokemonId = Number(id);

        if (!pokemonServiceInstance || Number.isNaN(pokemonId)) {
            setHasError(true);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setHasError(false);

        const cachedPokemon = pokemonServiceInstance.GetPokemonById(pokemonId);
        if (cachedPokemon?.id) {
            if (isMounted) {
                setPokemonData(cachedPokemon);
                setIsLoading(false);
            }
            return () => {
                isMounted = false;
            };
        }

        pokemonServiceInstance
            .FetchId(pokemonId)
            .then((data) => {
                if (isMounted) {
                    setPokemonData(data);
                    setIsLoading(false);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setHasError(true);
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [id, pokemonServiceInstance]);

    const types = useMemo(
        () => pokemonData?.types?.map((item) => item?.type?.name).filter(Boolean) ?? [],
        [pokemonData]
    );

    const primaryType = useMemo(
        () => pokemonData?.types?.find((item) => item?.slot === 1)?.type?.name ?? types[0],
        [pokemonData, types]
    );

    const imageUrl =
        pokemonData?.sprites?.other?.["official-artwork"]?.front_default ||
        pokemonData?.sprites?.front_default ||
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData?.id}.png`;

    if (isLoading) {
        return (
            <section className="mx-auto max-w-7xl px-4 py-10">
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
                    <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-sky-100" />
                    <div className="absolute -bottom-10 -left-10 h-44 w-44 rounded-full bg-emerald-100" />
                    <div className="relative flex flex-col items-center gap-4 py-16">
                        <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-slate-700" />
                        <p className="text-sm font-semibold tracking-wide text-slate-600">Loading Pokémon profile...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (hasError || !pokemonData?.id) {
        return (
            <section className="mx-auto max-w-7xl px-4 py-10">
                <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center shadow-sm">
                    <h1 className="text-2xl font-black text-rose-700">We could not load this Pokémon</h1>
                    <p className="mt-2 text-rose-600">Try again in a moment or return to the catalog.</p>
                    <button
                        onClick={() => navigate("/")}
                        className="mt-6 rounded-xl bg-rose-600 px-5 py-3 font-bold text-white transition hover:bg-rose-700"
                    >
                        Back to Catalog
                    </button>
                </div>
            </section>
        );
    }

    const gradientClass = HERO_STYLE[primaryType] ?? "from-emerald-500 to-teal-700";
    const statList = pokemonData?.stats ?? [];
    const abilities = pokemonData?.abilities?.map((entry) => entry?.ability?.name).filter(Boolean) ?? [];
    const moves = pokemonData?.moves?.map((entry) => entry?.move?.name).filter(Boolean).slice(0, 8) ?? [];
    const previousId = pokemonData.id > 1 ? pokemonData.id - 1 : null;
    const nextId = pokemonData.id + 1;

    return (
        <section className="mx-auto max-w-7xl px-4 py-8 md:py-10">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 via-white to-cyan-50 p-1 shadow-xl">
                <div className="absolute inset-0 opacity-35 [background:radial-gradient(circle_at_20%_20%,rgba(255,255,255,.7),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(14,165,233,.2),transparent_40%)]" />

                <div className="relative rounded-[22px] bg-white/80 backdrop-blur-sm">
                    <div className={`relative overflow-hidden rounded-t-[22px] bg-gradient-to-r ${gradientClass} px-6 py-8 md:px-10 md:py-10`}>
                        <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
                            <div>
                                <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/80">Pokémon detail</p>
                                <h1 className="mt-1 text-4xl font-black text-white md:text-5xl">{formatText(pokemonData?.name)}</h1>
                                <p className="mt-3 inline-flex rounded-lg bg-white/20 px-3 py-1 text-sm font-semibold text-white">
                                    #{pokemonData?.id}
                                </p>
                            </div>

                            <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm md:mx-0 md:h-52 md:w-52">
                                <img
                                    src={imageUrl}
                                    alt={pokemonData?.name || "pokemon"}
                                    className="h-40 w-40 object-contain drop-shadow-2xl md:h-48 md:w-48"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-5 p-6 md:grid-cols-[1.2fr_.8fr] md:p-8">
                        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-extrabold text-slate-800">Base stats</h2>
                            <div className="mt-4 space-y-3">
                                {statList.map((item) => {
                                    const statName = formatText(item?.stat?.name);
                                    const statValue = item?.base_stat ?? 0;
                                    const percentage = statPercent(statValue);

                                    return (
                                        <div key={item?.stat?.name}>
                                            <div className="mb-1 flex items-center justify-between text-sm">
                                                <span className="font-semibold text-slate-700">{statName}</span>
                                                <span className="font-bold text-slate-800">{statValue}</span>
                                            </div>
                                            <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                                                <div
                                                    className={`h-full rounded-full bg-gradient-to-r ${gradientClass}`}
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </article>

                        <aside className="space-y-5">
                            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <h2 className="text-lg font-extrabold text-slate-800">Type</h2>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {types.map((typeName) => (
                                        <span
                                            key={typeName}
                                            className={`rounded-lg px-3 py-2 text-sm font-bold text-white ${TYPE_STYLE[typeName] ?? "bg-emerald-600"}`}
                                        >
                                            {formatText(typeName)}
                                        </span>
                                    ))}
                                </div>
                            </article>

                            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <h2 className="text-lg font-extrabold text-slate-800">Abilities</h2>
                                <ul className="mt-3 space-y-2">
                                    {abilities.map((abilityName) => (
                                        <li
                                            key={abilityName}
                                            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700"
                                        >
                                            {formatText(abilityName)}
                                        </li>
                                    ))}
                                </ul>
                            </article>

                            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <h2 className="text-lg font-extrabold text-slate-800">Physical data</h2>
                                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                                    <div className="rounded-xl bg-slate-100 p-3">
                                        <p className="font-semibold text-slate-500">Height</p>
                                        <p className="mt-1 text-lg font-black text-slate-800">{(pokemonData?.height ?? 0) / 10} m</p>
                                    </div>
                                    <div className="rounded-xl bg-slate-100 p-3">
                                        <p className="font-semibold text-slate-500">Weight</p>
                                        <p className="mt-1 text-lg font-black text-slate-800">{(pokemonData?.weight ?? 0) / 10} kg</p>
                                    </div>
                                </div>
                            </article>
                        </aside>
                    </div>

                    <div className="border-t border-slate-200 px-6 py-6 md:px-8">
                        <h2 className="text-lg font-extrabold text-slate-800">Featured moves</h2>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {moves.map((moveName) => (
                                <span
                                    key={moveName}
                                    className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700"
                                >
                                    {formatText(moveName)}
                                </span>
                            ))}
                        </div>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <button
                                onClick={() => navigate("/")}
                                className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 cursor-pointer transition hover:bg-slate-100"
                            >
                                Back to Catalog
                            </button>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => previousId && navigate(`/pokemon/${previousId}`)}
                                    disabled={!previousId}
                                    className="rounded-xl border border-slate-300 px-4 py-3 font-bold text-slate-700 cursor-pointer transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => navigate(`/pokemon/${nextId}`)}
                                    className={`rounded-xl px-4 py-3 font-bold text-white shadow-sm cursor-pointer transition hover:brightness-110 ${TYPE_STYLE[primaryType] ?? "bg-emerald-600"}`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Detail;