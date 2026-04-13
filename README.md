# Pokédex

Pokédex is a web application built with React and Vite for exploring Pokémon through the public PokéAPI. It lets users browse a paginated catalog, open detailed Pokémon views, and move through the app with a simple responsive interface.

## Features

- Paginated Pokémon catalog.
- Cards with basic Pokémon information.
- Detail view by ID.
- Responsive navigation bar.
- Global layout with header and footer.
- PokéAPI data loading with in-memory caching to avoid repeated requests.

## Technologies

- React 19
- Vite
- React Router
- Tailwind CSS
- PokéAPI

## Requirements

- Node.js 18 or higher
- npm

## Project structure

```text
src/
├── components/
│   ├── Cards/
│   ├── Loaders/
│   ├── Paginator/
│   └── Pokemon/
├── context/
├── pages/
├── services/
├── App.jsx
├── main.jsx
└── index.css
```

## Routes

- `/` — Main catalog.
- `/about` — General information.
- `/pokemon/:id` — Pokémon detail page.

## API

The app consumes PokéAPI:

- List: https://pokeapi.co/api/v2/pokemon
- Detail: https://pokeapi.co/api/v2/pokemon/:id

## Notes

- The service keeps already loaded Pokémon in memory to reduce repeated requests.
- The app is set up to work as an SPA with React Router.

## License

Personal / Educational project.
