import { Game } from '../../../game';
import { Player, Station } from '../../../objects';
import { json, error, RequestEvent } from '@sveltejs/kit';

const game = Game.getInstance();

export async function POST(event: RequestEvent) {
    const body = await event.request.json();
    const { player_id, lat, long } = body;

    const player = game.getPlayer(player_id) as Player;
    player.location = { lat, long };
    const team = game.getPlayerTeam(player);
    const station = game.getMission(team) as Station;
    let randomStation: Station;

    if (game.isNearStation(player, station)) {
        game.takeStation(station, player);
        randomStation = game.getRandomStation() as Station;
        game.giveMission(team, randomStation);
    }
    else {
        error(400, "You are not near the station");
    }

    return json(randomStation);
}