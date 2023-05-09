// scripts.demo.run;
function run() {
  user();
  role();
  dept();
  menu();
}

// scripts.demo.user;
function user() {
  const data = [
    {
      name: "Robert",
      nickname: "Victor",
      mobile: "13439882351",
      password: "A+123abc",
    },
    {
      name: "Julian",
      nickname: "Victor",
      mobile: "18696486865",
      password: "A+123abc",
    },
    {
      name: "vben",
      nickname: "Vben",
      mobile: "18696432134",
      password: "A+123456c",
    },
  ];

  const map = Process("xiang.helper.ArraySplit", data);

  const rc = Process("models.admin.user.Insert", map.columns, map.values);
}

// scripts.demo.role
function role() {
  const result = [];
  for (let index = 0; index < 4; index++) {
    result.push({
      id: index + 1,
      orderNo: `${index + 1}`,
      roleName: ["超级管理员", "管理员", "文章管理员", "普通用户"][index],
      roleValue: ["超级管理员", "管理员", "文章管理员", "普通用户"][index],
      remark: "测试",
      menu: [["0", "1", "2"], ["0", "1"], ["0", "2"], ["2"]][index],
      status: ["0", "1"][1],
    });
  }

  const map = Process("xiang.helper.ArraySplit", result);

  const rc = Process("models.admin.role.Insert", map.columns, map.values);
}

// scripts.demo.dept
function dept() {
  const dept = [
    {
      id: "0",
      deptName: "华东分部",
      orderNo: 1,
      createTime: "2010-10-22 23:43:16",
      remark: "单地得造把力土任派体法十",
      status: "1",
      children: [
        {
          id: "0-0",
          deptName: "研发部",
          orderNo: 1,
          createTime: "2001-02-14 23:37:05",
          remark: "代存使平府些这民油则证式青对热治民门",
          status: "1",
          parentDept: "0",
        },
        {
          id: "0-1",
          deptName: "市场部",
          orderNo: 2,
          createTime: "2007-11-24 08:21:27",
          remark: "造话而第干风离本越计",
          status: "1",
          parentDept: "0",
        },
        {
          id: "0-2",
          deptName: "商务部",
          orderNo: 3,
          createTime: "1996-02-12 00:09:38",
          remark: "样老什还三厂同内必听总等西",
          status: "1",
          parentDept: "0",
        },
        {
          id: "0-3",
          deptName: "财务部",
          orderNo: 4,
          createTime: "2014-12-24 20:54:43",
          remark: "眼她观将府效研世会广院两京",
          status: "0",
          parentDept: "0",
        },
      ],
    },
    {
      id: "1",
      deptName: "华南分部",
      orderNo: 2,
      createTime: "1983-03-24 13:33:06",
      remark: "世队每报才层非中近与无习压别史革制活住许",
      status: "1",
      children: [
        {
          id: "1-0",
          deptName: "研发部",
          orderNo: 1,
          createTime: "1991-09-29 14:49:32",
          remark: "阶相提般数结习现两个主化部",
          status: "0",
          parentDept: "1",
        },
        {
          id: "1-1",
          deptName: "市场部",
          orderNo: 2,
          createTime: "2002-03-04 09:54:06",
          remark: "究那然周外才联个容亲面被",
          status: "1",
          parentDept: "1",
        },
        {
          id: "1-2",
          deptName: "商务部",
          orderNo: 3,
          createTime: "2005-04-16 04:28:31",
          remark: "大命很约问能领安月矿青门观",
          status: "0",
          parentDept: "1",
        },
        {
          id: "1-3",
          deptName: "财务部",
          orderNo: 4,
          createTime: "2013-12-17 10:06:05",
          remark: "民特去积利划动新体始式群大中工",
          status: "0",
          parentDept: "1",
        },
      ],
    },
    {
      id: "2",
      deptName: "西北分部",
      orderNo: 3,
      createTime: "2010-10-08 12:24:56",
      remark: "清全己然长参马区机易见新空区头十县清",
      status: "0",
      children: [
        {
          id: "2-0",
          deptName: "研发部",
          orderNo: 1,
          createTime: "2004-03-03 13:20:07",
          remark: "时类导万上至议律确子",
          status: "0",
          parentDept: "2",
        },
        {
          id: "2-1",
          deptName: "市场部",
          orderNo: 2,
          createTime: "1975-08-20 15:28:09",
          remark: "开没适情准家内队各马白式习中是面完",
          status: "0",
          parentDept: "2",
        },
        {
          id: "2-2",
          deptName: "商务部",
          orderNo: 3,
          createTime: "1989-05-24 15:33:50",
          remark: "但采非育三好布起究养属重",
          status: "1",
          parentDept: "2",
        },
        {
          id: "2-3",
          deptName: "财务部",
          orderNo: 4,
          createTime: "1991-01-30 23:37:04",
          remark: "技应列西内体队党识究业交",
          status: "1",
          parentDept: "2",
        },
      ],
    },
  ];

  dept.forEach((line) => {
    delete line.id, line.children.forEach((line) => delete line.id);
  });
  dept.forEach((line) => {
    const id = Process("models.admin.dept.create", line);
    const ids = Process("models.admin.dept.EachSave", line.children, {
      parentDept: id,
    });
  });
}

// scripts.demo.menu
function menu() {
  for (let index = 0; index < 3; index++) {
    const menu = {
      // id: `${index}`,
      icon: ["ion:layers-outline", "ion:git-compare-outline", "ion:tv-outline"][
        index
      ],
      component: "LAYOUT",
      type: "0",
      menuName: ["Dashboard", "权限管理", "功能"][index],
      permission: "",
      orderNo: index + 1,
      status: "0",
    };
    const menuid = Process("models.admin.menu.create", menu);
    for (let j = 0; j < 4; j++) {
      const submenu = {
        parentMenu: menuid,
        // id: `${index}-${j}`,
        type: "1",
        menuName: ["菜单1", "菜单2", "菜单3", "菜单4"][j],
        icon: "ion:document",
        permission: ["menu1:view", "menu2:add", "menu3:update", "menu4:del"][
          index
        ],
        routePath: [
          "/dashboard/welcome/index",
          "/dashboard/analysis/index",
          "/dashboard/workbench/index",
          "/dashboard/test/index",
        ][j],
        orderNo: j + 1,
        component: "LAYOUT",
        status: "0",
      };
      const submenuid = Process("models.admin.menu.create", submenu);

      for (let k = 0; k < 4; k++) {
        const subsubmenu = {
          // id: `${index}-${j}-${k}`,
          type: "2",
          menuName: "按钮" + (j + 1) + "-" + (k + 1),
          icon: "",
          permission:
            ["menu1:view", "menu2:add", "menu3:update", "menu4:del"][index] +
            ":btn" +
            (k + 1),
          orderNo: j + 1,
          status: "0",
          parentMenu: submenuid,
        };
        Process("models.admin.menu.create", subsubmenu);
      }
    }
  }
}
