import pokeball from '../assets/pokeball.png';

const Footer = () => (
    <footer className="bg-slate-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
                <img src={pokeball} alt="Pokeball" className="h-6 w-6 object-contain" />
                <span className="font-extrabold tracking-wide">Pokédex</span>
            </div>
            <p className="text-sm text-slate-300 text-center">
                &copy; 2026 All rights reserved.
            </p>
        </div>
    </footer>
);

export default Footer;