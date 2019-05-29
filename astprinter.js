function astprint(tree) {
    if (tree.type == "+" || tree.type == "-" || tree.type == "*" || tree.type == "/" || tree.type == "^") {
        if (tree.type == "+")
            return astprint(tree.lhs) + " + " + astprint(tree.rhs);
        if (tree.type == "-")
            return astprint(tree.lhs) + " - " + astprint(tree.rhs);
        if (tree.type == "*")
            return astprint(tree.lhs) + " \\cdot " + astprint(tree.rhs);
        if (tree.type == "/")
            return "\\frac{" + astprint(tree.lhs) + "}{" + astprint(tree.rhs) + "}";
        if (tree.type == "^") {
            return astprint(tree.lhs) + " ^{" + astprint(tree.rhs) + "}";
        }
    }
    if (tree.type == "num")
        return "{" + tree.val + "}";

    if (tree.type == "var") {
        return "{" + tree.name + "}";
    }

    if (tree.type == "negate") {
        return "-(" + astprint(tree.val) + ")";
    }

    if (tree.type == "call") {
        let arg = astprint(tree.arg);
        switch (tree.name) {
            case "log":
                return "\\mathrm{Log}(" + arg + ")";
            case "conj":
                return "\\overline{" + arg + "}";
            case "sqrt":
                return "\\sqrt{" + arg + "}";
            case "abs":
                return "{|" + arg + "|}";
            case "re":
                return "\\mathrm{Re}(" + arg + ")";
            case "im":
                return "\\mathrm{Im}(" + arg + ")";
            case "sin":
            case "cos":
            case "tan":
            case "asin":
            case "acos":
            case "atan":
            case "sinh":
            case "cosh":
            case "tanh":
            case "asinh":
            case "acosh":
            case "atanh":
            case "arg":
            case "sign":
                return "\\mathrm{" + tree.name + "}(" + arg + ")";

            default:
                return "<ERROR>";
        }
    }

    return "<ERROR>";
}