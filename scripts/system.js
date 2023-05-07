//scripts.account.Main
function AcountList(page, pagesize, deptId, account) {
  const q = Query();

  let wheres = [];
  if (deptId) {
    wheres.push({
      field: "dept_id",
      comment: "部门id",
      op: "=",
      value: deptId,
    });
  }
  if (account) {
    wheres.push({
      field: "name",
      comment: "用户名",
      op: "=",
      value: account,
    });
  }
  const data = q.Get({
    select: [
      "id",
      "name as account",
      "email",
      "nickname",
      "role",
      "status",
      "remark",
      "created_at as createTime",
    ],
    wheres,
    from: "$admin.user",
    pagesize: pagesize,
    page: page,
  });

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
  const q = Query();

  const data = q.Get({
    select: [
      "id",
      "roleName",
      "roleValue",
      "orderNo",
      "remark",
      "menu",
      "status",
      "created_at as createTime",
    ],
    from: "$admin.role",
  });
  return Process("scripts.return.Success", data);
}

//scripts.system.SetRoleStatus
function SetRoleStatus(payload) {
  // {"id":1,"status":"1"}
  Process("models.admin.role.save", payload);
  return Process("scripts.return.Success", payload);
}

//scripts.system.MenuList
function MenuList() {
  //scripts.system.DeptList
  const q = Query();

  const data = q.Get({
    select: [
      "id",
      "menuName",
      "icon",
      "component",
      "type",
      "permission",
      "orderNo",
      "status",
      "parentMenu",
      "show",
      "isExt",
      "routePath",
      "created_at as createTime",
    ],
    from: "$admin.menu",
  });

  let res = Process("utils.arr.Tree", data, {
    parent: "parentMenu",
    empty: null,
  });

  res = removeEmpty(res);

  return Process("scripts.return.Success", res);
}

//scripts.system.AcountExist
function AcountExist() {
  return Process("scripts.return.Success", true);
}
