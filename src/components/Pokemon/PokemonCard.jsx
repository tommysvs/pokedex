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

    const headerBgClass = headerTypeColor[primaryType] ?? 'bg-green-600';

    const headerTypePattern = {
      normal: {
        backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.18) 0 10%, transparent 11%), linear-gradient(135deg, #78716c, #57534e)'
      },
      fire: {
        backgroundImage: 'radial-gradient(circle at 20% 85%, rgba(255,220,140,0.35) 0 18%, transparent 19%), linear-gradient(145deg, #f97316, #dc2626)'
      },
      water: {
        backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25) 0 10%, transparent 11%), repeating-linear-gradient(155deg, rgba(255,255,255,0.14) 0 8px, transparent 8px 16px), linear-gradient(145deg, #0ea5e9, #2563eb)'
      },
      electric: {
        backgroundImage: 'linear-gradient(120deg, rgba(255,255,255,0.28) 0 12%, transparent 12% 40%, rgba(255,255,255,0.18) 40% 46%, transparent 46% 100%), linear-gradient(140deg, #facc15, #eab308)'
      },
      grass: {
        backgroundImage: 'repeating-linear-gradient(120deg, rgba(255,255,255,0.16) 0 7px, transparent 7px 15px), linear-gradient(180deg, #22c55e 0%, #15803d 100%)'
      },
      ice: {
        backgroundImage: 'linear-gradient(145deg, rgba(255,255,255,0.35) 0 20%, transparent 20% 100%), linear-gradient(145deg, #67e8f9, #22d3ee)'
      },
      fighting: {
        backgroundImage: 'linear-gradient(145deg, rgba(255,255,255,0.14) 0 25%, transparent 25% 100%), linear-gradient(145deg, #b91c1c, #7f1d1d)'
      },
      poison: {
        backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0 12%, transparent 13%), linear-gradient(145deg, #7c3aed, #6d28d9)'
      },
      ground: {
        backgroundImage: 'repeating-linear-gradient(170deg, rgba(255,255,255,0.12) 0 10px, transparent 10px 20px), linear-gradient(145deg, #d97706, #92400e)'
      },
      flying: {
        backgroundImage: 'radial-gradient(circle at 75% 20%, rgba(255,255,255,0.35) 0 12%, transparent 13%), linear-gradient(145deg, #38bdf8, #0284c7)'
      },
      psychic: {
        backgroundImage: 'radial-gradient(circle at 15% 35%, rgba(255,255,255,0.25) 0 9%, transparent 10%), linear-gradient(145deg, #ec4899, #be185d)'
      },
      bug: {
        backgroundImage: 'repeating-linear-gradient(145deg, rgba(255,255,255,0.14) 0 6px, transparent 6px 14px), linear-gradient(145deg, #65a30d, #3f6212)'
      },
      rock: {
        backgroundImage: 'repeating-linear-gradient(125deg, rgba(255,255,255,0.12) 0 9px, transparent 9px 17px), linear-gradient(145deg, #a16207, #713f12)'
      },
      ghost: {
        backgroundImage: 'linear-gradient(145deg, rgba(255,255,255,0.12) 0 35%, transparent 35% 100%), linear-gradient(145deg, #4338ca, #312e81)'
      },
      dragon: {
        backgroundImage: 'radial-gradient(circle at 82% 22%, rgba(255,255,255,0.2) 0 10%, transparent 11%), linear-gradient(145deg, #6366f1, #4338ca)'
      },
      dark: {
        backgroundImage: 'linear-gradient(145deg, rgba(255,255,255,0.07) 0 20%, transparent 20% 100%), linear-gradient(145deg, #27272a, #09090b)'
      },
      steel: {
        backgroundImage: 'repeating-linear-gradient(160deg, rgba(255,255,255,0.16) 0 8px, transparent 8px 16px), linear-gradient(145deg, #64748b, #475569)'
      },
      fairy: {
        backgroundImage: 'radial-gradient(circle at 75% 25%, rgba(255,255,255,0.28) 0 10%, transparent 11%), linear-gradient(145deg, #fb7185, #f43f5e)'
      }
    };

    const headerPatternStyle = headerTypePattern[primaryType] ?? {};

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

    return (
        <Card
                cardHeader={(
                  <CardHeader>
                    <div className={`flex flex-col justify-center items-center w-full rounded-t-lg ${headerBgClass} p-2`} style={headerPatternStyle}>
                      <img
                        className="w-24 h-24 translate-y-1/3 object-cover rounded-full shadow-md bg-white"
                        src={imageUrl}
                        alt={data?.name || 'pokemon'}
                      />
                    </div>
                  </CardHeader>
                )}
                cardBody={(
                  <CardBody>
                    <section className="mt-8 px-4">
                      <div className="flex justify-between items-center">
                        <span className="font-bold bg-slate-200 text-slate-700 px-2 py-1 rounded-md">{`#${data?.id ?? '-'}`}</span>
                        <span className="flex gap-2">
                          {types.map((typeName) => (
                            <span key={typeName} className={`inline-block px-3 py-2 ${headerTypeColor[typeName] ?? 'bg-green-600'} text-white rounded-lg`}>
                              {formatText(typeName)}
                            </span>
                          ))}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-center py-4 text-2xl font-bold">{formatText(data?.name) || '-'}</h2>
                      </div>
                      <div className="flex rounded-xl bg-teal-100 px-2 py-4 justify-center w-full">
                        <span className="flex flex-1 flex-col items-center">
                          <span className="text-red-800 font-bold">HP</span>
                          <span>{hp}</span>
                        </span>
                        <span className="flex flex-1 flex-col  items-center">
                          <span className="text-red-800 font-bold">ATK</span>
                          <span>{atk}</span>
                        </span>
                        <span className="flex flex-1 flex-col  items-center">
                          <span className="text-blue-600 font-bold">DEF</span>
                          <span>{def}</span>
                        </span>
                      </div>
                    </section>
                  </CardBody>
                )}
                cardFooter={(
                  <CardFooter>
                    <section className="flex">
                      <button
                        className={`flex-1 mx-4 mt-8 mb-2 px-4 py-3 ${headerBgClass} text-white font-bold rounded-sm`}
                        onClick={()=>{redirectTo(`/pokemon/${data?.id}`)}}
                      >Details</button>
                    </section>
                  </CardFooter>
                )}
              />
    );
}

export default PokemonCard;