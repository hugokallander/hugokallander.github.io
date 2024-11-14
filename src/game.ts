import { GameObj, G, Station, Team, Player } from './objects';
import { GameRelation, R, Member, Taken, Mission } from './relations';
import { Relational } from './relational';

export class Game extends Relational<GameObj, GameRelation<GameObj, GameObj>, G, R> {
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

    isStationTaken(station: Station): boolean {
        return this.getRelatedObjs(station, G.Player).size > 0;
    }

    isStationAssigned(station: Station): boolean {
        return this.getRelatedObjs(station, G.Team).size > 0;
    }

    isAvailableStation(obj: GameObj): obj is Station {
        return obj instanceof Station && !this.isStationTaken(obj) && !this.isStationAssigned(obj);
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
        const stations = Array.from(this.gameObjects).filter(this.isAvailableStation.bind(this)) as Station[];
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
            .reduce((sum, station) => sum + station.value, 0);
    }

    getTeamScore(team: Team): number {
        return Array.from(this.getTeamTakenStations(team))
            .reduce((sum, station) => sum + station.value, 0);
    }

    takeStation(station: Station, player: Player) {
        const team = this.getPlayerTeam(player);
        if (!this.hasRelation(station, team)) { return; }
        console.log("Team missions", this.getRelatedObjs(team, G.Station));
        this.removeRelation(station, team, R.Mission);
        console.log("Team missions after remove", this.getRelatedObjs(team, G.Station));
        this.addRelation(station, player, R.Taken);
    }

    getMission(team: Team): Station | null {
        return this.getRelatedObj(team, G.Station) as Station;
    }

    giveMission(team: Team, station: Station) {
        this.addRelation(team, station, R.Mission);
    }

    addTeamPlayer(team: Team, player: Player) {
        this.addRelation(team, player, R.Member);   
    }
}