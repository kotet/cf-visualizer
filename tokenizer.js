function tokenize(input) {
    let i = 0;
    let result = [];
    while (i < input.length) {
        if (input[i] == ' ') {
            i++;
            continue;
        }
        if (('a' <= input[i] && input[i] <= 'z') || input[i] == '_') {
            let start = i;
            let length = 0;
            while ((('a' <= input[i + length] && input[i + length] <= 'z')) && i + length < input.length)
                length++;
            let s = input.substr(start, length);
            result.push({ type: "ident", val: s });
            i += length;
            continue;
        }
        if ('0' <= input[i] && input[i] <= '9') {
            let start = i;
            let length = 0;
            while ((('0' <= input[i + length] && input[i + length] <= '9') || input[i + length] == '.') && i + length < input.length)
                length++;
            let s = input.substr(start, length);
            result.push({ type: "num", val: Number(s) });
            i += length;
            continue;
        }
        result.push({ type: input[i] });
        i++;
    }
    return result;
}