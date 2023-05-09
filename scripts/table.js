function getDemoList(page = 1, pageSize = 10) {
  console.log(page, pageSize);

  const pageData = [];
  return Process("scripts.return.Success", {
    items: pageData,
    total: 1,
  });
}

function getDemoList1({ query }) {
  const { page = 1, pageSize = 20 } = query;

  const pageData = [];
  return Process("scripts.return.Success", {
    items: pageData,
    total: 0,
  });
}
