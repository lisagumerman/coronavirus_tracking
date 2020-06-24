export class MyCache {

    cache : {};

    constructor() {
        this.cache = {};
    }

    save(key : string, value : string) : MyPair {
        let pair = this.get(key);

        if (pair) {
            if (pair != value) {
                throw new Error(`${key} already exists in cache with another value`)
            }
        } else {
            //@ts-ignore:TS7053
            this.cache[key] = value;
        }
        return new MyPair(key, value);
    }

    update(key : string, value : string) : MyPair {
        let pair = this.get(key);
        if (!pair) {
            throw new Error(`${key} does not already exist in cache`)
        } else {
            //@ts-ignore:TS7053
            this.cache[key] = value;
            return new MyPair(key, value)
        }
        //throw error
    }

    delete(key : string) : boolean {
        if (this.get(key)) {
            //@ts-ignore:TS7053
            delete this.cache[key];
            return true;
        }
        return false;
    }

    get(key : string) : string {
        //@ts-ignore:TS7053
        return this.cache[key] || null;
    }
}


export class MyPair {
    constructor(public key : string, public value : string) {}
}