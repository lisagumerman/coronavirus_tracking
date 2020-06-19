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

    remove(key : number) {
        this.deleteNode(key, this.root);
    }

    private deleteNode(key : number, node ?: MyNode<T>) : MyNode<T> | undefined {
        if (!node) {
            return undefined;
        } else if (key < node.key) {
            node.left = this.deleteNode(key, node.left);
        } else if (key > node.key) {
            node.right = this.deleteNode(key, node.right);
        } else {
            let next = this.findSmallest(node.right);
            if(next) {
                node.value = next.value;
                node.key = next.key;
                node.right=this.deleteNode(next.key, node.right);
            }

            //leaf case
            if (!node.right && !node.left) {
                node = undefined;
            }
        }

        return node;
    }

    private findSmallest(node ?: MyNode<T>) : MyNode<T> | undefined {
        if(!node) {
            return undefined;
        }
        if (node.left) {
            return this.findSmallest(node.left);
        } else {
            return node;
        }
    }

}


export class MyNode<T> {
    //node contains value, left tree, right tree

    constructor(public key : number, public value : T, public left ?: MyNode<T>, public right ?: MyNode<T>) {

    }

}