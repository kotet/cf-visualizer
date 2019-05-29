let parser_i;

function parse(tokens) {
    parser_i = 0;
    let tree = parse_expression(tokens);
    if (parser_i == tokens.length) {
        return tree;
    }
    return NaN;
}

function parse_expression(tokens) {
    return parse_add(tokens);
}

function parse_add(tokens) {
    let lhs = parse_mul(tokens);
    while (parser_i < tokens.length && (getToken(tokens, parser_i).type == "+" || getToken(tokens, parser_i).type == "-")) {
        let op = getToken(tokens, parser_i).type;
        parser_i++;
        lhs = { type: op, lhs: Object.assign({}, lhs), rhs: parse_mul(tokens) };
    }
    return lhs;
}

function parse_mul(tokens) {
    let lhs = parse_pow(tokens);
    while (parser_i < tokens.length && (getToken(tokens, parser_i).type == "*" || getToken(tokens, parser_i).type == "/")) {
        let op = getToken(tokens, parser_i).type;
        parser_i++;
        lhs = { type: op, lhs: Object.assign({}, lhs), rhs: parse_pow(tokens) };
    }
    return lhs;
}

function parse_pow(tokens) {
    let lhs = parse_unary(tokens);
    if (parser_i < tokens.length && getToken(tokens, parser_i).type == "^") {
        parser_i++;
        return { type: "^", lhs: Object.assign({}, lhs), rhs: parse_pow(tokens) };
    }
    return lhs;
}

function parse_unary(tokens) {
    if (getToken(tokens, parser_i).type == "-") {
        parser_i++;
        return { type: "negate", val: parse_primary(tokens) };
    }
    return parse_primary(tokens);
}

function parse_primary(tokens) {
    let t_now = getToken(tokens, parser_i).type;
    if (t_now == "ident" && primitive_functions[getToken(tokens, parser_i).val]) {
        // 関数呼び出し
        let name = getToken(tokens, parser_i).val;
        parser_i++;
        return { type: "call", name: name, val: primitive_functions[name], arg: parse_primary(tokens) };
    }

    if (t_now == "num")
        return { type: "num", val: getToken(tokens, parser_i++).val };
    if (t_now == "ident")
        return { type: "var", name: getToken(tokens, parser_i++).val };
    if (t_now == "(") {
        parser_i++;
        let exp = parse_expression(tokens);
        if (getToken(tokens, parser_i).type == ")") {
            parser_i++;
            return exp;
        } else
            return NaN;
    }
    return NaN;
}

function getToken(tokens, i) {
    if (i < tokens.length) {
        return tokens[i];
    }
    return NaN;
}