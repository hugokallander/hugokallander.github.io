import { RelObj } from './objects';
import { Relation } from './relations';

export abstract class Relational<Obj extends RelObj<ObjType>, Rel extends Relation<Obj, Obj, RelType>, ObjType, RelType> {
    relationLookup: { [key: string]: Set<Rel> } = {};

    constructor(...enumTypes: ObjType[]) {
        const sortedEnumTypes = enumTypes.sort();
        sortedEnumTypes.forEach((type1, index1) => {
            sortedEnumTypes.forEach((type2, index2) => {
                if (index2 > index1) {
                    const key = `${type1},${type2}`;
                    this.relationLookup[key] = new Set<Rel>();
                }
            });
        });
    }

    protected getTypeRelations(type1: ObjType, type2: ObjType): Set<Rel> {
        const sortedTypes = [type1, type2].sort();
        const key = `${sortedTypes[0]},${sortedTypes[1]}`;
        return this.relationLookup[key];
    }

    protected getObjTypeRelations(obj1: Obj, obj2: Obj): Set<Rel> {
        return this.getTypeRelations(obj1.type, obj2.type);
    }

    protected getRelatedObjs(obj: Obj, relType: ObjType): Set<Obj> {
        const relatedObjs = new Set<Obj>();
        const relations = this.getTypeRelations(obj.type, relType);
        relations.forEach((rel) => {
            if (rel.obj1 === obj) relatedObjs.add(rel.obj2);
            if (rel.obj2 === obj) relatedObjs.add(rel.obj1);
        });
        return relatedObjs;
    }

    protected getSetElement(set: Set<Obj>): Obj | null {
        return set.values().next().value;
    }

    protected getRelatedObj(obj: Obj, relType: ObjType): Obj | null {
        const relatedObjs = this.getRelatedObjs(obj, relType);
        return this.getSetElement(relatedObjs);
    }

    protected flippedEqual(rel: Rel, obj1: Obj, obj2: Obj, relType?: RelType): boolean {
        return rel.obj1 === obj1 && rel.obj2 === obj2
            || rel.obj1 === obj2 && rel.obj2 === obj1
            && (!relType || rel.type === relType);
    }

    protected getRelations(obj1: Obj, obj2: Obj, relType?: RelType): Set<Rel> {
        const relations = this.getObjTypeRelations(obj1, obj2);
        const filteredRelations = new Set<Rel>(
            Array.from(relations).filter((rel) => this.flippedEqual(rel, obj1, obj2, relType))
        );
        return filteredRelations;
    }

    protected hasRelation(obj1: Obj, obj2: Obj): boolean {
        return this.getRelations(obj1, obj2).size > 0;
    }
    
    protected getConnectors(obj1: Obj, middle: Set<Obj>, obj2: Obj): Set<Obj> {
        const connectors = new Set<Obj>();
        middle.forEach(m => {
            if (this.hasRelation(obj1, m) && this.hasRelation(m, obj2)) connectors.add(m);
        });
        return connectors;
    }

    protected getIndirectObjs(obj1: Obj, objType1: ObjType, objType2: ObjType): Set<Obj> {
        const middleObjs = this.getRelatedObjs(obj1, objType1);
        const indirectObjs = new Set<Obj>();
        middleObjs.forEach(m => {
            const relatedObjs = this.getRelatedObjs(m, objType2);
            relatedObjs.forEach(o => indirectObjs.add(o));
        });

        return indirectObjs;
    }

    protected hasConnection(obj1: Obj, middle: Set<Obj>, obj2: Obj): boolean {
        return this.getConnectors(obj1, middle, obj2).size > 0;
    }

    protected makeRel(obj1: Obj, obj2: Obj, relType: RelType): Rel {
        return { obj1, obj2, relType } as unknown as Rel;
    }

    protected addRelation(obj1: Obj, obj2: Obj, relType: RelType) {
        this.getObjTypeRelations(obj1, obj2).add(this.makeRel(obj1, obj2, relType));
    }

    // TODO: fix removals
    protected removeRelation(obj1: Obj, obj2: Obj, relType: RelType) {
        const relations = this.getObjTypeRelations(obj1, obj2);
        const relationToRemove = Array.from(relations).find(rel => this.flippedEqual(rel, obj1, obj2, relType));
        if (relationToRemove) {
            relations.delete(relationToRemove);
        }
    }
}