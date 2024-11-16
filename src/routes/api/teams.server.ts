import { Game } from '../game';
import type { RequestEvent } from '@sveltejs/kit';
import { Team, Player } from '../objects';

const game = Game.getInstance();

export async function POST(event: RequestEvent) {
    const body = await event.request.json();
    const { team_id, player_id } = body;

    const team = game.getTeam(team_id) as Team;
    const player = game.getPlayer(player_id) as Player;
    game.addTeamPlayer(team, player);

    return {
        status: 200,
        body: {
            message: 'Player added to team successfully',
            team,
        }
    };
}

export async function GET(event: RequestEvent) {
    const teams = game.getTeams();

    return {
        status: 200,
        body: {
            teams,
        }
    };
}