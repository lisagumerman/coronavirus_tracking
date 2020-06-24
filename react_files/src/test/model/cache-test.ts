import {MyCache} from "../../models/cache";


test("can create a cache", () => {
    let cache = new MyCache();

    expect(cache.cache).toBe({});
});

test("can save key:value to cache", () => {
    let cache = new MyCache();

    cache.save("myKey", "myString");

    expect((cache.cache as  any).myKey).toBe("myString");
});

test("can save multiple key:values to cache", () => {
    let cache = new MyCache();

    cache.save("myKey", "myString");
    cache.save("yourKey", "yourString");

    expect((cache.cache as  any).myKey).toBe("myString");
    expect((cache.cache as  any).yourKey).toBe("yourString");
});

test("gets upset when saving if key already exists", () => {
    let cache = new MyCache();

    cache.save("myKey", "myString");

    expect((cache.cache as  any).myKey).toBe("myString");

    try {
        cache.save("myKey", "anotherKey");
    } catch (err) {
        expect((err as any).message).toBe("myKey already exists in cache with another value");
    }
});

test("does not get upset if saving the same key:value again", () => {
    let cache = new MyCache();

    cache.save("myKey", "myString");
    cache.save("myKey", "myString");

    expect((cache.cache as  any).myKey).toBe("myString");
});

test("can get an existing object", () => {
    let cache = new MyCache();

    cache.save("myKey", "myString");

    let ourString = cache.get("myKey");

    expect(ourString).toBe("myString");
});

test("returns null if no object by that key", () => {
   let cache = new MyCache();

   let ourString = cache.get("myKey");

   expect(ourString).toBeFalsy();
});

test("can successfully update with new data", () => {
    let cache = new MyCache();

    cache.save("myKey", "myString");
    cache.save("myKey", "yourString");

    expect(cache.get("myKey")).toBe("yourString");
});

test("gets upset if updating with no existing key:value", () => {
   let cache = new MyCache();

   try {
       cache.update("myKey", "anyString");
   } catch(err) {
       expect((err as any).message).toBe("myKey does not already exist in cache");
   }
});

test("returns true if successfully deletes a key", () => {
    let cache = new MyCache();

    cache.save("myKey", "anyvalue");

    let didDelete = cache.delete("myKey");

    expect(didDelete).toBeTruthy();

    expect(cache.get("myKey")).toBe(undefined);

});

test("returns false if deleting key that doesn't exist", () => {
    let cache = new MyCache();
    let didDelete = cache.delete("myKey");
    expect(didDelete).toBeFalsy();
});