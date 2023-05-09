//scripts.file.upload
function upload(file) {
  // 这里不能直接使用处理器fs.system.Upload，因为经过js桥接后，数据结构已经变化。
  // https://github.com/wwsheng009/gou/commit/7fafef2100057343024e6fbe7728fd7d58cb28c9

  // 自定义上传逻辑
  // "Error: parameters error: map[mimeType:map[Content-Disposition:[form-data; name=\"file\"; filename=\"blob\"] Content-Type:[image/png]] name:blob size:108505 tempFile:C:\\Users\\WANGWE~1\\AppData\\Local\\Temp\\upload2241272960\\file-2567307823]"
  const f = Process("fs.system.ReadFile", file.tempFile);

  const ts = Process("utils.now.Timestampms");
  const fn = `/data/${ts}`;

  Process("fs.system.WriteFile", fn, f, "0644");

  return `/yao-api/download?name=${fn}`;
}
