import { generateUUID } from '../../../utils';
import { Player, Station, Team } from '../../../objects';
import { Game } from '../../../game';
import type { RequestEvent } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

const game = Game.getInstance();

export async function POST(event: RequestEvent) {
    const body = await event.request.json();
    const { name, email, team_id } = body;

    const player = new Player(generateUUID(), name, 0, 0, email);
    game.addGameObjects(player);
    const team = game.getTeam(team_id) as Team;
    game.addTeamPlayer(team, player);
    return json({
        id: player.id
    });
}

export async function GET(event: RequestEvent) {
    const url = new URL(event.request.url);
    const player_id = url.searchParams.get('player_id') as string;

    const player = game.getPlayer(player_id) as Player;
    const team = game.getPlayerTeam(player);
    const taken = game.getPlayerTakenStations(player);
    const score = game.getPlayerScore(player);
    const station = game.getMission(team) as Station;

    return json({
        player,
        team,
        taken,
        score,
        station,
    });
}