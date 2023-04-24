// 用户登录payload,email或是mobile
// {
//     "captcha": {
//         "code": "27819",
//         "id": "dOA980tYva9kSBgJtqVm"
//     },
//     "email": "test@qq.com"
//     "mobile": "18038068070",
//     "password": "123456",
//     "sid": "LBwKVt1iwT6EMx-Vgp9CX1675945319386"
// }
/**
 * 登录处理
 * @param {*} payload
 * @returns
 */
function User(payload) {
  const captcha = Process(
    "yao.utils.CaptchaValidate",
    payload.captcha.id,
    payload.captcha.code
  );
  if (captcha !== true) {
    throw new Exception("验证码不正确!", 400);
  }

  let account = payload.mobile || payload.email;

  const [user] = Process("models.contact.user.get", {
    wheres: [
      { column: "mobile", value: account },
      { column: "status", value: "启用" },
      { method: "orwhere", column: "email", value: account },
    ],
    limit: 1,
  });

  if (!user) {
    throw new Exception("用户不存在", 400);
  }

  const password_validate = Process(
    "utils.pwd.Verify",
    payload.password,
    user.password
  );

  if (password_validate !== true) {
    throw new Exception("密码不正确!", 400);
  }

  const sessionId = Process("session.start");
  let userPayload = { ...user };
  delete userPayload.password;
  const jwtOptions = {
    timeout: 28800,
    sid: sessionId,
  };
  const jwtClaims = { user_name: user.name };
  const jwt = Process("utils.jwt.Make", user.id, jwtClaims, jwtOptions);
  Process("session.set", "user", userPayload, 28800);
  Process("session.set", "token", jwt.token, 28800);
  Process("session.set", "user_id", user.id, 28800);

  return {
    sid: sessionId,
    user: userPayload,
    menus: Process("flows.app.menu"),
    token: jwt.token,
    expires_at: jwt.expires_at,
  };
}
