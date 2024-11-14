import { Player, Team, Station, GameObj } from './objects';

export enum R {
    Member,
    Taken,
    Mission
}

export abstract class Relation<Obj1Type extends Object, Obj2Type extends Object, RelType> {
    obj1: Obj1Type;
    obj2: Obj2Type;
    type: RelType;

    constructor(obj1: Obj1Type, obj2: Obj2Type, type: RelType) {
        this.obj1 = obj1;
        this.obj2 = obj2;
        this.type = type;
    }
}

export abstract class GameRelation<GameObj1 extends GameObj, GameObj2 extends GameObj> extends Relation<GameObj1, GameObj2, R> { }

export class Member extends GameRelation<Player, Team> {
    type = R.Member;
}

export class Taken extends GameRelation<Player, Station> {
    type = R.Taken;
}

export class Mission extends GameRelation<Team, Station> {
    type = R.Mission;
}
