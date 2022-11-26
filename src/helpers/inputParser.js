export function buildContractCallInput(inputs, contract, methodName, args) {
  let input = `(contract-call? '${contract} ${methodName} ${driveThrough(
    args,
    inputs
  )})`;
  return input;
}

export function parseSyntax(value, type) {
  if (value == null || value == undefined) return "";
  if (type == "principal" || type.includes("<")) {
    return "'" + value;
  } else if (type == "uint") {
    return "u" + value;
  } else {
    return value;
  }
}

export function validateInputCount(arg) {
  if (!arg) return false;
  let num = 0;
  let type = [];
  if (arg.typeName == "list") {
    let length = Number(arg.length);
    if (arg.inputs) {
      let sum = 0;
      let { count, type: _type } = validateInputCount(arg.inputs);
      sum += count;
      num = sum * length;
      for (let i = 0; i < num; i++) {
        type.push(_type);
      }
    } else {
      num += length;
      for (let i = 0; i < num; i++) {
        type.push(arg.inputType || arg.typeName);
      }
    }
  } else if (arg.typeName == "tuple") {
    let keys = Object.keys(arg.fields);
    for (let i = 0; i < keys.length; i++) {
      let { count, type: _type } = validateInputCount(arg.fields[keys[i]]);
      num += count;
      if (typeof _type == "string") {
        type.push(_type);
      } else {
        type = [...type, ..._type];
      }
    }
  } else {
    if (arg.length) {
      num += Number(arg.length);
      type = arg.inputType || arg.typeName;
    } else num += 1;
    type = arg.inputType || arg.typeName;
  }

  return { count: num, type };
}

export function driveThrough(args, input, addName) {
    if(!args){
        return "";
    }
  let inp = ``;
  let keys = Object.keys(args);

  for (let i = 0; i < keys.length; i++) {
    if (input.length == 0) {
      break;
    }
    let arg = args[keys[i]];
    inp += addName && arg.name ? `(${arg.name} ` : ``;
    if (arg.typeName == "list") {
      let length = Number(arg.length);
      let listInp = "";
      if (arg.inputs) {
        for (let j = 0; j < length; j++) {
          listInp += `${driveThrough({ 0: arg.inputs }, input)}${
            j == length - 1 ? "" : " "
          }`;
        }
      } else {
        for (let j = 0; j < length; j++) {
          listInp += `${parseSyntax(input[0], arg.inputType)}${
            j == length - 1 ? "" : " "
          }`;
          input.shift();
        }
      }
      inp += `(list ${listInp}) `;
    } else if (arg.typeName == "tuple") {
      let tupInp = "";
      let output = driveThrough(arg.fields, input, true);
      tupInp += `${output}`;

      inp += `(tuple ${tupInp}) `;
    } else {
      inp += `${parseSyntax(input[0], arg.typeName)} `;
      input.shift();
    }

    inp = addName && arg.name ? (inp += ") ") : inp;
  }

  return inp;
}

export function sendInput(input) {
  window.electron.ipcSend("execute.command", input);
}
