enum G {
    Team,
    Player,
    Station
}

class Game extends Relational<GameObj, G> {
    static instance: Game | null = null;

    constructor() {
        super(G.Team, G.Player, G.Station);
        if (Game.instance) {
            return Game.instance;
        }

        Game.instance = this;
    }

    static getInstance(): Game {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
    
    getPlayerTeam(player: Player): Team {
        return this.getRelatedObj(player, G.Team) as Team;
    }

    getPlayerTakenStations(player: Player): Set<Station> {
        return this.getRelatedObjs(player, G.Station) as Set<Station>;
    }

    getTeamPlayers(team: Team): Set<Player> {
        return this.getRelatedObjs(team, G.Player) as Set<Player>;
    }

    getTeamTakenStations(team: Team): Set<Station> {
        return this.getIndirectObjs(team, G.Player, G.Station) as Set<Station>;
    }

    getPlayerPoints(player: Player): number {
        return Array.from(this.getPlayerTakenStations(player))
            .reduce((sum, station) => sum + station.points, 0);
    }

    getTeamPoints(team: Team): number {
        return Array.from(this.getTeamTakenStations(team))
            .reduce((sum, station) => sum + station.points, 0);
    }

    takeStation(station: Station, player: Player) {
        this.addRelation(station, player);
    }

    giveMission(team: Team, station: Station) {
        this.addRelation(team, station);
    }

    addTeamPlayer(team: Team, player: Player) {
        this.addRelation(team, player);   
    }
}