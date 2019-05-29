function evaluate(tree, z) {
    // console.log(tree);
    if (tree.type == "+" || tree.type == "-" || tree.type == "*" || tree.type == "/" || tree.type == "^") {
        if (tree.type == "+")
            return evaluate(tree.lhs, z).add(evaluate(tree.rhs, z));
        if (tree.type == "-")
            return evaluate(tree.lhs, z).sub(evaluate(tree.rhs, z));
        if (tree.type == "*")
            return evaluate(tree.lhs, z).mul(evaluate(tree.rhs, z));
        if (tree.type == "/")
            return evaluate(tree.lhs, z).div(evaluate(tree.rhs, z));
        if (tree.type == "^") {
            return evaluate(tree.lhs, z).pow(evaluate(tree.rhs, z));
        }
    }
    if (tree.type == "num")
        return Complex(tree.val);

    if (tree.type == "var") {
        switch (tree.name) {
            case "z":
                return z;
            case "e":
                return Complex.E;
            case "i":
                return Complex.I;
            default:
                return NaN;
        }
    }

    if (tree.type == "negate") {
        return evaluate(tree.val).neg();
    }

    if (tree.type == "call") {
        let arg = evaluate(tree.arg, z);
        return tree.val(arg);
    }

    return NaN;
}

function isNumber(value) {
    return ((typeof value === 'number') && (isFinite(value)));
};