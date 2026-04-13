import { useState } from 'react';
import { useNavigate } from 'react-router';
import pokeball from '../assets/pokeball.png';

const NAV_LINKS = [
    { label: 'Catalog', path:"/" },
    { label: 'About Us', path:"/about" },
];

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const redirectTo = useNavigate();
    
    return (
        <header className="bg-slate-800 text-white shadow-md">
            <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">

                <div className="flex items-center gap-2">
                    <img src={pokeball} alt="Pokeball" className="h-8 w-8 object-contain" />
                    <h1 className="text-xl font-extrabold tracking-wide">Pokédex</h1>
                </div>

                <nav className="hidden md:block">
                    <ul className="flex items-center gap-1">
                        {NAV_LINKS.map(({ label, path }) => (
                            <li key={label}>
                                <button
                                    className="px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
                                    onClick={()=>{redirectTo(path)}}
                                >
                                    {label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <button
                    className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded hover:bg-slate-700 transition-colors"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    <span className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
                    <span className={`block w-5 h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
                </button>
            </div>

            <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-60' : 'max-h-0'}`}>
                <nav className="bg-slate-900 px-4 pb-3">
                    <ul className="flex flex-col gap-1 pt-2">
                        {NAV_LINKS.map(({ label, path }) => (
                            <li key={label}>
                                <button
                                    className="w-full text-left px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors cursor-pointer"
                                    onClick={()=>{redirectTo(path)}}
                                >
                                    {label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;