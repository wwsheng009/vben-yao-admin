const demoList = (keyword, count = 20) => {
  const result = {
    list: [],
  };
  for (let index = 0; index < count; index++) {
    result.list.push({
      name: `${keyword ?? ""}选项${index}`,
      id: `${index}`,
    });
  }
  return result;
};

function getDemoOptions(keyword, count) {
  return Process("scripts.return.Success", demoList(keyword, count));
}
