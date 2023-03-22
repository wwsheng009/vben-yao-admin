function Success(data) {
  return {
    code: 0,
    message: "ok",
    type: "success",
    result: data,
  };
}

function Error(data, code, message) {
  let vcode = code;
  let vmessage = message;
  if (code == undefined) {
    vcode = -1;
  }
  if (message == undefined) {
    vmessage = "error";
  }
  return {
    code: vcode,
    message: vmessage,
    type: "error",
    result: data,
  };
}
