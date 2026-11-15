# Space Taxi 🚀

An educational browser game about the solar system, built with **TypeScript** and the **HTML5 Canvas API** — no game engine, no framework.

You are a taxi pilot in space. Pick up alien passengers, fly them to the right planet and answer a question about that planet to earn S-Bucks and unlock better rockets.

> First-year group project for the Object-Oriented Programming course, HBO-ICT at HZ University of Applied Sciences (2025–2026).

## Gameplay

- Fly your rocket through a solar system with orbiting planets
- Follow the minimap to the planet where a passenger is waiting
- Bring the alien to its destination, described by a hint ("the planet closest to the sun")
- Answer a multiple-choice question about the planet to earn **S-Bucks**
- Your rocket upgrades at 500, 1000 and 1500 S-Bucks
- Two levels, a timer and an end screen with your result

The in-game text and questions are in Dutch; the game is aimed at primary-school children.

### Controls

| Key | Action |
|---|---|
| Arrow keys / WASD | Steer the rocket |
| E | Land on a planet / interact |
| M | Enlarge or shrink the minimap |
| Mouse | Buttons and answers |

## Tech

- **TypeScript 5.8** in strict mode, compiled to ES modules
- **HTML5 Canvas** for all rendering
- **ESLint** with stylistic and JSDoc rules
- **GitHub Actions** workflow that builds the game and publishes it to GitHub Pages

## Architecture

The game is fully object-oriented. A class diagram is included: [`classdiagram-space-taxi.svg`](classdiagram-space-taxi.svg).

```
src/
├── app.ts, BaseGame.ts, Game.ts   game loop and entry point
├── data/                          planets, hints and questions (DTOs)
├── entities/
│   ├── movingItems/               Player, Planet (inherit from MovingItem)
│   ├── scene/                     Start, Instruction, Level one/two, OnPlanet, Status
│   └── Alien, Question, Flame, Speedometer
├── input/                         KeyListener, MouseListener
├── managers/                      NotificationManager
├── rendering/                     CanvasRenderer
└── utils/                         Vector2
```

- **Inheritance and abstract classes**: `CanvasItem → MovingItem → Player / Planet` and `Scene → SceneLevel → LevelOneScene / LevelTwoScene`
- **Scene pattern**: every screen is a scene with its own `processInput`, `update` and `render`
- **Composition**: a `Planet` owns its `Question` objects; data is kept apart from logic in `data/`

## Run it locally

Requires [Node.js](https://nodejs.org/) 22 or newer.

```bash
git clone https://github.com/Ashraf-Abdallah1/oop-team04.git
cd oop-team04
npm install
npm run build
```

Then serve the folder with any local web server, for example `npx serve .`, and open the shown address. Opening `index.html` straight from disk does not work, because the game uses ES modules.

Use `npm run watch` to recompile on every change.

## My contribution

I made the most commits in the team. My main work:

- Base classes `CanvasItem` and `MovingItem`, and the `Player` with movement and collision checks
- The scene structure (`Scene`, `SceneLevel`) and the second level
- Landing on a planet: the on-planet screen, the question flow and feedback on wrong answers
- The passenger delivery logic (which planet the alien wants to go to next)
- Timer, end screen and restarting the game
- Several refactoring rounds and the folder structure
- Fixing the GitHub Pages deployment workflow

## Team

Built by team 04: [Ashraf-Abdallah1](https://github.com/Ashraf-Abdallah1), [Arootsy](https://github.com/Arootsy), [RenzoMoretti](https://github.com/RenzoMoretti) and [verm0205](https://github.com/verm0205).

Based on the TypeScript game skeleton by HZ University of Applied Sciences.

## License

MIT, see [LICENSE](LICENSE).
