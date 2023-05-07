function AcountData() {
  const accountList = (() => {
    const result = [];
    for (let index = 0; index < 20; index++) {
      result.push({
        id: `${index}`,
        account: "@first",
        email: "@email",
        nickname: "@cname()",
        role: "@first",
        createTime: "@datetime",
        remark: "@cword(10,20)",
        "status|1": ["0", "1"],
      });
    }
    return result;
  })();
  return accountList;
}
//scripts.account.Main
function Acount() {
  const data = AcountData();
  return Process("scripts.return.Success", data);
}

//scripts.system.DeptList
function DeptList() {
  const q = Query();

  const data = q.Get({
    select: [
      "id",
      "deptName",
      "orderNo",
      "remark",
      "status",
      "parentDept",
      "created_at as createTime",
    ],
    from: "$admin.dept",
  });

  let res = Process("utils.arr.Tree", data, {
    parent: "parentDept",
    empty: null,
  });

  res = removeEmpty(res);

  return Process("scripts.return.Success", res);
}

function removeEmpty(obj) {
  for (var prop in obj) {
    if (obj[prop] === null || obj[prop] === undefined) {
      delete obj[prop];
    } else if (typeof obj[prop] === "object") {
      removeEmpty(obj[prop]);
      if (Array.isArray(obj[prop]) && obj[prop].length === 0) {
        delete obj[prop];
      } else if (Object.keys(obj[prop]).length === 0) {
        delete obj[prop];
      }
    }
  }
  return obj;
}
//scripts.system.RoleList
function RoleList() {
  const roleList = () => {
    const result = [];
    for (let index = 0; index < 4; index++) {
      result.push({
        id: index + 1,
        orderNo: `${index + 1}`,
        roleName: ["超级管理员", "管理员", "文章管理员", "普通用户"][index],
        roleValue: "@first",
        createTime: "@datetime",
        remark: "@cword(10,20)",
        menu: [["0", "1", "2"], ["0", "1"], ["0", "2"], ["2"]][index],
        "status|1": ["0", "1"],
      });
    }
    return result;
  };

  return Process("scripts.return.Success", roleList());
}

//scripts.system.SetRoleStatus
function SetRoleStatus() {
  return Process("scripts.return.Success", {});
}

//scripts.system.menuList
function MenuList() {
  const menuList = () => {
    const result = [];
    for (let index = 0; index < 3; index++) {
      result.push({
        id: `${index}`,
        icon: [
          "ion:layers-outline",
          "ion:git-compare-outline",
          "ion:tv-outline",
        ][index],
        component: "LAYOUT",
        type: "0",
        menuName: ["Dashboard", "权限管理", "功能"][index],
        permission: "",
        orderNo: index + 1,
        createTime: "@datetime",
        "status|1": ["0", "0", "1"],
        children: (() => {
          const children = [];
          for (let j = 0; j < 4; j++) {
            children.push({
              id: `${index}-${j}`,
              type: "1",
              menuName: ["菜单1", "菜单2", "菜单3", "菜单4"][j],
              icon: "ion:document",
              permission: [
                "menu1:view",
                "menu2:add",
                "menu3:update",
                "menu4:del",
              ][index],
              component: [
                "/dashboard/welcome/index",
                "/dashboard/analysis/index",
                "/dashboard/workbench/index",
                "/dashboard/test/index",
              ][j],
              orderNo: j + 1,
              createTime: "@datetime",
              "status|1": ["0", "1"],
              parentMenu: `${index}`,
              children: (() => {
                const children = [];
                for (let k = 0; k < 4; k++) {
                  children.push({
                    id: `${index}-${j}-${k}`,
                    type: "2",
                    menuName: "按钮" + (j + 1) + "-" + (k + 1),
                    icon: "",
                    permission:
                      ["menu1:view", "menu2:add", "menu3:update", "menu4:del"][
                        index
                      ] +
                      ":btn" +
                      (k + 1),
                    component: [
                      "/dashboard/welcome/index",
                      "/dashboard/analysis/index",
                      "/dashboard/workbench/index",
                      "/dashboard/test/index",
                    ][j],
                    orderNo: j + 1,
                    createTime: "@datetime",
                    "status|1": ["0", "1"],
                    parentMenu: `${index}-${j}`,
                    children: undefined,
                  });
                }
                return children;
              })(),
            });
          }
          return children;
        })(),
      });
    }
    return result;
  };
  return Process("scripts.return.Success", menuList());
}

//scripts.system.AcountExist
function AcountExist() {
  return Process("scripts.return.Success", true);
}
