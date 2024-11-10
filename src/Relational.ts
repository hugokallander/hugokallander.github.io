export abstract class Relational<RelObj extends Object, RelEnum> {
    relationLookup: { [key: string]: Set<[RelObj, RelObj]> } = {};

    constructor(...enumTypes: RelEnum[]) {
        enumTypes.forEach((type1, index1) => {
            enumTypes.forEach((type2, index2) => {
                if (index1 !== index2) {
                    const key = `${type1},${type2}`;
                    this.relationLookup[key] = new Set<[RelObj, RelObj]>();
                }
            });
        });
    }

    protected getTypeRelations(type1: String, type2: String): Set<[RelObj, RelObj]> {
        const key = `${type1},${type2}`;
        const keyRev = `${type2},${type1}`;
        return this.relationLookup[key] || this.relationLookup[keyRev] || new Set();
    }

    // TODO: return reference to the relation
    protected getObjRelations(obj1: RelObj, obj2: RelObj): Set<[RelObj, RelObj]> {
        return this.getTypeRelations(obj1.constructor.name, obj2.constructor.name);
    }

    protected getRelatedObjs(obj: RelObj, relEnum: RelEnum): Set<RelObj> {
        const relatedObjs = new Set<RelObj>();
        const relations = this.getTypeRelations(obj.constructor.name, String(relEnum));
        relations.forEach(([o1, o2]) => {
            if (o1 === obj) relatedObjs.add(o2);
            if (o2 === obj) relatedObjs.add(o1);
        });
        return relatedObjs;
    }

    protected getSetElement(set: Set<RelObj>): RelObj | null {
        return set.values().next().value;
    }

    protected getRelatedObj(obj: RelObj, relEnum: RelEnum): RelObj | null {
        const relatedObjs = this.getRelatedObjs(obj, relEnum);
        return this.getSetElement(relatedObjs);
    }

    protected getRelation(obj1: RelObj, obj2: RelObj): Set<[RelObj, RelObj]> {
        const relation = this.getObjRelations(obj1, obj2);
        const filteredRelations = new Set<[RelObj, RelObj]>(
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

    protected getIndirectObjs(obj1: RelObj, relEnum1: RelEnum, relEnum2: RelEnum): Set<RelObj> {
        const middleObjs = this.getRelatedObjs(obj1, relEnum1);
        const indirectObjs = new Set<RelObj>();
        middleObjs.forEach(m => {
            const relatedObjs = this.getRelatedObjs(m, relEnum2);
            relatedObjs.forEach(o => indirectObjs.add(o));
        });

        return indirectObjs;
    }

    protected hasConnection(obj1: RelObj, middle: Set<RelObj>, obj2: RelObj): boolean {
        return this.getConnectors(obj1, middle, obj2).size > 0;
    }

    protected addRelation(obj1: RelObj, obj2: RelObj) {
        this.getObjRelations(obj1, obj2).add([obj1, obj2]);
    }

    protected removeRelation(obj1: RelObj, obj2: RelObj) {
        this.getObjRelations(obj1, obj2).delete([obj1, obj2]);
    }
}