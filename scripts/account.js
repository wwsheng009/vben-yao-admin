//scripts.account.AccountInfo
function AccountInfo() {
  //   const userInfo = {
  //     name: "Vben",
  //     userid: "00000001",
  //     email: "test@gmail.com",
  //     signature: "海纳百川，有容乃大",
  //     introduction: "微笑着，努力着，欣赏着",
  //     title: "交互专家",
  //     group: "某某某事业群－某某平台部－某某技术部－UED",
  //     tags: [
  //       {
  //         key: "0",
  //         label: "很有想法的",
  //       },
  //       {
  //         key: "1",
  //         label: "专注设计",
  //       },
  //       {
  //         key: "2",
  //         label: "辣~",
  //       },
  //       {
  //         key: "3",
  //         label: "大长腿",
  //       },
  //       {
  //         key: "4",
  //         label: "川妹子",
  //       },
  //       {
  //         key: "5",
  //         label: "海纳百川",
  //       },
  //     ],
  //     notifyCount: 12,
  //     unreadCount: 11,
  //     country: "China",
  //     address: "Xiamen City 77",
  //     phone: "0592-268888888",
  //   };

  const user = Process("session.Get", "user");
  console.log("user:", user);
  const { id } = user;
  const q = new Query();
  const data = q.First({
    select: [
      "id as userid",
      "name",
      "email",
      "signature",
      "title",
      "group",
      "introduction",
      "country",
      "address",
      "mobile",
      "group",
      "tags",
    ],
    wheres: [
      {
        ":id": "id",
        "=": id,
      },
    ],
    from: "$admin.user",
  });

  //   data = Process("models.admin.user.Find", id);

  return Process("scripts.return.Success", data);
}
