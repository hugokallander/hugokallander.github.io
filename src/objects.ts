abstract class GameObj {
    id: string;
    name: string;

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

class Team extends GameObj {
    constructor(id: string, name: string) {
        super(id, name);
    }
}

class Player extends Physical {
    email: string;

    constructor(id: string, name: string, lat: number, long: number, email: string) {
        super(id, name, lat, long);
        this.email = email;
    }
}

class Station extends Physical {
    image: string;
    points: number;
    value: number;

    constructor(id: string, name: string, lat: number, long: number, image: string, points: number, value: number) {
        super(id, name, lat, long);
        this.image = image;
        this.points = points;
        this.value = value;
    }
}

const game = Game.getInstance();