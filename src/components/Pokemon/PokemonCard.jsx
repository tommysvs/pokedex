import Card from '../Cards/Card';
import CardHeader from '../Cards/CardHeader';
import CardBody from '../Cards/CardBody';
import CardFooter from '../Cards/CardFooter';
import { useNavigate } from 'react-router';

const PokemonCard = (
    {
        data
    }
)=>{
    const redirectTo = useNavigate();

    const getStat = (statName) => (
      data?.stats?.find((item) => item?.stat?.name === statName)?.base_stat ?? '-'
    );

    const hp = getStat('hp');
    const atk = getStat('attack');
    const def = getStat('defense');

    const statPercent = (value) => {
      const maxBaseStat = 180;
      return Math.max(0, Math.min(100, Math.round((Number(value) / maxBaseStat) * 100)));
    };

    const types = data?.types?.map((item) => item?.type?.name).filter(Boolean) ?? [];
    const primaryType = data?.types?.find((item) => item?.slot === 1)?.type?.name ?? types[0];

    const headerTypeColor = {
      normal: 'bg-stone-500',
      fire: 'bg-orange-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-500',
      grass: 'bg-green-600',
      ice: 'bg-cyan-400',
      fighting: 'bg-red-700',
      poison: 'bg-violet-600',
      ground: 'bg-amber-600',
      flying: 'bg-sky-500',
      psychic: 'bg-pink-500',
      bug: 'bg-lime-600',
      rock: 'bg-yellow-700',
      ghost: 'bg-indigo-700',
      dragon: 'bg-indigo-500',
      dark: 'bg-neutral-800',
      steel: 'bg-slate-500',
      fairy: 'bg-rose-400'
    };

    const headerTypePattern = {
      normal: 'from-stone-500 to-stone-700',
      fire: 'from-orange-500 to-red-600',
      water: 'from-sky-500 to-blue-700',
      electric: 'from-yellow-400 to-amber-500',
      grass: 'from-green-500 to-emerald-700',
      ice: 'from-cyan-300 to-sky-500',
      fighting: 'from-red-600 to-rose-800',
      poison: 'from-violet-500 to-purple-700',
      ground: 'from-amber-500 to-yellow-700',
      flying: 'from-sky-400 to-cyan-600',
      psychic: 'from-pink-500 to-fuchsia-700',
      bug: 'from-lime-500 to-green-700',
      rock: 'from-yellow-600 to-amber-800',
      ghost: 'from-indigo-500 to-indigo-800',
      dragon: 'from-indigo-400 to-blue-700',
      dark: 'from-zinc-700 to-zinc-900',
      steel: 'from-slate-400 to-slate-700',
      fairy: 'from-rose-400 to-pink-600'
    };

    const hoverGlowByType = {
      normal: 'hover:shadow-[0_0_36px_rgba(120,113,108,0.45)]',
      fire: 'hover:shadow-[0_0_38px_rgba(249,115,22,0.5)]',
      water: 'hover:shadow-[0_0_38px_rgba(14,165,233,0.5)]',
      electric: 'hover:shadow-[0_0_40px_rgba(250,204,21,0.55)]',
      grass: 'hover:shadow-[0_0_38px_rgba(34,197,94,0.5)]',
      ice: 'hover:shadow-[0_0_38px_rgba(103,232,249,0.5)]',
      fighting: 'hover:shadow-[0_0_38px_rgba(220,38,38,0.5)]',
      poison: 'hover:shadow-[0_0_38px_rgba(139,92,246,0.5)]',
      ground: 'hover:shadow-[0_0_38px_rgba(245,158,11,0.5)]',
      flying: 'hover:shadow-[0_0_38px_rgba(56,189,248,0.5)]',
      psychic: 'hover:shadow-[0_0_38px_rgba(236,72,153,0.5)]',
      bug: 'hover:shadow-[0_0_38px_rgba(132,204,22,0.5)]',
      rock: 'hover:shadow-[0_0_38px_rgba(202,138,4,0.5)]',
      ghost: 'hover:shadow-[0_0_38px_rgba(99,102,241,0.5)]',
      dragon: 'hover:shadow-[0_0_38px_rgba(129,140,248,0.5)]',
      dark: 'hover:shadow-[0_0_38px_rgba(63,63,70,0.5)]',
      steel: 'hover:shadow-[0_0_38px_rgba(148,163,184,0.5)]',
      fairy: 'hover:shadow-[0_0_38px_rgba(251,113,133,0.5)]'
    };

    const headerPatternClass = headerTypePattern[primaryType] ?? 'from-green-500 to-emerald-700';
    const hoverGlowClass = hoverGlowByType[primaryType] ?? 'hover:shadow-[0_0_38px_rgba(16,185,129,0.5)]';

    const formatText = (value) => (
      value
        ?.split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );

    const imageUrl =
      data?.sprites?.other?.['official-artwork']?.front_default ||
      data?.sprites?.front_default ||
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data?.id}.png`;

    const goToDetail = () => {
      redirectTo(`/pokemon/${data?.id}`);
    };

    const handleCardKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        goToDetail();
      }
    };

    return (
        <div
          className={`cursor-pointer rounded-2xl transition-shadow duration-300 ${hoverGlowClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2`}
                role="button"
                tabIndex={0}
                onClick={goToDetail}
                onKeyDown={handleCardKeyDown}
                aria-label={`Open details for ${formatText(data?.name) || 'pokemon'}`}
        >
        <Card
                cardHeader={(
                  <CardHeader>
                    <div className={`relative flex flex-col justify-center items-center w-full rounded-t-lg bg-gradient-to-r ${headerPatternClass} p-2 pb-8`}>
                      <img
                        className="w-24 h-24 translate-y-1/3 -mb-8 object-cover rounded-full bg-white shadow-lg ring-4 ring-white/90"
                        src={imageUrl}
                        alt={data?.name || 'pokemon'}
                      />
                    </div>
                  </CardHeader>
                )}
                cardBody={(
                  <CardBody>
                    <section className="mt-10 px-4">
                      <div className="flex justify-between items-center">
                        <span className="font-black bg-slate-200 text-slate-700 px-2.5 py-1 rounded-md">{`#${data?.id ?? '-'}`}</span>
                        <span className="flex gap-2">
                          {types.map((typeName) => (
                            <span key={typeName} className={`inline-block px-2.5 py-1.5 text-xs font-bold uppercase tracking-wide ${headerTypeColor[typeName] ?? 'bg-green-600'} text-white rounded-lg`}>
                              {formatText(typeName)}
                            </span>
                          ))}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-center py-4 text-2xl font-black tracking-tight text-slate-800">{formatText(data?.name) || '-'}</h2>
                      </div>
                      <div className="rounded-xl bg-slate-100/90 px-3 py-3 w-full space-y-2.5">
                        {[['HP', hp], ['ATK', atk], ['DEF', def]].map(([label, value]) => (
                          <div key={label}>
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-slate-700">{label}</span>
                              <span className="font-extrabold text-slate-800">{value}</span>
                            </div>
                            <div className="mt-1 h-1.5 w-full rounded-full bg-slate-300">
                              <div
                                className={`h-full rounded-full bg-gradient-to-r ${headerPatternClass}`}
                                style={{ width: `${statPercent(value)}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                    </section>
                  </CardBody>
                )}
                cardFooter={(
                  <CardFooter>
                    <div className="mx-4 mt-4 mb-3 rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                      Tap Card For Details {'>'}
                    </div>
                  </CardFooter>
                )}
              />
        </div>
    );
}

export default PokemonCard;