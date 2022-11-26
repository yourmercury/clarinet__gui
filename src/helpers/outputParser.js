export function handleAssetsMaps(data) {
  let indicatorIndex_start = data.indexOf("get_assets_maps_start");
  let indicatorIndex_end = data.indexOf("get_assets_maps_end");

  data = data.slice(indicatorIndex_start + 1, indicatorIndex_end);

  const header = data.shift().split(" ");
  header.pop();
  header.pop();
  header.shift();
  const addresses = [];
  const stxBalance = [];
  const tokens = {};

  data.forEach((row, index) => {
    if (row.startsWith("S") && row.length > 39) {
      let arr = row.split(" ");
      arr.pop();
      let adr = arr[0];
      addresses.push(arr[0]);
      arr.shift();
      stxBalance.push(arr[arr.length - 1]);
      arr.pop();
      if (adr) {
        tokens[adr] = arr;
      }
    }
  });

  return { header, addresses, stxBalance, tokens };
}

export function handleContracts(data) {
  let indicatorIndex_start = data.indexOf("get_contracts_start");
  let indicatorIndex_end = data.indexOf("get_contracts_end");

  data = data.slice(indicatorIndex_start+1, indicatorIndex_end);

  const header = data.shift().split(" ");
  header.pop();
  const contracts = [];
  const methods = {};
  const methodNames = {};
  const args = {};

  data.forEach((row, index) => {
    if (row.startsWith("S") && row.length > 39) {
      let arr = row.split(",");
      contracts.push(arr[0]);
      let _name = arr[0];
      row = row.slice(_name.length + 1);
      arr = row.split(", ");
      const contract = _name;
      methods[contract] = [];
      methodNames[contract] = [];
      arr.forEach((method) => {
        methods[contract].push(method);
        let _name = "";
        let _args = false;
        for (let i = 1; i < method.length; i++) {
          if (method[i] == "(" || method[i] == ")") {
            if (method[i] == ")") {
              _args = false;
            } else {
              _args = true;
            }
            break;
          }
          _name += method[i];
        }
        methodNames[contract].push({ name: _name, signature: method });
        if(_args){
          args[method] = isolateArgs(method);
        }
        
      });
    }
  });
  return { header, list: contracts, methods, methodNames, args };
}

export function isolateArgs(method) {
  // let method = "(complex-method(first uint) (second (list 9 (list 1 uint))) (third (tuple (man (list 1 uint)) (woman bool))))";
  let args = method.slice(1, method.length - 1);
  let index = method.indexOf("(");
  let methodName = args.slice(0, index);
  if (index == -1) return [];
  args = args.slice(index);

  // Here is where I start spitting
  let argsArry = [];
  let closure = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] == "(") {
      closure.push(i);
    } else if (args[i] == ")") {
      if (closure.length > 1) {
        closure.pop();
      } else {
        let arg = args.slice(closure[0], i + 1);
        argsArry.push(arg);
        closure.pop();
      }
    }
  }

  return handleArgs(argsArry);
}

export function handleArgs(_) {
  // let arg = "(third principal)";
  let args = _ || [
    "(third (tuple (man (tuple (sun principal))) (woman bool) (jupiter uint)))",
    "(third (tuple (man (tuple (sun principal))) (woman bool)))",
  ];
  // let args = _ || ["(third (tuple (man (list 1 uint)) (woman bool)))"];
  let obj = {};
  for (let i = 0; i < args.length; i++) {
    let arg = args[i];
    let _name = arg.split(" ")[0].slice(1);
    let type = arg.slice(_name.length + 2, arg.length - 1);
    let typeName = type.slice(1, type.indexOf(" "));

    if (type.startsWith("(tuple")) {
      let inputs = handleTup(type);
      obj[i] = {
        name: _name,
        type: type,
        signature: arg,
        typeName,
        fields: handleArgs(inputs),
      };
    } else if (type.startsWith("(list") || type.startsWith("(string") || type.startsWith("(buff") ) {
      let _ = handleList(type);
      obj[i] = {
        ..._,
        name: _name,
        type: type,
        signature: arg,
        index: i,
      };
    } else {
      obj[i] = {
        name: _name,
        type: type,
        signature: arg,
        typeName: type,
        index: i,
      };
    }
  }

  return obj;
}

export function handleComplexTypes(type) {
  let typeName = type.split(" ")[0].slice(1);
  if (typeName == "tuple") {
    let inputs = handleTup(type);
    return inputs;
  } else if (typeName == "list") {
  }
}

function handleList(list) {
  list = list || "(list 3 uint)";
  let length = list.split(" ")[1];
  let inputType = list.slice(list.indexOf(length) + length.length + 1, list.length - 1);
  let typeName = list.slice(1, list.indexOf(" "));
  let inputs;

  if(inputType.startsWith("(tuple")){
    inputs = handleTup(inputType);
    inputs = handleArgs(inputs);
  }else if(inputType.startsWith("(list")){
    inputs = handleList(inputType);
  }else if(list.startsWith("(string-") || list.startsWith("(buff") ){
    length = length.slice(0, length.length-1);
  }

  return {
    signature: list,
    typeName,
    type: typeName,
    length: length,
    inputType: inputType,
    inputs
  };
}

function handleTup(method) {
  let args = method.slice(1, method.length - 1);
  let index = method.indexOf("(");
  let methodName = args.slice(0, index);
  if (index == -1) return [];
  args = args.slice(index);

  // Here is where I start spitting
  let argsArry = [];
  let closure = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] == "(") {
      closure.push(i);
    } else if (args[i] == ")") {
      if (closure.length > 1) {
        closure.pop();
      } else {
        let arg = args.slice(closure[0], i + 1);
        argsArry.push(arg);
        closure.pop();
      }
    }
  }
  return argsArry;
}

// let method = {
//   0: {
//     name: "third",
//     type: "(tuple (man (list 1 uint)) (woman bool))",
//     signature: "(third (tuple (man (list 1 uint)) (woman bool)))",
//     typeName: "tuple",
//     fields: {
//       0: {
//         name: "man",
//         type: "(list 1 uint)",
//         signature: "(man (list 1 uint))",
//         typeName: "list",
//         length: "1",
//         inputType: "uint",
//       },
//       1: {
//         name: "woman",
//         type: "bool",
//         signature: "(woman bool)",
//         typeName: "bool",
//       },
//     },
//   },

//   1: {
//     name: "fourth",
//     type: "(list 2 (tuple (man (list 1 uint)) (woman bool)))",
//     signature: "(fourth (list 2 (tuple (man (list 1 uint)) (woman bool)))",
//     typeName: "list",
//     length: 2,
//     inputType: "(tuple (man (list 1 uint)) (woman bool))",
//     input: {
//       type: "(tuple (man (list 1 uint)) (woman bool))",
//       signature: "(third (tuple (man (list 1 uint)) (woman bool)))",
//       typeName: "tuple",
//       fields: {
//         0: {
//           name: "man",
//           type: "(list 1 uint)",
//           signature: "(man (list 1 uint))",
//           typeName: "list",
//           length: "1",
//           inputType: "uint",
//         },
//         1: {
//           name: "woman",
//           type: "bool",
//           signature: "(woman bool)",
//           typeName: "bool",
//         },
//       },
//     },
//   },
// };
