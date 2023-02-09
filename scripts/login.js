
// 用户登录payload,email或是mobile
// {
//     "captcha": {
//         "code": "27819",
//         "id": "dOA980tYva9kSBgJtqVm"
//     },
//     "email": "test@qq.com" 
//     "mobile": "18038068070",
//     "password": "wwsheng",
//     "sid": "LBwKVt1iwT6EMx-Vgp9CX1675945319386"
// }
/**
 * 登录处理
 * @param {*} payload
 * @returns
 */
function User(payload) {
    let captcha = Process("yao.utils.CaptchaValidate", payload.captcha.id,
        payload.captcha.code)
    if (captcha !== true) {
        throw new Exception("验证码不正确!", 400);
    }
    var account = payload.mobile;
    if (!account) {
        account = payload.email;
    }
    var user = Process("models.contact.user.get", {
        wheres: [
            { column: "mobile", value: account },
            { column: "status", value: "启用" },
            {
                method: "orwhere",
                column: "email",
                value: account,
            },
        ],
        limit: 1,
    });
    if (!user || !user.length) {
        throw new Exception("用户不存在", 400);
    }
    // 验证密码
    var password_validate = Process(
        "utils.pwd.Verify",
        payload.password,
        user[0].password
    );
    if (password_validate !== true) {
        throw new Exception("密码不正确!", 400);
    }

    // 增加token等信息
    var session_id = Process("session.start");
    var jwt = Process(
        "utils.jwt.Make",
        user[0].id,
        { user_name: user[0].name },
        {
            timeout: 28800,
            sid: session_id,
        }
    );
    Process("session.set", "user", user[0], 28800);
    Process("session.set", "token", jwt.token, 28800);
    Process("session.set", "user_id", user[0].id, 28800);
    delete user[0].password;
    return {
        sid: session_id,
        user: user[0],
        menus: Process("flows.app.menu"),
        token: jwt.token,
        expires_at: jwt.expires_at,
    };
}