function User() {
    let fs = new FS("system");
    let data = fs.ReadFile("/faker/data.json"); // /data/app/data/f1.txt
    // return JSON.parse(data);

    let obj = JSON.parse(data)
    let arr = Process("xiang.helper.ArraySplit", obj)
    console.log("arr.columns", arr.columns)
    console.log("values:", arr.values)
    let rc = Process("models.contact.user.Insert", arr.columns, arr.values)
    console.log(rc)
}

function Dept() {
    let fs = new FS("system");
    let data = fs.ReadFile("/faker/dept.json"); // /data/app/data/f1.txt
    // return JSON.parse(data);

    let obj = JSON.parse(data)
    let arr = Process("xiang.helper.ArraySplit", obj)
    console.log("arr.columns", arr.columns)
    console.log("values:", arr.values)
    let rc = Process("models.contact.department.Insert", arr.columns, arr.values)
    console.log(rc)
}