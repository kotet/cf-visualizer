primitive_functions = [];

primitive_functions["log"] = (z) => z.log();
primitive_functions["sign"] = (z) => z.sign();
primitive_functions["sqrt"] = (z) => z.sqrt();
primitive_functions["conj"] = (z) => z.conjugate();
primitive_functions["sin"] = (z) => z.sin();
primitive_functions["cos"] = (z) => z.cos();
primitive_functions["tan"] = (z) => z.tan();
primitive_functions["asin"] = (z) => z.asin();
primitive_functions["acos"] = (z) => z.acos();
primitive_functions["atan"] = (z) => z.atan();
primitive_functions["sinh"] = (z) => z.sinh();
primitive_functions["cosh"] = (z) => z.cosh();
primitive_functions["tanh"] = (z) => z.tanh();
primitive_functions["asinh"] = (z) => z.asinh();
primitive_functions["acosh"] = (z) => z.acosh();
primitive_functions["atanh"] = (z) => z.atanh();
primitive_functions["abs"] = (z) => Complex(z.abs())
primitive_functions["arg"] = (z) => Complex(z.arg());
primitive_functions["re"] = (z) => Complex(z.re);
primitive_functions["im"] = (z) => Complex(z.im);