import { GameObj, G, Station, Team, Player } from './objects';
import { GameRelation, R, Member, Taken, Mission } from './relations';
import { Relations, Objects } from './relobj';

export class Game {
    static instance: Game | null = null;
    objects: Objects<GameObj> = new Objects();
    relations: Relations<GameRelation<GameObj, GameObj>> = new Relations();

    constructor() {
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
        return this.relations.with(station).ofType(R.Taken).exists;
    }

    isStationAssigned(station: Station): boolean {
        return this.relations.with(station).ofType(R.Mission).exists;
    }

    isAvailableStation(obj: GameObj): boolean {
        return obj.type === G.Station
            && !this.relations.with(obj).ofType(R.Taken, R.Mission).exists;
    }

    isNearStation(player: Player, station: Station): boolean {
        const distance = Math.sqrt(
            Math.pow(player.location.lat - station.location.lat, 2) +
            Math.pow(player.location.long - station.location.long, 2)
        );
        return distance <= 0.0001;
    }

    getTeams(): Team[] {
        return this.objects.ofType(G.Team).all as Team[];
    }

    getTeam(id: string): Team | null {
        return this.objects.ofType(G.Team).withProperty("id", id).one as Team;
    }

    getPlayer(id: string): Player | null {
        return this.objects.ofType(G.Player).withProperty("id", id).one as Player;
    }

    getStation(id: string): Station | null {
        return this.objects.ofType(G.Station).withProperty("id", id).one as Station;
    }

    getRandomStation(): Station | null {
        return this.objects.filter(this.isAvailableStation.bind(this)).random as Station;
    }

    removeGameObject(obj: GameObj) {
        this.objects.remove(obj);
    }

    addGameObjects(...objs: GameObj[]) {
        this.objects.add(...objs);
    }
    
    getPlayerTeam(player: Player): Team {
        return this.relations.ofType(R.Member).neighborsOf(player).one as Team;
    }

    getPlayerTakenStations(player: Player): Station[] {
        return this.relations.ofType(R.Taken).neighborsOf(player).all as Station[];
    }

    getTeamPlayers(team: Team): Player[] {
        return this.relations.ofType(R.Member).neighborsOf(team).all as Player[];
    }

    getTeamTakenStations(team: Team): Station[] {
        const teamMembers = this.relations.ofType(R.Member).neighborsOf(team).all;
        const teamMembersTaken = this.relations.ofType(R.Taken).neighborsOf(...teamMembers).all;
        return teamMembersTaken as Station[];
    }

    getPlayerScore(player: Player): number {
        return this.getPlayerTakenStations(player)
            .reduce((sum, station) => sum + station.value, 0);
    }

    getTeamScore(team: Team): number {
        return this.getTeamTakenStations(team)
            .reduce((sum, station) => sum + station.value, 0);
    }

    takeStation(station: Station, player: Player) {
        const team = this.getPlayerTeam(player);
        const teamMissions = this.relations.with(team).ofType(R.Mission);
        if (!teamMissions.exists) { return; }
        this.relations.remove(new Mission(team, station));
        this.relations.add(new Taken(player, station));
    }

    getMission(team: Team): Station | null {
        return this.relations.ofType(R.Mission).neighborsOf(team).one as Station;
    }

    giveMission(team: Team, station: Station) {
        if (this.isAvailableStation(station)) {
            this.relations.add(new Mission(team, station));
        }
    }

    addTeamPlayer(team: Team, player: Player) {
        this.relations.add(new Member(player, team));   
    }
}