import { Player, Team, Station, GameObj } from './objects';
import { Relational } from './relational';

enum G {
    Team,
    Player,
    Station
}

export class Game extends Relational<GameObj, G> {
    static instance: Game | null = null;
    gameObjects: Set<GameObj> = new Set();

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

    isNearStation(player: Player, station: Station): boolean {
        const distance = Math.sqrt(
            Math.pow(player.location.lat - station.location.lat, 2) +
            Math.pow(player.location.long - station.location.long, 2)
        );
        return distance <= 0.0001;
    }

    getTeams(): Set<Team> {
        return new Set(Array.from(this.gameObjects).filter(obj => obj instanceof Team));
    }

    getTeam(id: string): Team | null {
        return Array.from(this.gameObjects).find(obj => obj instanceof Team && obj.id === id) as Team;
    }

    getRandomStation(): Station | null {
        // TODO: check if station is taken or already assigned
        const stations = Array.from(this.gameObjects).filter(obj => obj instanceof Station) as Station[];
        return stations[Math.floor(Math.random() * stations.length)] || null;
    }

    addGameObject(obj: GameObj) {
        this.gameObjects.add(obj);
    }

    removeGameObject(obj: GameObj) {
        this.gameObjects.delete(obj);
    }

    addGameObjects(...objs: GameObj[]) {
        objs.forEach(obj => this.addGameObject(obj));
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
        const team = this.getPlayerTeam(player);
        if (!this.hasRelation(station, team)) { return; }
        this.removeRelation(station, team);
        this.addRelation(station, player);
    }

    getMission(team: Team): Station | null {
        return this.getRelatedObj(team, G.Station) as Station;
    }

    giveMission(team: Team, station: Station) {
        this.addRelation(team, station);
        console.log(this.getRelatedObj(team, G.Station));
    }

    addTeamPlayer(team: Team, player: Player) {
        this.addRelation(team, player);   
    }
}