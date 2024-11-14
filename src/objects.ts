export enum G {
    Team,
    Player,
    Station
}

export abstract class GameObj {
    id: string;
    name: string;
    type: G;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}

abstract class Physical extends GameObj {
    location: { lat: number; long: number };

    constructor(id: string, name: string, lat: number, long: number) {
        super(id, name);
        this.location = { lat, long };
    }
}

export class Team extends GameObj {
    type = G.Team;

    constructor(id: string, name: string) {
        super(id, name);
    }
}

export class Player extends Physical {
    email: string;
    type = G.Player;

    constructor(id: string, name: string, lat: number, long: number, email: string) {
        super(id, name, lat, long);
        this.email = email;
    }
}

export class Station extends Physical {
    image: string;
    points: number;
    value: number;
    type = G.Station;

    constructor(id: string, name: string, lat: number, long: number, image: string, points: number, value: number) {
        super(id, name, lat, long);
        this.image = image;
        this.points = points;
        this.value = value;
    }
}