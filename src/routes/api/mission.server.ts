import { Game } from '../game';
import { Player, Station } from '../objects';

const game = Game.getInstance();

export async function POST(event) {
    const body = await event.request.json();
    const { player_id, lat, long } = body;

    const player = game.getPlayer(player_id) as Player;
    player.location = { lat, long };
    const team = game.getPlayerTeam(player);
    const station = game.getMission(team) as Station;

    if (game.isNearStation(player, station)) {
        game.takeStation(station, player);
        game.giveMission(team, game.getRandomStation() as Station);
    };

    return {
        status: 200,
        body: {
            message: 'Player location updated',
        }
    };
}