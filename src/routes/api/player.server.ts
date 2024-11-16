import { generateUUID } from '../utils';
import { Player, Station } from '../objects';
import { Game } from '../game';
import type { RequestEvent } from '@sveltejs/kit';

const game = Game.getInstance();

export async function POST(event: RequestEvent) {
    const body = await event.request.json();
    const { playerName, email } = body;

    const player = new Player(generateUUID(), playerName, 0, 0, email);
    game.addGameObjects(player);
}

export async function GET(event: RequestEvent) {
    const body = await event.request.json();
    const { player_id } = body;

    const player = game.getPlayer(player_id) as Player;
    const team = game.getPlayerTeam(player);
    const taken = game.getPlayerTakenStations(player);
    const score = game.getPlayerScore(player);
    const station = game.getMission(team) as Station;

    return {
        status: 200,
        body: {
            player,
            team,
            taken,
            score,
            station
        }
    };
}