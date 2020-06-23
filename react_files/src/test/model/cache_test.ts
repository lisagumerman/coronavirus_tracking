import {MyCache} from "../../models/cache";


test("can create a cache", () => {
    let key = "myKey",
        value = "myValue";

    let cache = new MyCache(key, value);


    expect(cache.key).toBe(key);
    expect(cache.value).toBe(value);

});