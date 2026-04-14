import { useState } from 'react';
import { useNavigate } from 'react-router';
import pokeball from '../assets/pokeball.png';

const NAV_LINKS = [
    { label: 'Pokemon catalog', path:"/" },
    { label: 'About us', path:"/about" },
];

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const redirectTo = useNavigate();
    
    return (
        <header className="sticky top-3 z-50 bg-transparent text-inherit font-normal">
            <div className="mx-auto max-w-7xl px-4 md:px-0">
                <div className="relative overflow-hidden rounded-2xl border border-slate-600/55 bg-slate-950/82 text-slate-100 shadow-[0_8px_22px_rgba(2,6,23,0.28)] backdrop-blur-xl">
                    <div className="pointer-events-none absolute -left-8 -top-10 h-20 w-20 rounded-full bg-slate-500/30 blur-2xl" />
                    <div className="pointer-events-none absolute -right-8 -bottom-10 h-24 w-24 rounded-full bg-slate-400/20 blur-2xl" />

                    <div className="relative mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <img src={pokeball} alt="Pokeball" className="h-8 w-8 object-contain" />
                        </div>

                        <nav className="hidden md:block">
                            <ul className="flex items-center gap-1">
                                {NAV_LINKS.map(({ label, path }) => (
                                    <li key={label}>
                                        <button
                                            className="px-4 py-2 rounded-md text-sm font-semibold text-slate-200 hover:bg-slate-700/50 hover:text-white transition-colors cursor-pointer"
                                            onClick={()=>{redirectTo(path)}}
                                        >
                                            {label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <button
                            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded hover:bg-slate-700/70 transition-colors"
                            onClick={() => setMenuOpen((prev) => !prev)}
                            aria-label="Toggle menu"
                            aria-expanded={menuOpen}
                        >
                            <span className={`block w-5 h-0.5 bg-slate-200 transition-transform duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
                            <span className={`block w-5 h-0.5 bg-slate-200 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                            <span className={`block w-5 h-0.5 bg-slate-200 transition-transform duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
                        </button>
                    </div>

                    <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-60' : 'max-h-0'}`}>
                        <nav className="border-t border-slate-700/55 bg-slate-950/90 px-4 pb-3 backdrop-blur-xl">
                            <ul className="flex flex-col gap-1 pt-2">
                                {NAV_LINKS.map(({ label, path }) => (
                                    <li key={label}>
                                        <button
                                            className="w-full text-left px-4 py-2 rounded-md text-sm font-semibold text-slate-200 hover:bg-slate-700/50 transition-colors cursor-pointer"
                                            onClick={()=>{redirectTo(path)}}
                                        >
                                            {label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;