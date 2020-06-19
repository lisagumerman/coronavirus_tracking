import {MyTree} from "../../models/tree";

test("ensure insert works", () => {

    let mt = new MyTree<string>();

    mt.add(1, "Lisa");
    mt.add(0, "Josiah");
    mt.add(3, "Bean");
    mt.add(4, "Georgie");
    mt.add(2.5, "Hattie");
    let r = mt.root as any;
    expect(r.right.key).toBe(3);
    expect(r.right.value).toBe("Bean");
    expect(r.left.key).toBe(0);
    expect(r.left.value).toBe("Josiah");

    console.log(mt.toString());
});