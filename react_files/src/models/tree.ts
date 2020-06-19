export class MyTree<T> {

    //bst

    public root ?: MyNode<T>;

    add(key : number, value : T) {
        let node = this.insertNode(key, value, this.root);
        if(!this.root) {
            this.root = node;
        }

    }

    private insertNode(key :number, value : T, node ?: MyNode<T>) : MyNode<T> {
        if (!node) {
            node = new MyNode(key, value);
        } else if (key < node.key) {
            node.left = this.insertNode(key, value, node.left);
        } else if (key > node.key) {
            node.right = this.insertNode(key, value, node.right);
        } else {
            node.value = value;
        }

        return node;
    }

    toString() : string {
        if (this.root) {
            return this.write(this.root, 0, "");

        } else {
            return "<empty>"
        }
    }

    private write(node : MyNode<T>, depth : number, representation : string) : string {
        representation = `${" ".repeat(depth)}${node.key}:${node.value}\n`;

        if (node.left) {
             representation += this.write(node.left, depth+1, representation);
        }
        if (node.right) {
             representation += this.write(node.right, depth+1, representation);
        }
        return representation;

    }

}


export class MyNode<T> {
    //node contains value, left tree, right tree

    constructor(public key : number, public value : T, public left ?: MyNode<T>, public right ?: MyNode<T>) {

    }

}