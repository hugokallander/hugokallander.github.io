export enum G {
    Team,
    Player,
    Station
}

export abstract class RelObj<ObjType> { type: ObjType; };

export abstract class GameObj extends RelObj<G> {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        super();
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
    color: string;

    constructor(id: string, name: string, color: string) {
        super(id, name);
        this.color = color;
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
    value: number;
    type = G.Station;

    constructor(id: string, name: string, lat: number, long: number, image: string, value: number) {
        super(id, name, lat, long);
        this.image = image;
        this.value = value;
    }
}