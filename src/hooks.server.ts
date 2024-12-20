import { Team, Station } from './objects';
import { generateUUID } from './utils';
import { Game } from './game';

let game: Game = Game.getInstance();
let initialized = false;

const stations: Station[] = [
    new Station(generateUUID(), 'Station 1', 59.3293, 18.0686, 'src/assets/station1.png', 10),
    new Station(generateUUID(), 'Station 2', 59.3293, 18.0686, 'src/assets/station2.png', 20),
    new Station(generateUUID(), 'Station 3', 59.3295, 18.0688, 'src/assets/station3.png', 30),
    new Station(generateUUID(), 'Station 4', 59.3296, 18.0689, 'src/assets/station4.png', 40),
];

const teams: Team[] = [
    // Add colors to all teams
    new Team(generateUUID(), 'Cool dudes', 'blue'),
    new Team(generateUUID(), 'Awesome possums', 'green'),
    new Team(generateUUID(), 'Fantastic foxes', 'red'),
];

function giveTeamRandomMission(team: Team) {
    const station = game.getRandomStation() as Station;
    game.giveMission(team, station);
};

export async function handle({ event, resolve }) {
    if (!initialized) {
        console.log('Server started, initializing game state...');
        game = Game.getInstance();
        game.addGameObjects(...teams, ...stations);
        teams.forEach(team => giveTeamRandomMission(team));
        initialized = true;
    }

    return resolve(event);
}