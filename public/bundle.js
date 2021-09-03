(function (exports) {
  'use strict';

  var demo_bs = {};

  var string = {};

  var bytes = {};

  var char = {};

  var caml_bytes = {};

  function set$1(s, i, ch) {
    if (i < 0 || i >= s.length) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "index out of bounds",
            Error: new Error()
          };
    }
    s[i] = ch;
    
  }

  function get$3(s, i) {
    if (i < 0 || i >= s.length) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "index out of bounds",
            Error: new Error()
          };
    }
    return s[i];
  }

  function caml_fill_bytes(s, i, l, c) {
    if (l <= 0) {
      return ;
    }
    for(var k = i ,k_finish = l + i | 0; k < k_finish; ++k){
      s[k] = c;
    }
    
  }

  function caml_create_bytes(len) {
    if (len < 0) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "String.create",
            Error: new Error()
          };
    }
    var result = new Array(len);
    for(var i = 0; i < len; ++i){
      result[i] = /* '\000' */0;
    }
    return result;
  }

  function caml_blit_bytes(s1, i1, s2, i2, len) {
    if (len <= 0) {
      return ;
    }
    if (s1 === s2) {
      if (i1 < i2) {
        var range_a = (s1.length - i2 | 0) - 1 | 0;
        var range_b = len - 1 | 0;
        var range = range_a > range_b ? range_b : range_a;
        for(var j = range; j >= 0; --j){
          s1[i2 + j | 0] = s1[i1 + j | 0];
        }
        return ;
      }
      if (i1 <= i2) {
        return ;
      }
      var range_a$1 = (s1.length - i1 | 0) - 1 | 0;
      var range_b$1 = len - 1 | 0;
      var range$1 = range_a$1 > range_b$1 ? range_b$1 : range_a$1;
      for(var k = 0; k <= range$1; ++k){
        s1[i2 + k | 0] = s1[i1 + k | 0];
      }
      return ;
    }
    var off1 = s1.length - i1 | 0;
    if (len <= off1) {
      for(var i = 0; i < len; ++i){
        s2[i2 + i | 0] = s1[i1 + i | 0];
      }
      return ;
    }
    for(var i$1 = 0; i$1 < off1; ++i$1){
      s2[i2 + i$1 | 0] = s1[i1 + i$1 | 0];
    }
    for(var i$2 = off1; i$2 < len; ++i$2){
      s2[i2 + i$2 | 0] = /* '\000' */0;
    }
    
  }

  function bytes_to_string(a) {
    var len = a.length;
    var s = "";
    var s_len = len;
    if (len <= 4096 && len === a.length) {
      return String.fromCharCode.apply(null, a);
    }
    var offset = 0;
    while(s_len > 0) {
      var next = s_len < 1024 ? s_len : 1024;
      var tmp_bytes = new Array(next);
      for(var k = 0; k < next; ++k){
        tmp_bytes[k] = a[k + offset | 0];
      }
      s = s + String.fromCharCode.apply(null, tmp_bytes);
      s_len = s_len - next | 0;
      offset = offset + next | 0;
    }  return s;
  }

  function caml_blit_string(s1, i1, s2, i2, len) {
    if (len <= 0) {
      return ;
    }
    var off1 = s1.length - i1 | 0;
    if (len <= off1) {
      for(var i = 0; i < len; ++i){
        s2[i2 + i | 0] = s1.charCodeAt(i1 + i | 0);
      }
      return ;
    }
    for(var i$1 = 0; i$1 < off1; ++i$1){
      s2[i2 + i$1 | 0] = s1.charCodeAt(i1 + i$1 | 0);
    }
    for(var i$2 = off1; i$2 < len; ++i$2){
      s2[i2 + i$2 | 0] = /* '\000' */0;
    }
    
  }

  function bytes_of_string(s) {
    var len = s.length;
    var res = new Array(len);
    for(var i = 0; i < len; ++i){
      res[i] = s.charCodeAt(i);
    }
    return res;
  }

  function caml_bytes_compare_aux(s1, s2, _off, len, def) {
    while(true) {
      var off = _off;
      if (off >= len) {
        return def;
      }
      var a = s1[off];
      var b = s2[off];
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      _off = off + 1 | 0;
      continue ;
    }}

  function caml_bytes_compare(s1, s2) {
    var len1 = s1.length;
    var len2 = s2.length;
    if (len1 === len2) {
      return caml_bytes_compare_aux(s1, s2, 0, len1, 0);
    } else if (len1 < len2) {
      return caml_bytes_compare_aux(s1, s2, 0, len1, -1);
    } else {
      return caml_bytes_compare_aux(s1, s2, 0, len2, 1);
    }
  }

  function caml_bytes_equal(s1, s2) {
    var len1 = s1.length;
    var len2 = s2.length;
    if (len1 === len2) {
      var _off = 0;
      while(true) {
        var off = _off;
        if (off === len1) {
          return true;
        }
        var a = s1[off];
        var b = s2[off];
        if (a !== b) {
          return false;
        }
        _off = off + 1 | 0;
        continue ;
      }  } else {
      return false;
    }
  }

  function caml_bytes_greaterthan(s1, s2) {
    return caml_bytes_compare(s1, s2) > 0;
  }

  function caml_bytes_greaterequal(s1, s2) {
    return caml_bytes_compare(s1, s2) >= 0;
  }

  function caml_bytes_lessthan(s1, s2) {
    return caml_bytes_compare(s1, s2) < 0;
  }

  function caml_bytes_lessequal(s1, s2) {
    return caml_bytes_compare(s1, s2) <= 0;
  }

  caml_bytes.caml_create_bytes = caml_create_bytes;
  caml_bytes.caml_fill_bytes = caml_fill_bytes;
  caml_bytes.get = get$3;
  caml_bytes.set = set$1;
  caml_bytes.bytes_to_string = bytes_to_string;
  caml_bytes.caml_blit_bytes = caml_blit_bytes;
  caml_bytes.caml_blit_string = caml_blit_string;
  caml_bytes.bytes_of_string = bytes_of_string;
  caml_bytes.caml_bytes_compare = caml_bytes_compare;
  caml_bytes.caml_bytes_greaterthan = caml_bytes_greaterthan;
  caml_bytes.caml_bytes_greaterequal = caml_bytes_greaterequal;
  caml_bytes.caml_bytes_lessthan = caml_bytes_lessthan;
  caml_bytes.caml_bytes_lessequal = caml_bytes_lessequal;
  caml_bytes.caml_bytes_equal = caml_bytes_equal;

  var Caml_bytes$2 = caml_bytes;

  function chr(n) {
    if (n < 0 || n > 255) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Char.chr",
            Error: new Error()
          };
    }
    return n;
  }

  function escaped$2(c) {
    var exit = 0;
    if (c >= 40) {
      if (c === 92) {
        return "\\\\";
      }
      exit = c >= 127 ? 1 : 2;
    } else if (c >= 32) {
      if (c >= 39) {
        return "\\'";
      }
      exit = 2;
    } else if (c >= 14) {
      exit = 1;
    } else {
      switch (c) {
        case 8 :
            return "\\b";
        case 9 :
            return "\\t";
        case 10 :
            return "\\n";
        case 0 :
        case 1 :
        case 2 :
        case 3 :
        case 4 :
        case 5 :
        case 6 :
        case 7 :
        case 11 :
        case 12 :
            exit = 1;
            break;
        case 13 :
            return "\\r";
        
      }
    }
    switch (exit) {
      case 1 :
          var s = [
            0,
            0,
            0,
            0
          ];
          s[0] = /* '\\' */92;
          s[1] = 48 + (c / 100 | 0) | 0;
          s[2] = 48 + (c / 10 | 0) % 10 | 0;
          s[3] = 48 + c % 10 | 0;
          return Caml_bytes$2.bytes_to_string(s);
      case 2 :
          var s$1 = [0];
          s$1[0] = c;
          return Caml_bytes$2.bytes_to_string(s$1);
      
    }
  }

  function lowercase$2(c) {
    if (c >= /* 'A' */65 && c <= /* 'Z' */90 || c >= /* '\192' */192 && c <= /* '\214' */214 || c >= /* '\216' */216 && c <= /* '\222' */222) {
      return c + 32 | 0;
    } else {
      return c;
    }
  }

  function uppercase$2(c) {
    if (c >= /* 'a' */97 && c <= /* 'z' */122 || c >= /* '\224' */224 && c <= /* '\246' */246 || c >= /* '\248' */248 && c <= /* '\254' */254) {
      return c - 32 | 0;
    } else {
      return c;
    }
  }

  function lowercase_ascii$2(c) {
    if (c >= /* 'A' */65 && c <= /* 'Z' */90) {
      return c + 32 | 0;
    } else {
      return c;
    }
  }

  function uppercase_ascii$2(c) {
    if (c >= /* 'a' */97 && c <= /* 'z' */122) {
      return c - 32 | 0;
    } else {
      return c;
    }
  }

  function compare$2(c1, c2) {
    return c1 - c2 | 0;
  }

  function equal$2(c1, c2) {
    return (c1 - c2 | 0) === 0;
  }

  char.chr = chr;
  char.escaped = escaped$2;
  char.lowercase = lowercase$2;
  char.uppercase = uppercase$2;
  char.lowercase_ascii = lowercase_ascii$2;
  char.uppercase_ascii = uppercase_ascii$2;
  char.compare = compare$2;
  char.equal = equal$2;

  var curry = {};

  var caml_array = {};

  function caml_array_sub(x, offset, len) {
    var result = new Array(len);
    var j = 0;
    var i = offset;
    while(j < len) {
      result[j] = x[i];
      j = j + 1 | 0;
      i = i + 1 | 0;
    }  return result;
  }

  function len(_acc, _l) {
    while(true) {
      var l = _l;
      var acc = _acc;
      if (!l) {
        return acc;
      }
      _l = l.tl;
      _acc = l.hd.length + acc | 0;
      continue ;
    }}

  function fill$2(arr, _i, _l) {
    while(true) {
      var l = _l;
      var i = _i;
      if (!l) {
        return ;
      }
      var x = l.hd;
      var l$1 = x.length;
      var k = i;
      var j = 0;
      while(j < l$1) {
        arr[k] = x[j];
        k = k + 1 | 0;
        j = j + 1 | 0;
      }    _l = l.tl;
      _i = k;
      continue ;
    }}

  function caml_array_concat(l) {
    var v = len(0, l);
    var result = new Array(v);
    fill$2(result, 0, l);
    return result;
  }

  function set(xs, index, newval) {
    if (index < 0 || index >= xs.length) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "index out of bounds",
            Error: new Error()
          };
    }
    xs[index] = newval;
    
  }

  function get$2(xs, index) {
    if (index < 0 || index >= xs.length) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "index out of bounds",
            Error: new Error()
          };
    }
    return xs[index];
  }

  function caml_make_vect(len, init) {
    var b = new Array(len);
    for(var i = 0; i < len; ++i){
      b[i] = init;
    }
    return b;
  }

  function caml_make_float_vect(len) {
    var b = new Array(len);
    for(var i = 0; i < len; ++i){
      b[i] = 0;
    }
    return b;
  }

  function caml_array_blit(a1, i1, a2, i2, len) {
    if (i2 <= i1) {
      for(var j = 0; j < len; ++j){
        a2[j + i2 | 0] = a1[j + i1 | 0];
      }
      return ;
    }
    for(var j$1 = len - 1 | 0; j$1 >= 0; --j$1){
      a2[j$1 + i2 | 0] = a1[j$1 + i1 | 0];
    }
    
  }

  function caml_array_dup(prim) {
    return prim.slice(0);
  }

  caml_array.caml_array_dup = caml_array_dup;
  caml_array.caml_array_sub = caml_array_sub;
  caml_array.caml_array_concat = caml_array_concat;
  caml_array.caml_make_vect = caml_make_vect;
  caml_array.caml_make_float_vect = caml_make_float_vect;
  caml_array.caml_array_blit = caml_array_blit;
  caml_array.get = get$2;
  caml_array.set = set;

  var Caml_array = caml_array;

  function app$1(_f, _args) {
    while(true) {
      var args = _args;
      var f = _f;
      var init_arity = f.length;
      var arity = init_arity === 0 ? 1 : init_arity;
      var len = args.length;
      var d = arity - len | 0;
      if (d === 0) {
        return f.apply(null, args);
      }
      if (d >= 0) {
        return (function(f,args){
        return function (x) {
          return app$1(f, args.concat([x]));
        }
        }(f,args));
      }
      _args = Caml_array.caml_array_sub(args, arity, -d | 0);
      _f = f.apply(null, Caml_array.caml_array_sub(args, 0, arity));
      continue ;
    }}

  function _1(o, a0) {
    var arity = o.length;
    if (arity === 1) {
      return o(a0);
    } else {
      switch (arity) {
        case 1 :
            return o(a0);
        case 2 :
            return function (param) {
              return o(a0, param);
            };
        case 3 :
            return function (param, param$1) {
              return o(a0, param, param$1);
            };
        case 4 :
            return function (param, param$1, param$2) {
              return o(a0, param, param$1, param$2);
            };
        case 5 :
            return function (param, param$1, param$2, param$3) {
              return o(a0, param, param$1, param$2, param$3);
            };
        case 6 :
            return function (param, param$1, param$2, param$3, param$4) {
              return o(a0, param, param$1, param$2, param$3, param$4);
            };
        case 7 :
            return function (param, param$1, param$2, param$3, param$4, param$5) {
              return o(a0, param, param$1, param$2, param$3, param$4, param$5);
            };
        default:
          return app$1(o, [a0]);
      }
    }
  }

  function __1(o) {
    var arity = o.length;
    if (arity === 1) {
      return o;
    } else {
      return function (a0) {
        return _1(o, a0);
      };
    }
  }

  function _2(o, a0, a1) {
    var arity = o.length;
    if (arity === 2) {
      return o(a0, a1);
    } else {
      switch (arity) {
        case 1 :
            return app$1(o(a0), [a1]);
        case 2 :
            return o(a0, a1);
        case 3 :
            return function (param) {
              return o(a0, a1, param);
            };
        case 4 :
            return function (param, param$1) {
              return o(a0, a1, param, param$1);
            };
        case 5 :
            return function (param, param$1, param$2) {
              return o(a0, a1, param, param$1, param$2);
            };
        case 6 :
            return function (param, param$1, param$2, param$3) {
              return o(a0, a1, param, param$1, param$2, param$3);
            };
        case 7 :
            return function (param, param$1, param$2, param$3, param$4) {
              return o(a0, a1, param, param$1, param$2, param$3, param$4);
            };
        default:
          return app$1(o, [
                      a0,
                      a1
                    ]);
      }
    }
  }

  function __2(o) {
    var arity = o.length;
    if (arity === 2) {
      return o;
    } else {
      return function (a0, a1) {
        return _2(o, a0, a1);
      };
    }
  }

  function _3(o, a0, a1, a2) {
    var arity = o.length;
    if (arity === 3) {
      return o(a0, a1, a2);
    } else {
      switch (arity) {
        case 1 :
            return app$1(o(a0), [
                        a1,
                        a2
                      ]);
        case 2 :
            return app$1(o(a0, a1), [a2]);
        case 3 :
            return o(a0, a1, a2);
        case 4 :
            return function (param) {
              return o(a0, a1, a2, param);
            };
        case 5 :
            return function (param, param$1) {
              return o(a0, a1, a2, param, param$1);
            };
        case 6 :
            return function (param, param$1, param$2) {
              return o(a0, a1, a2, param, param$1, param$2);
            };
        case 7 :
            return function (param, param$1, param$2, param$3) {
              return o(a0, a1, a2, param, param$1, param$2, param$3);
            };
        default:
          return app$1(o, [
                      a0,
                      a1,
                      a2
                    ]);
      }
    }
  }

  function __3(o) {
    var arity = o.length;
    if (arity === 3) {
      return o;
    } else {
      return function (a0, a1, a2) {
        return _3(o, a0, a1, a2);
      };
    }
  }

  function _4(o, a0, a1, a2, a3) {
    var arity = o.length;
    if (arity === 4) {
      return o(a0, a1, a2, a3);
    } else {
      switch (arity) {
        case 1 :
            return app$1(o(a0), [
                        a1,
                        a2,
                        a3
                      ]);
        case 2 :
            return app$1(o(a0, a1), [
                        a2,
                        a3
                      ]);
        case 3 :
            return app$1(o(a0, a1, a2), [a3]);
        case 4 :
            return o(a0, a1, a2, a3);
        case 5 :
            return function (param) {
              return o(a0, a1, a2, a3, param);
            };
        case 6 :
            return function (param, param$1) {
              return o(a0, a1, a2, a3, param, param$1);
            };
        case 7 :
            return function (param, param$1, param$2) {
              return o(a0, a1, a2, a3, param, param$1, param$2);
            };
        default:
          return app$1(o, [
                      a0,
                      a1,
                      a2,
                      a3
                    ]);
      }
    }
  }

  function __4(o) {
    var arity = o.length;
    if (arity === 4) {
      return o;
    } else {
      return function (a0, a1, a2, a3) {
        return _4(o, a0, a1, a2, a3);
      };
    }
  }

  function _5(o, a0, a1, a2, a3, a4) {
    var arity = o.length;
    if (arity === 5) {
      return o(a0, a1, a2, a3, a4);
    } else {
      switch (arity) {
        case 1 :
            return app$1(o(a0), [
                        a1,
                        a2,
                        a3,
                        a4
                      ]);
        case 2 :
            return app$1(o(a0, a1), [
                        a2,
                        a3,
                        a4
                      ]);
        case 3 :
            return app$1(o(a0, a1, a2), [
                        a3,
                        a4
                      ]);
        case 4 :
            return app$1(o(a0, a1, a2, a3), [a4]);
        case 5 :
            return o(a0, a1, a2, a3, a4);
        case 6 :
            return function (param) {
              return o(a0, a1, a2, a3, a4, param);
            };
        case 7 :
            return function (param, param$1) {
              return o(a0, a1, a2, a3, a4, param, param$1);
            };
        default:
          return app$1(o, [
                      a0,
                      a1,
                      a2,
                      a3,
                      a4
                    ]);
      }
    }
  }

  function __5(o) {
    var arity = o.length;
    if (arity === 5) {
      return o;
    } else {
      return function (a0, a1, a2, a3, a4) {
        return _5(o, a0, a1, a2, a3, a4);
      };
    }
  }

  function _6(o, a0, a1, a2, a3, a4, a5) {
    var arity = o.length;
    if (arity === 6) {
      return o(a0, a1, a2, a3, a4, a5);
    } else {
      switch (arity) {
        case 1 :
            return app$1(o(a0), [
                        a1,
                        a2,
                        a3,
                        a4,
                        a5
                      ]);
        case 2 :
            return app$1(o(a0, a1), [
                        a2,
                        a3,
                        a4,
                        a5
                      ]);
        case 3 :
            return app$1(o(a0, a1, a2), [
                        a3,
                        a4,
                        a5
                      ]);
        case 4 :
            return app$1(o(a0, a1, a2, a3), [
                        a4,
                        a5
                      ]);
        case 5 :
            return app$1(o(a0, a1, a2, a3, a4), [a5]);
        case 6 :
            return o(a0, a1, a2, a3, a4, a5);
        case 7 :
            return function (param) {
              return o(a0, a1, a2, a3, a4, a5, param);
            };
        default:
          return app$1(o, [
                      a0,
                      a1,
                      a2,
                      a3,
                      a4,
                      a5
                    ]);
      }
    }
  }

  function __6(o) {
    var arity = o.length;
    if (arity === 6) {
      return o;
    } else {
      return function (a0, a1, a2, a3, a4, a5) {
        return _6(o, a0, a1, a2, a3, a4, a5);
      };
    }
  }

  function _7(o, a0, a1, a2, a3, a4, a5, a6) {
    var arity = o.length;
    if (arity === 7) {
      return o(a0, a1, a2, a3, a4, a5, a6);
    } else {
      switch (arity) {
        case 1 :
            return app$1(o(a0), [
                        a1,
                        a2,
                        a3,
                        a4,
                        a5,
                        a6
                      ]);
        case 2 :
            return app$1(o(a0, a1), [
                        a2,
                        a3,
                        a4,
                        a5,
                        a6
                      ]);
        case 3 :
            return app$1(o(a0, a1, a2), [
                        a3,
                        a4,
                        a5,
                        a6
                      ]);
        case 4 :
            return app$1(o(a0, a1, a2, a3), [
                        a4,
                        a5,
                        a6
                      ]);
        case 5 :
            return app$1(o(a0, a1, a2, a3, a4), [
                        a5,
                        a6
                      ]);
        case 6 :
            return app$1(o(a0, a1, a2, a3, a4, a5), [a6]);
        case 7 :
            return o(a0, a1, a2, a3, a4, a5, a6);
        default:
          return app$1(o, [
                      a0,
                      a1,
                      a2,
                      a3,
                      a4,
                      a5,
                      a6
                    ]);
      }
    }
  }

  function __7(o) {
    var arity = o.length;
    if (arity === 7) {
      return o;
    } else {
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return _7(o, a0, a1, a2, a3, a4, a5, a6);
      };
    }
  }

  function _8(o, a0, a1, a2, a3, a4, a5, a6, a7) {
    var arity = o.length;
    if (arity === 8) {
      return o(a0, a1, a2, a3, a4, a5, a6, a7);
    } else {
      switch (arity) {
        case 1 :
            return app$1(o(a0), [
                        a1,
                        a2,
                        a3,
                        a4,
                        a5,
                        a6,
                        a7
                      ]);
        case 2 :
            return app$1(o(a0, a1), [
                        a2,
                        a3,
                        a4,
                        a5,
                        a6,
                        a7
                      ]);
        case 3 :
            return app$1(o(a0, a1, a2), [
                        a3,
                        a4,
                        a5,
                        a6,
                        a7
                      ]);
        case 4 :
            return app$1(o(a0, a1, a2, a3), [
                        a4,
                        a5,
                        a6,
                        a7
                      ]);
        case 5 :
            return app$1(o(a0, a1, a2, a3, a4), [
                        a5,
                        a6,
                        a7
                      ]);
        case 6 :
            return app$1(o(a0, a1, a2, a3, a4, a5), [
                        a6,
                        a7
                      ]);
        case 7 :
            return app$1(o(a0, a1, a2, a3, a4, a5, a6), [a7]);
        default:
          return app$1(o, [
                      a0,
                      a1,
                      a2,
                      a3,
                      a4,
                      a5,
                      a6,
                      a7
                    ]);
      }
    }
  }

  function __8(o) {
    var arity = o.length;
    if (arity === 8) {
      return o;
    } else {
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return _8(o, a0, a1, a2, a3, a4, a5, a6, a7);
      };
    }
  }

  curry.app = app$1;
  curry._1 = _1;
  curry.__1 = __1;
  curry._2 = _2;
  curry.__2 = __2;
  curry._3 = _3;
  curry.__3 = __3;
  curry._4 = _4;
  curry.__4 = __4;
  curry._5 = _5;
  curry.__5 = __5;
  curry._6 = _6;
  curry.__6 = __6;
  curry._7 = _7;
  curry.__7 = __7;
  curry._8 = _8;
  curry.__8 = __8;

  var caml_primitive = {};

  function caml_int_compare(x, y) {
    if (x < y) {
      return -1;
    } else if (x === y) {
      return 0;
    } else {
      return 1;
    }
  }

  function caml_bool_compare(x, y) {
    if (x) {
      if (y) {
        return 0;
      } else {
        return 1;
      }
    } else if (y) {
      return -1;
    } else {
      return 0;
    }
  }

  function caml_float_compare(x, y) {
    if (x === y) {
      return 0;
    } else if (x < y) {
      return -1;
    } else if (x > y || x === x) {
      return 1;
    } else if (y === y) {
      return -1;
    } else {
      return 0;
    }
  }

  function caml_string_compare(s1, s2) {
    if (s1 === s2) {
      return 0;
    } else if (s1 < s2) {
      return -1;
    } else {
      return 1;
    }
  }

  function caml_bool_min(x, y) {
    if (x) {
      return y;
    } else {
      return x;
    }
  }

  function caml_int_min(x, y) {
    if (x < y) {
      return x;
    } else {
      return y;
    }
  }

  function caml_float_min(x, y) {
    if (x < y) {
      return x;
    } else {
      return y;
    }
  }

  function caml_string_min(x, y) {
    if (x < y) {
      return x;
    } else {
      return y;
    }
  }

  function caml_int32_min(x, y) {
    if (x < y) {
      return x;
    } else {
      return y;
    }
  }

  function caml_bool_max(x, y) {
    if (x) {
      return x;
    } else {
      return y;
    }
  }

  function caml_int_max(x, y) {
    if (x > y) {
      return x;
    } else {
      return y;
    }
  }

  function caml_float_max(x, y) {
    if (x > y) {
      return x;
    } else {
      return y;
    }
  }

  function caml_string_max(x, y) {
    if (x > y) {
      return x;
    } else {
      return y;
    }
  }

  function caml_int32_max(x, y) {
    if (x > y) {
      return x;
    } else {
      return y;
    }
  }

  var caml_int32_compare = caml_int_compare;

  caml_primitive.caml_int_compare = caml_int_compare;
  caml_primitive.caml_bool_compare = caml_bool_compare;
  caml_primitive.caml_float_compare = caml_float_compare;
  caml_primitive.caml_string_compare = caml_string_compare;
  caml_primitive.caml_int32_compare = caml_int32_compare;
  caml_primitive.caml_bool_min = caml_bool_min;
  caml_primitive.caml_int_min = caml_int_min;
  caml_primitive.caml_float_min = caml_float_min;
  caml_primitive.caml_string_min = caml_string_min;
  caml_primitive.caml_int32_min = caml_int32_min;
  caml_primitive.caml_bool_max = caml_bool_max;
  caml_primitive.caml_int_max = caml_int_max;
  caml_primitive.caml_float_max = caml_float_max;
  caml_primitive.caml_string_max = caml_string_max;
  caml_primitive.caml_int32_max = caml_int32_max;

  var caml_js_exceptions = {};

  var caml_option = {};

  function isNested(x) {
    return x.BS_PRIVATE_NESTED_SOME_NONE !== undefined;
  }

  function some(x) {
    if (x === undefined) {
      return {
              BS_PRIVATE_NESTED_SOME_NONE: 0
            };
    } else if (x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
      return {
              BS_PRIVATE_NESTED_SOME_NONE: x.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
            };
    } else {
      return x;
    }
  }

  function nullable_to_opt(x) {
    if (x == null) {
      return ;
    } else {
      return some(x);
    }
  }

  function undefined_to_opt(x) {
    if (x === undefined) {
      return ;
    } else {
      return some(x);
    }
  }

  function null_to_opt(x) {
    if (x === null) {
      return ;
    } else {
      return some(x);
    }
  }

  function valFromOption(x) {
    if (!(x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== undefined)) {
      return x;
    }
    var depth = x.BS_PRIVATE_NESTED_SOME_NONE;
    if (depth === 0) {
      return ;
    } else {
      return {
              BS_PRIVATE_NESTED_SOME_NONE: depth - 1 | 0
            };
    }
  }

  function option_get(x) {
    if (x === undefined) {
      return ;
    } else {
      return valFromOption(x);
    }
  }

  function option_unwrap(x) {
    if (x !== undefined) {
      return x.VAL;
    } else {
      return x;
    }
  }

  caml_option.nullable_to_opt = nullable_to_opt;
  caml_option.undefined_to_opt = undefined_to_opt;
  caml_option.null_to_opt = null_to_opt;
  caml_option.valFromOption = valFromOption;
  caml_option.some = some;
  caml_option.isNested = isNested;
  caml_option.option_get = option_get;
  caml_option.option_unwrap = option_unwrap;

  var caml_exceptions = {};

  var id = {
    contents: 0
  };

  function create(str) {
    id.contents = id.contents + 1 | 0;
    return str + ("/" + id.contents);
  }

  function caml_is_extension(e) {
    if (e == null) {
      return false;
    } else {
      return typeof e.RE_EXN_ID === "string";
    }
  }

  function caml_exn_slot_name(x) {
    return x.RE_EXN_ID;
  }

  caml_exceptions.id = id;
  caml_exceptions.create = create;
  caml_exceptions.caml_is_extension = caml_is_extension;
  caml_exceptions.caml_exn_slot_name = caml_exn_slot_name;

  var Caml_option$1 = caml_option;
  var Caml_exceptions = caml_exceptions;

  var $$Error = /* @__PURE__ */Caml_exceptions.create("Caml_js_exceptions.Error");

  function internalToOCamlException(e) {
    if (Caml_exceptions.caml_is_extension(e)) {
      return e;
    } else {
      return {
              RE_EXN_ID: $$Error,
              _1: e
            };
    }
  }

  function caml_as_js_exn(exn) {
    if (exn.RE_EXN_ID === $$Error) {
      return Caml_option$1.some(exn._1);
    }
    
  }

  caml_js_exceptions.$$Error = $$Error;
  caml_js_exceptions.internalToOCamlException = internalToOCamlException;
  caml_js_exceptions.caml_as_js_exn = caml_as_js_exn;

  var Char = char;
  var Curry$1 = curry;
  var Caml_bytes$1 = caml_bytes;
  var Caml_primitive$1 = caml_primitive;
  var Caml_js_exceptions$1 = caml_js_exceptions;

  function make$2(n, c) {
    var s = Caml_bytes$1.caml_create_bytes(n);
    Caml_bytes$1.caml_fill_bytes(s, 0, n, c);
    return s;
  }

  function init$1(n, f) {
    var s = Caml_bytes$1.caml_create_bytes(n);
    for(var i = 0; i < n; ++i){
      s[i] = Curry$1._1(f, i);
    }
    return s;
  }

  var empty = [];

  function copy$1(s) {
    var len = s.length;
    var r = Caml_bytes$1.caml_create_bytes(len);
    Caml_bytes$1.caml_blit_bytes(s, 0, r, 0, len);
    return r;
  }

  function to_string(b) {
    return Caml_bytes$1.bytes_to_string(copy$1(b));
  }

  function of_string(s) {
    return copy$1(Caml_bytes$1.bytes_of_string(s));
  }

  function sub$1(s, ofs, len) {
    if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "String.sub / Bytes.sub",
            Error: new Error()
          };
    }
    var r = Caml_bytes$1.caml_create_bytes(len);
    Caml_bytes$1.caml_blit_bytes(s, ofs, r, 0, len);
    return r;
  }

  function sub_string(b, ofs, len) {
    return Caml_bytes$1.bytes_to_string(sub$1(b, ofs, len));
  }

  function $plus$plus(a, b) {
    var c = a + b | 0;
    var match = a < 0;
    var match$1 = b < 0;
    var match$2 = c < 0;
    if (match) {
      if (!match$1) {
        return c;
      }
      if (match$2) {
        return c;
      }
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Bytes.extend",
            Error: new Error()
          };
    }
    if (match$1) {
      return c;
    }
    if (match$2) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Bytes.extend",
            Error: new Error()
          };
    }
    return c;
  }

  function extend(s, left, right) {
    var len = $plus$plus($plus$plus(s.length, left), right);
    var r = Caml_bytes$1.caml_create_bytes(len);
    var match = left < 0 ? [
        -left | 0,
        0
      ] : [
        0,
        left
      ];
    var dstoff = match[1];
    var srcoff = match[0];
    var cpylen = Caml_primitive$1.caml_int_min(s.length - srcoff | 0, len - dstoff | 0);
    if (cpylen > 0) {
      Caml_bytes$1.caml_blit_bytes(s, srcoff, r, dstoff, cpylen);
    }
    return r;
  }

  function fill$1(s, ofs, len, c) {
    if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "String.fill / Bytes.fill",
            Error: new Error()
          };
    }
    return Caml_bytes$1.caml_fill_bytes(s, ofs, len, c);
  }

  function blit$1(s1, ofs1, s2, ofs2, len) {
    if (len < 0 || ofs1 < 0 || ofs1 > (s1.length - len | 0) || ofs2 < 0 || ofs2 > (s2.length - len | 0)) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Bytes.blit",
            Error: new Error()
          };
    }
    return Caml_bytes$1.caml_blit_bytes(s1, ofs1, s2, ofs2, len);
  }

  function blit_string(s1, ofs1, s2, ofs2, len) {
    if (len < 0 || ofs1 < 0 || ofs1 > (s1.length - len | 0) || ofs2 < 0 || ofs2 > (s2.length - len | 0)) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "String.blit / Bytes.blit_string",
            Error: new Error()
          };
    }
    return Caml_bytes$1.caml_blit_string(s1, ofs1, s2, ofs2, len);
  }

  function iter$1(f, a) {
    for(var i = 0 ,i_finish = a.length; i < i_finish; ++i){
      Curry$1._1(f, a[i]);
    }
    
  }

  function iteri$1(f, a) {
    for(var i = 0 ,i_finish = a.length; i < i_finish; ++i){
      Curry$1._2(f, i, a[i]);
    }
    
  }

  function ensure_ge$1(x, y) {
    if (x >= y) {
      return x;
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Bytes.concat",
          Error: new Error()
        };
  }

  function sum_lengths$1(_acc, seplen, _param) {
    while(true) {
      var param = _param;
      var acc = _acc;
      if (!param) {
        return acc;
      }
      var tl = param.tl;
      var hd = param.hd;
      if (!tl) {
        return hd.length + acc | 0;
      }
      _param = tl;
      _acc = ensure_ge$1((hd.length + seplen | 0) + acc | 0, acc);
      continue ;
    }}

  function concat$1(sep, l) {
    if (!l) {
      return empty;
    }
    var seplen = sep.length;
    var dst = Caml_bytes$1.caml_create_bytes(sum_lengths$1(0, seplen, l));
    var _pos = 0;
    var _param = l;
    while(true) {
      var param = _param;
      var pos = _pos;
      if (!param) {
        return dst;
      }
      var tl = param.tl;
      var hd = param.hd;
      if (tl) {
        Caml_bytes$1.caml_blit_bytes(hd, 0, dst, pos, hd.length);
        Caml_bytes$1.caml_blit_bytes(sep, 0, dst, pos + hd.length | 0, seplen);
        _param = tl;
        _pos = (pos + hd.length | 0) + seplen | 0;
        continue ;
      }
      Caml_bytes$1.caml_blit_bytes(hd, 0, dst, pos, hd.length);
      return dst;
    }}

  function cat(s1, s2) {
    var l1 = s1.length;
    var l2 = s2.length;
    var r = Caml_bytes$1.caml_create_bytes(l1 + l2 | 0);
    Caml_bytes$1.caml_blit_bytes(s1, 0, r, 0, l1);
    Caml_bytes$1.caml_blit_bytes(s2, 0, r, l1, l2);
    return r;
  }

  function is_space$1(param) {
    if (param > 13 || param < 9) {
      return param === 32;
    } else {
      return param !== 11;
    }
  }

  function trim$1(s) {
    var len = s.length;
    var i = 0;
    while(i < len && is_space$1(s[i])) {
      i = i + 1 | 0;
    }  var j = len - 1 | 0;
    while(j >= i && is_space$1(s[j])) {
      j = j - 1 | 0;
    }  if (j >= i) {
      return sub$1(s, i, (j - i | 0) + 1 | 0);
    } else {
      return empty;
    }
  }

  function escaped$1(s) {
    var n = 0;
    for(var i = 0 ,i_finish = s.length; i < i_finish; ++i){
      var match = s[i];
      n = n + (
        match >= 32 ? (
            match > 92 || match < 34 ? (
                match >= 127 ? 4 : 1
              ) : (
                match > 91 || match < 35 ? 2 : 1
              )
          ) : (
            match >= 11 ? (
                match !== 13 ? 4 : 2
              ) : (
                match >= 8 ? 2 : 4
              )
          )
      ) | 0;
    }
    if (n === s.length) {
      return copy$1(s);
    }
    var s$prime = Caml_bytes$1.caml_create_bytes(n);
    n = 0;
    for(var i$1 = 0 ,i_finish$1 = s.length; i$1 < i_finish$1; ++i$1){
      var c = s[i$1];
      var exit = 0;
      if (c >= 35) {
        if (c !== 92) {
          if (c >= 127) {
            exit = 1;
          } else {
            s$prime[n] = c;
          }
        } else {
          exit = 2;
        }
      } else if (c >= 32) {
        if (c >= 34) {
          exit = 2;
        } else {
          s$prime[n] = c;
        }
      } else if (c >= 14) {
        exit = 1;
      } else {
        switch (c) {
          case 8 :
              s$prime[n] = /* '\\' */92;
              n = n + 1 | 0;
              s$prime[n] = /* 'b' */98;
              break;
          case 9 :
              s$prime[n] = /* '\\' */92;
              n = n + 1 | 0;
              s$prime[n] = /* 't' */116;
              break;
          case 10 :
              s$prime[n] = /* '\\' */92;
              n = n + 1 | 0;
              s$prime[n] = /* 'n' */110;
              break;
          case 0 :
          case 1 :
          case 2 :
          case 3 :
          case 4 :
          case 5 :
          case 6 :
          case 7 :
          case 11 :
          case 12 :
              exit = 1;
              break;
          case 13 :
              s$prime[n] = /* '\\' */92;
              n = n + 1 | 0;
              s$prime[n] = /* 'r' */114;
              break;
          
        }
      }
      switch (exit) {
        case 1 :
            s$prime[n] = /* '\\' */92;
            n = n + 1 | 0;
            s$prime[n] = 48 + (c / 100 | 0) | 0;
            n = n + 1 | 0;
            s$prime[n] = 48 + (c / 10 | 0) % 10 | 0;
            n = n + 1 | 0;
            s$prime[n] = 48 + c % 10 | 0;
            break;
        case 2 :
            s$prime[n] = /* '\\' */92;
            n = n + 1 | 0;
            s$prime[n] = c;
            break;
        
      }
      n = n + 1 | 0;
    }
    return s$prime;
  }

  function map$1(f, s) {
    var l = s.length;
    if (l === 0) {
      return s;
    }
    var r = Caml_bytes$1.caml_create_bytes(l);
    for(var i = 0; i < l; ++i){
      r[i] = Curry$1._1(f, s[i]);
    }
    return r;
  }

  function mapi$1(f, s) {
    var l = s.length;
    if (l === 0) {
      return s;
    }
    var r = Caml_bytes$1.caml_create_bytes(l);
    for(var i = 0; i < l; ++i){
      r[i] = Curry$1._2(f, i, s[i]);
    }
    return r;
  }

  function uppercase_ascii$1(s) {
    return map$1(Char.uppercase_ascii, s);
  }

  function lowercase_ascii$1(s) {
    return map$1(Char.lowercase_ascii, s);
  }

  function apply1(f, s) {
    if (s.length === 0) {
      return s;
    }
    var r = copy$1(s);
    r[0] = Curry$1._1(f, s[0]);
    return r;
  }

  function capitalize_ascii$1(s) {
    return apply1(Char.uppercase_ascii, s);
  }

  function uncapitalize_ascii$1(s) {
    return apply1(Char.lowercase_ascii, s);
  }

  function index_rec$1(s, lim, _i, c) {
    while(true) {
      var i = _i;
      if (i >= lim) {
        throw {
              RE_EXN_ID: "Not_found",
              Error: new Error()
            };
      }
      if (s[i] === c) {
        return i;
      }
      _i = i + 1 | 0;
      continue ;
    }}

  function index$1(s, c) {
    return index_rec$1(s, s.length, 0, c);
  }

  function index_rec_opt$1(s, lim, _i, c) {
    while(true) {
      var i = _i;
      if (i >= lim) {
        return ;
      }
      if (s[i] === c) {
        return i;
      }
      _i = i + 1 | 0;
      continue ;
    }}

  function index_opt$1(s, c) {
    return index_rec_opt$1(s, s.length, 0, c);
  }

  function index_from$1(s, i, c) {
    var l = s.length;
    if (i < 0 || i > l) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "String.index_from / Bytes.index_from",
            Error: new Error()
          };
    }
    return index_rec$1(s, l, i, c);
  }

  function index_from_opt$1(s, i, c) {
    var l = s.length;
    if (i < 0 || i > l) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "String.index_from_opt / Bytes.index_from_opt",
            Error: new Error()
          };
    }
    return index_rec_opt$1(s, l, i, c);
  }

  function rindex_rec$1(s, _i, c) {
    while(true) {
      var i = _i;
      if (i < 0) {
        throw {
              RE_EXN_ID: "Not_found",
              Error: new Error()
            };
      }
      if (s[i] === c) {
        return i;
      }
      _i = i - 1 | 0;
      continue ;
    }}

  function rindex$1(s, c) {
    return rindex_rec$1(s, s.length - 1 | 0, c);
  }

  function rindex_from$1(s, i, c) {
    if (i < -1 || i >= s.length) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "String.rindex_from / Bytes.rindex_from",
            Error: new Error()
          };
    }
    return rindex_rec$1(s, i, c);
  }

  function rindex_rec_opt$1(s, _i, c) {
    while(true) {
      var i = _i;
      if (i < 0) {
        return ;
      }
      if (s[i] === c) {
        return i;
      }
      _i = i - 1 | 0;
      continue ;
    }}

  function rindex_opt$1(s, c) {
    return rindex_rec_opt$1(s, s.length - 1 | 0, c);
  }

  function rindex_from_opt$1(s, i, c) {
    if (i < -1 || i >= s.length) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "String.rindex_from_opt / Bytes.rindex_from_opt",
            Error: new Error()
          };
    }
    return rindex_rec_opt$1(s, i, c);
  }

  function contains_from$1(s, i, c) {
    var l = s.length;
    if (i < 0 || i > l) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "String.contains_from / Bytes.contains_from",
            Error: new Error()
          };
    }
    try {
      index_rec$1(s, l, i, c);
      return true;
    }
    catch (raw_exn){
      var exn = Caml_js_exceptions$1.internalToOCamlException(raw_exn);
      if (exn.RE_EXN_ID === "Not_found") {
        return false;
      }
      throw exn;
    }
  }

  function contains$1(s, c) {
    return contains_from$1(s, 0, c);
  }

  function rcontains_from$1(s, i, c) {
    if (i < 0 || i >= s.length) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "String.rcontains_from / Bytes.rcontains_from",
            Error: new Error()
          };
    }
    try {
      rindex_rec$1(s, i, c);
      return true;
    }
    catch (raw_exn){
      var exn = Caml_js_exceptions$1.internalToOCamlException(raw_exn);
      if (exn.RE_EXN_ID === "Not_found") {
        return false;
      }
      throw exn;
    }
  }

  var compare$1 = Caml_bytes$1.caml_bytes_compare;

  function uppercase$1(s) {
    return map$1(Char.uppercase, s);
  }

  function lowercase$1(s) {
    return map$1(Char.lowercase, s);
  }

  function capitalize$1(s) {
    return apply1(Char.uppercase, s);
  }

  function uncapitalize$1(s) {
    return apply1(Char.lowercase, s);
  }

  var equal$1 = Caml_bytes$1.caml_bytes_equal;

  var unsafe_to_string = Caml_bytes$1.bytes_to_string;

  var unsafe_of_string = Caml_bytes$1.bytes_of_string;

  bytes.make = make$2;
  bytes.init = init$1;
  bytes.empty = empty;
  bytes.copy = copy$1;
  bytes.of_string = of_string;
  bytes.to_string = to_string;
  bytes.sub = sub$1;
  bytes.sub_string = sub_string;
  bytes.extend = extend;
  bytes.fill = fill$1;
  bytes.blit = blit$1;
  bytes.blit_string = blit_string;
  bytes.concat = concat$1;
  bytes.cat = cat;
  bytes.iter = iter$1;
  bytes.iteri = iteri$1;
  bytes.map = map$1;
  bytes.mapi = mapi$1;
  bytes.trim = trim$1;
  bytes.escaped = escaped$1;
  bytes.index = index$1;
  bytes.index_opt = index_opt$1;
  bytes.rindex = rindex$1;
  bytes.rindex_opt = rindex_opt$1;
  bytes.index_from = index_from$1;
  bytes.index_from_opt = index_from_opt$1;
  bytes.rindex_from = rindex_from$1;
  bytes.rindex_from_opt = rindex_from_opt$1;
  bytes.contains = contains$1;
  bytes.contains_from = contains_from$1;
  bytes.rcontains_from = rcontains_from$1;
  bytes.uppercase = uppercase$1;
  bytes.lowercase = lowercase$1;
  bytes.capitalize = capitalize$1;
  bytes.uncapitalize = uncapitalize$1;
  bytes.uppercase_ascii = uppercase_ascii$1;
  bytes.lowercase_ascii = lowercase_ascii$1;
  bytes.capitalize_ascii = capitalize_ascii$1;
  bytes.uncapitalize_ascii = uncapitalize_ascii$1;
  bytes.compare = compare$1;
  bytes.equal = equal$1;
  bytes.unsafe_to_string = unsafe_to_string;
  bytes.unsafe_of_string = unsafe_of_string;

  var caml_string = {};

  function get$1(s, i) {
    if (i >= s.length || i < 0) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "index out of bounds",
            Error: new Error()
          };
    }
    return s.charCodeAt(i);
  }

  function make$1(n, ch) {
    return String.fromCharCode(ch).repeat(n);
  }

  caml_string.get = get$1;
  caml_string.make = make$1;

  var Bytes = bytes;
  var Curry = curry;
  var Caml_bytes = caml_bytes;
  var Caml_string = caml_string;
  var Caml_primitive = caml_primitive;
  var Caml_js_exceptions = caml_js_exceptions;

  function init(n, f) {
    return Caml_bytes.bytes_to_string(Bytes.init(n, f));
  }

  function copy(s) {
    return Caml_bytes.bytes_to_string(Bytes.copy(Caml_bytes.bytes_of_string(s)));
  }

  function sub(s, ofs, len) {
    return Caml_bytes.bytes_to_string(Bytes.sub(Caml_bytes.bytes_of_string(s), ofs, len));
  }

  function ensure_ge(x, y) {
    if (x >= y) {
      return x;
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.concat",
          Error: new Error()
        };
  }

  function sum_lengths(_acc, seplen, _param) {
    while(true) {
      var param = _param;
      var acc = _acc;
      if (!param) {
        return acc;
      }
      var tl = param.tl;
      var hd = param.hd;
      if (!tl) {
        return hd.length + acc | 0;
      }
      _param = tl;
      _acc = ensure_ge((hd.length + seplen | 0) + acc | 0, acc);
      continue ;
    }}

  function unsafe_blits(dst, _pos, sep, seplen, _param) {
    while(true) {
      var param = _param;
      var pos = _pos;
      if (!param) {
        return dst;
      }
      var tl = param.tl;
      var hd = param.hd;
      if (tl) {
        Caml_bytes.caml_blit_string(hd, 0, dst, pos, hd.length);
        Caml_bytes.caml_blit_string(sep, 0, dst, pos + hd.length | 0, seplen);
        _param = tl;
        _pos = (pos + hd.length | 0) + seplen | 0;
        continue ;
      }
      Caml_bytes.caml_blit_string(hd, 0, dst, pos, hd.length);
      return dst;
    }}

  function concat(sep, l) {
    if (!l) {
      return "";
    }
    var seplen = sep.length;
    return Caml_bytes.bytes_to_string(unsafe_blits(Caml_bytes.caml_create_bytes(sum_lengths(0, seplen, l)), 0, sep, seplen, l));
  }

  function iter(f, s) {
    for(var i = 0 ,i_finish = s.length; i < i_finish; ++i){
      Curry._1(f, s.charCodeAt(i));
    }
    
  }

  function iteri(f, s) {
    for(var i = 0 ,i_finish = s.length; i < i_finish; ++i){
      Curry._2(f, i, s.charCodeAt(i));
    }
    
  }

  function map(f, s) {
    return Caml_bytes.bytes_to_string(Bytes.map(f, Caml_bytes.bytes_of_string(s)));
  }

  function mapi(f, s) {
    return Caml_bytes.bytes_to_string(Bytes.mapi(f, Caml_bytes.bytes_of_string(s)));
  }

  function is_space(param) {
    if (param > 13 || param < 9) {
      return param === 32;
    } else {
      return param !== 11;
    }
  }

  function trim(s) {
    if (s === "" || !(is_space(s.charCodeAt(0)) || is_space(s.charCodeAt(s.length - 1 | 0)))) {
      return s;
    } else {
      return Caml_bytes.bytes_to_string(Bytes.trim(Caml_bytes.bytes_of_string(s)));
    }
  }

  function escaped(s) {
    var needs_escape = function (_i) {
      while(true) {
        var i = _i;
        if (i >= s.length) {
          return false;
        }
        var match = s.charCodeAt(i);
        if (match < 32) {
          return true;
        }
        if (match > 92 || match < 34) {
          if (match >= 127) {
            return true;
          }
          _i = i + 1 | 0;
          continue ;
        }
        if (match > 91 || match < 35) {
          return true;
        }
        _i = i + 1 | 0;
        continue ;
      }  };
    if (needs_escape(0)) {
      return Caml_bytes.bytes_to_string(Bytes.escaped(Caml_bytes.bytes_of_string(s)));
    } else {
      return s;
    }
  }

  function index_rec(s, lim, _i, c) {
    while(true) {
      var i = _i;
      if (i >= lim) {
        throw {
              RE_EXN_ID: "Not_found",
              Error: new Error()
            };
      }
      if (s.charCodeAt(i) === c) {
        return i;
      }
      _i = i + 1 | 0;
      continue ;
    }}

  function index(s, c) {
    return index_rec(s, s.length, 0, c);
  }

  function index_rec_opt(s, lim, _i, c) {
    while(true) {
      var i = _i;
      if (i >= lim) {
        return ;
      }
      if (s.charCodeAt(i) === c) {
        return i;
      }
      _i = i + 1 | 0;
      continue ;
    }}

  function index_opt(s, c) {
    return index_rec_opt(s, s.length, 0, c);
  }

  function index_from(s, i, c) {
    var l = s.length;
    if (i < 0 || i > l) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "String.index_from / Bytes.index_from",
            Error: new Error()
          };
    }
    return index_rec(s, l, i, c);
  }

  function index_from_opt(s, i, c) {
    var l = s.length;
    if (i < 0 || i > l) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "String.index_from_opt / Bytes.index_from_opt",
            Error: new Error()
          };
    }
    return index_rec_opt(s, l, i, c);
  }

  function rindex_rec(s, _i, c) {
    while(true) {
      var i = _i;
      if (i < 0) {
        throw {
              RE_EXN_ID: "Not_found",
              Error: new Error()
            };
      }
      if (s.charCodeAt(i) === c) {
        return i;
      }
      _i = i - 1 | 0;
      continue ;
    }}

  function rindex(s, c) {
    return rindex_rec(s, s.length - 1 | 0, c);
  }

  function rindex_from(s, i, c) {
    if (i < -1 || i >= s.length) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "String.rindex_from / Bytes.rindex_from",
            Error: new Error()
          };
    }
    return rindex_rec(s, i, c);
  }

  function rindex_rec_opt(s, _i, c) {
    while(true) {
      var i = _i;
      if (i < 0) {
        return ;
      }
      if (s.charCodeAt(i) === c) {
        return i;
      }
      _i = i - 1 | 0;
      continue ;
    }}

  function rindex_opt(s, c) {
    return rindex_rec_opt(s, s.length - 1 | 0, c);
  }

  function rindex_from_opt(s, i, c) {
    if (i < -1 || i >= s.length) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "String.rindex_from_opt / Bytes.rindex_from_opt",
            Error: new Error()
          };
    }
    return rindex_rec_opt(s, i, c);
  }

  function contains_from(s, i, c) {
    var l = s.length;
    if (i < 0 || i > l) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "String.contains_from / Bytes.contains_from",
            Error: new Error()
          };
    }
    try {
      index_rec(s, l, i, c);
      return true;
    }
    catch (raw_exn){
      var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
      if (exn.RE_EXN_ID === "Not_found") {
        return false;
      }
      throw exn;
    }
  }

  function contains(s, c) {
    return contains_from(s, 0, c);
  }

  function rcontains_from(s, i, c) {
    if (i < 0 || i >= s.length) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "String.rcontains_from / Bytes.rcontains_from",
            Error: new Error()
          };
    }
    try {
      rindex_rec(s, i, c);
      return true;
    }
    catch (raw_exn){
      var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
      if (exn.RE_EXN_ID === "Not_found") {
        return false;
      }
      throw exn;
    }
  }

  function uppercase_ascii(s) {
    return Caml_bytes.bytes_to_string(Bytes.uppercase_ascii(Caml_bytes.bytes_of_string(s)));
  }

  function lowercase_ascii(s) {
    return Caml_bytes.bytes_to_string(Bytes.lowercase_ascii(Caml_bytes.bytes_of_string(s)));
  }

  function capitalize_ascii(s) {
    return Caml_bytes.bytes_to_string(Bytes.capitalize_ascii(Caml_bytes.bytes_of_string(s)));
  }

  function uncapitalize_ascii(s) {
    return Caml_bytes.bytes_to_string(Bytes.uncapitalize_ascii(Caml_bytes.bytes_of_string(s)));
  }

  var compare = Caml_primitive.caml_string_compare;

  function split_on_char(sep, s) {
    var r = /* [] */0;
    var j = s.length;
    for(var i = s.length - 1 | 0; i >= 0; --i){
      if (s.charCodeAt(i) === sep) {
        r = {
          hd: sub(s, i + 1 | 0, (j - i | 0) - 1 | 0),
          tl: r
        };
        j = i;
      }
      
    }
    return {
            hd: sub(s, 0, j),
            tl: r
          };
  }

  function uppercase(s) {
    return Caml_bytes.bytes_to_string(Bytes.uppercase(Caml_bytes.bytes_of_string(s)));
  }

  function lowercase(s) {
    return Caml_bytes.bytes_to_string(Bytes.lowercase(Caml_bytes.bytes_of_string(s)));
  }

  function capitalize(s) {
    return Caml_bytes.bytes_to_string(Bytes.capitalize(Caml_bytes.bytes_of_string(s)));
  }

  function uncapitalize(s) {
    return Caml_bytes.bytes_to_string(Bytes.uncapitalize(Caml_bytes.bytes_of_string(s)));
  }

  var make = Caml_string.make;

  var fill = Bytes.fill;

  var blit = Bytes.blit_string;

  function equal(prim, prim$1) {
    return prim === prim$1;
  }

  string.make = make;
  string.init = init;
  string.copy = copy;
  string.sub = sub;
  string.fill = fill;
  string.blit = blit;
  string.concat = concat;
  string.iter = iter;
  string.iteri = iteri;
  string.map = map;
  string.mapi = mapi;
  string.trim = trim;
  string.escaped = escaped;
  string.index = index;
  string.index_opt = index_opt;
  string.rindex = rindex;
  string.rindex_opt = rindex_opt;
  string.index_from = index_from;
  string.index_from_opt = index_from_opt;
  string.rindex_from = rindex_from;
  string.rindex_from_opt = rindex_from_opt;
  string.contains = contains;
  string.contains_from = contains_from;
  string.rcontains_from = rcontains_from;
  string.uppercase = uppercase;
  string.lowercase = lowercase;
  string.capitalize = capitalize;
  string.uncapitalize = uncapitalize;
  string.uppercase_ascii = uppercase_ascii;
  string.lowercase_ascii = lowercase_ascii;
  string.capitalize_ascii = capitalize_ascii;
  string.uncapitalize_ascii = uncapitalize_ascii;
  string.compare = compare;
  string.equal = equal;
  string.split_on_char = split_on_char;

  var $$String = string;
  var Caml_option = caml_option;

  function unwrapUnsafely(v) {
    if (v !== undefined) {
      return Caml_option.valFromOption(v);
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Passed `None` to unwrapUnsafely",
          Error: new Error()
        };
  }

  var app = unwrapUnsafely(Caml_option.nullable_to_opt(document.getElementById("app")));

  function appendTextTo(el, classNameOpt, text) {
    var className = classNameOpt !== undefined ? classNameOpt : "";
    var textNode = document.createElement("p");
    textNode.innerText = text;
    textNode.className = className;
    el.appendChild(textNode);
    
  }

  function appendTextToApp(param, param$1) {
    return appendTextTo(app, param, param$1);
  }

  function isFizz(x) {
    if (x % 3 === 0) {
      return /* Fizz */0;
    } else {
      return /* None */1;
    }
  }

  function isBuzz(x) {
    if (x % 5 === 0) {
      return /* Buzz */0;
    } else {
      return /* None */1;
    }
  }

  function get(x) {
    var res_0 = isFizz(x);
    var res_1 = isBuzz(x);
    if (res_0) {
      if (res_1) {
        return String(x);
      } else {
        return "Buzz";
      }
    } else if (res_1) {
      return "Fizz";
    } else {
      return "FizzBuzz";
    }
  }

  var FizzBuzz = {
    isFizz: isFizz,
    isBuzz: isBuzz,
    get: get
  };

  function yesOrNo(a) {
    switch (a) {
      case "n" :
      case "no" :
          return /* No */1;
      case "y" :
      case "ya" :
      case "yea" :
      case "yeah" :
      case "yes" :
          return /* Yes */0;
      default:
        return /* No */1;
    }
  }

  var answer;

  try {
    answer = yesOrNo($$String.lowercase_ascii(window.prompt("Do you want to guess the FizzBuzz?")));
  }
  catch (exn){
    answer = /* No */1;
  }

  var state = answer ? /* NoGuess */1 : /* Guess */0;

  var $$continue = {
    contents: true
  };

  function guessingGame(x) {
    var guess = window.prompt("What is the result of FizzBuzz " + String(x));
    var res = get(x);
    var isCorrect = guess === res;
    if (isCorrect) {
      window.alert("Correct!");
      return appendTextTo(app, res, res);
    } else {
      window.alert("Incorrect!");
      $$continue.contents = false;
      return ;
    }
  }

  for(var x = 1; x <= 100; ++x){
    var match = $$continue.contents;
    if (state) {
      var res = get(x);
      appendTextTo(app, res, res);
    } else if (match) {
      guessingGame(x);
    }
    
  }

  var unwrapUnsafely_1 = demo_bs.unwrapUnsafely = unwrapUnsafely;
  var app_1 = demo_bs.app = app;
  var appendTextTo_1 = demo_bs.appendTextTo = appendTextTo;
  var appendTextToApp_1 = demo_bs.appendTextToApp = appendTextToApp;
  var FizzBuzz_1 = demo_bs.FizzBuzz = FizzBuzz;
  var yesOrNo_1 = demo_bs.yesOrNo = yesOrNo;
  var answer_1 = demo_bs.answer = answer;
  var state_1 = demo_bs.state = state;
  var $$continue_1 = demo_bs.$$continue = $$continue;
  var guessingGame_1 = demo_bs.guessingGame = guessingGame;

  exports.$$continue = $$continue_1;
  exports.FizzBuzz = FizzBuzz_1;
  exports.answer = answer_1;
  exports.app = app_1;
  exports.appendTextTo = appendTextTo_1;
  exports.appendTextToApp = appendTextToApp_1;
  exports['default'] = demo_bs;
  exports.guessingGame = guessingGame_1;
  exports.state = state_1;
  exports.unwrapUnsafely = unwrapUnsafely_1;
  exports.yesOrNo = yesOrNo_1;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
//# sourceMappingURL=bundle.js.map
