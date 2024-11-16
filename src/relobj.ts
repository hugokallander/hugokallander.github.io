import { RelObj } from './objects';
import { Relation } from './relations';

abstract class BaseCollection<T extends { type: any; }> {
    protected _items: T[];

    constructor(...items: T[]) {
        this._items = items;
    }

    filter(predicate: (item: T) => boolean): this {
        const filteredItems = this._items.filter(predicate);
        return new (this.constructor as any)(...filteredItems);
    }

    add(...items: T[]): void {
        this._items.push(...items);
    }

    remove(...items: T[]): void {
        this._items = this.filter(item => !items.includes(item)).all;
    }

    ofType(...types: any[]): this {
        return this.filter(item => types.includes(item.type));
    }

    except(...exceptions: T[]): this {
        return this.filter(item => !exceptions.includes(item));
    }

    withProperty<K extends keyof T>(property: K, value: T[K]): this {
        return this.filter(item => item[property] === value);
    }

    get exists(): boolean {
        return this._items.length > 0;
    }

    get one(): T {
        return this.random;
    }

    get random(): T {
        const randomIndex = Math.floor(Math.random() * this._items.length);
        return this._items[randomIndex];
    }

    get all(): T[] {
        return this._items;
    }
}

export class Relations<Rel extends Relation<any, any, any>> extends BaseCollection<Rel> {

    with(...obj: RelObj<any>[]): Relations<Rel> {
        return this.filter(rel => obj.includes(rel.obj1) || obj.includes(rel.obj2));
    }

    between(obj1: RelObj<any>, obj2: RelObj<any>): Relations<Rel> {
        return this.filter(rel => rel.obj1 === obj1 && rel.obj2 === obj2 || rel.obj1 === obj2 && rel.obj2 === obj1);
    }

    private get obj1s(): RelObj<any>[] {
        return this.all.map(rel => rel.obj1);
    }

    private get obj2s(): RelObj<any>[] {
        return this.all.map(rel => rel.obj2);
    }

    get objects(): Objects<RelObj<any>> {
        return new Objects<RelObj<any>>(...this.obj1s, ...this.obj2s);
    }

    neighborsOf(...obj: RelObj<any>[]): Objects<RelObj<any>> {
        return this.with(...obj).objects.except(...obj);
    }
}

export class Objects<Obj extends RelObj<any>> extends BaseCollection<Obj> { }
