abstract class Relational<RelObj, Relation extends [RelObj, RelObj], RelEnum> {
    relationLookup: { [key: string]: Set<Relation> } = {};

    protected getRelations(obj1: RelObj, obj2: RelObj): Set<Relation> {
        const key = `${obj1.constructor.name},${obj2.constructor.name}`;
        const keyRev = `${obj2.constructor.name},${obj1.constructor.name}`;
        return this.relationLookup[key] || this.relationLookup[keyRev] || new Set();
    }

    protected getRelatedObjs(obj: RelObj, relations: Set<Relation>): Set<RelObj> {
        const relatedObjs = new Set<RelObj>();
        relations.forEach(([o1, o2]) => {
            if (o1 === obj) relatedObjs.add(o2);
            if (o2 === obj) relatedObjs.add(o1);
        });
        return relatedObjs;
    }

    protected getSetElement(set: Set<RelObj>): RelObj | null {
        return set.values().next().value;
    }

    protected getRelatedObj(obj: RelObj, relations: Set<Relation>): RelObj | null {
        const relatedObjs = this.getRelatedObjs(obj, relations);
        return this.getSetElement(relatedObjs);
    }

    protected getRelation(obj1: RelObj, obj2: RelObj): Set<Relation> {
        const relation = this.getRelations(obj1, obj2);
        const filteredRelations = new Set<Relation>(
            Array.from(relation).filter(([o1, o2]) => o1 === obj1 && o2 === obj2)
        );
        return filteredRelations;
    }

    protected hasRelation(obj1: RelObj, obj2: RelObj): boolean {
        return this.getRelation(obj1, obj2).size > 0;
    }
    
    protected getConnectors(obj1: RelObj, middle: Set<RelObj>, obj2: RelObj): Set<RelObj> {
        const connectors = new Set<RelObj>();
        middle.forEach(m => {
            if (this.hasRelation(obj1, m) && this.hasRelation(m, obj2)) connectors.add(m);
        });
        return connectors;
    }

    protected getIndirectObjs(obj1: RelObj, relation1: Set<Relation>, relation2: Set<Relation>): Set<RelObj> {
        const middleObjs = this.getRelatedObjs(obj1, relation1);
        const indirectObjs = new Set<RelObj>();
        middleObjs.forEach(m => {
            const relatedObjs = this.getRelatedObjs(m, relation2);
            relatedObjs.forEach(o => indirectObjs.add(o));
        });

        return indirectObjs;
    }

    protected hasConnection(obj1: RelObj, middle: Set<RelObj>, obj2: RelObj): boolean {
        return this.getConnectors(obj1, middle, obj2).size > 0;
    }

    protected addRelation(obj1: RelObj, obj2: RelObj) {
        this.getRelation(obj1, obj2).add([obj1, obj2] as Relation);
    }

    protected removeRelation(obj1: RelObj, obj2: RelObj) {
        this.getRelation(obj1, obj2).delete([obj1, obj2] as Relation);
    }
}

type Member = [Team, Player];
type Taken = [Station, Player];
type Mission = [Team, Station];
type GameRelation = Member | Taken | Mission;
enum G {
    Team,
    Player,
    Station
}

class Game extends Relational<GameObj, GameRelation, G> {
    static instance: Game | null = null;

    constructor() {
        super();
        if (Game.instance) {
            return Game.instance;
        }

        this.relationLookup = {
            'Team,Player': new Set<Member>(),
            'Station,Player': new Set<Taken>(),
            'Team,Station': new Set<Mission>()
        }
        Game.instance = this;
    }

    static getInstance(): Game {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    takeStation(station: Station, player: Player) {
        this.addRelation(station, player);
    }
    
    getPlayerTeam(player: Player): Team {
        return this.getRelatedObj(player, G.Team) as Team;
    }

    getPlayerTakenStations(player: Player): Set<Station> {
        return this.getRelatedObjs(player, G.Station) as Set<Station>;
    }

    giveMission(team: Team, station: Station) {
        this.addRelation(team, station);
    }

    addTeamPlayer(team: Team, player: Player) {
        this.addRelation(team, player);   
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
}