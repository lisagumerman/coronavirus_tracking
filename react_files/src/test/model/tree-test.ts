import {MyTree} from "../../models/tree";

test("ensure insert works", () => {

    let mt = makeTree();

    let r = mt.root as any;
    expect(r.right.key).toBe(3);
    expect(r.right.value).toBe("Bean");
    expect(r.left.key).toBe(0);
    expect(r.left.value).toBe("Josiah");
});

test("ensure delete works", () => {
    let mt = makeTree();

    console.log(mt.toString())

    mt.remove(1);

    console.log(mt.toString());
    //
    // let r = mt.root as any;
    //
    // expect(r.right.key).toBe(2.5);
    // expect(r.right.value).toBe("Hattie");
});


function makeTree() : MyTree<string> {
    let mt = new MyTree<string>();

    mt.add(1, "Lisa");
    mt.add(0, "Josiah");
    mt.add(3, "Bean");
    mt.add(4, "Georgie");
    mt.add(2.5, "Hattie");

    return mt;
}