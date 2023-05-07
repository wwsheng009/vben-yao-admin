//scripts.file.upload
function upload(file) {
  // 自定义上传逻辑
  // https://yaoapps.com/doc/%E5%9F%BA%E7%A1%80/%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0#%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%8A%E4%BC%A0%E9%80%BB%E8%BE%91
  // "Error: parameters error: map[mimeType:map[Content-Disposition:[form-data; name=\"file\"; filename=\"blob\"] Content-Type:[image/png]] name:blob size:108505 tempFile:C:\\Users\\WANGWE~1\\AppData\\Local\\Temp\\upload2241272960\\file-2567307823]"
  const f = Process("fs.system.ReadFile", file.tempFile);

  const ts = Process("utils.now.Timestampms");
  const fn = `/data/${ts}`;

  Process("fs.system.WriteFile", fn, f, "0644");

  return `/yao-api/download?name=${fn}`;
}
