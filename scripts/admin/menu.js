
function Save(payload) {
  //先保存主表，获取id后再保存从表
  
  let res = null
  try {
    res = Process('models.admin.menu.Save', payload);
    if (res.code && res.code > 300) {
      throw new Exception(res.message, res.code);
    }
    SaveRelations(res, payload);
  } catch (error) {
    console.log("Mode admin.menu Save Failed,Payload:",payload)
    
    if(error.message && error.code){
      console.log("error:",error.code,error.message)
      throw new Exception(error.message,error.code)
    }else{
      console.log("system error:",error)
      throw error
    }
  }

return res
}
//保存关联表数据
function SaveRelations(id, payload) {
  Save_children(id,payload);
  return id;
}

//删除关联表数据
function BeforeDelete(id){
  Delete_children(id);
}


//保存admin.menu
function Save_children(id,payload){
  const items = payload.children || {};
  const deletes = items.delete || [];
  const data = items.data || items || [];
  if (data.length > 0 || deletes.length > 0) {
    // 忽略实际数据 ( 通过 record 计算获取)
    for (const i in data) {
      if (typeof data[i].id === 'string' && data[i].id.startsWith('_')) {
        //新增项目，在前端会生成唯一字符串,
        //由于后台使用的自增长ID，不需要生成的唯一字符串，由数据库生成索引
        delete data[i].id;
      }
    }

    // 保存物品清单
    var res = Process('models.admin.menu.EachSaveAfterDelete', deletes, data, {
      parent: id,
    });
    if (res.code && res.code > 300) {
      console.log('admin.menu:AfterSave Error:', res);
      //console.log(items)
      throw new Exception(res.message,res.code)
    }else{
      return id;
    }
  }
}



//删除admin.menu == parent
function Delete_children(id){
  let rows = Process('models.admin.menu.DeleteWhere', {
    wheres: [{ column: 'parent', value: id }],
  });

  //remembe to return the id in array format
  return [id];
}



//多对一表数据查找
function AfterFind(payload){
  const t = new Query();
 payload["children"]= t.Get(
      {"select":["name","icon","blocks","path","rank","status"],"from":"admin_menu","wheres":[{"field":"parent","op":"=","value":payload.id}]},
  );
 return payload;
}
  
