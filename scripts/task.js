var id = 1;

/**
 * 生成任务编号，可以不设置，系统自动生成
 * @returns {number} 任务ID
 */
function NextID() {
    id = id + 1;
    console.log(`下一个任务编号NextID: ${id}`);
    return id;
}
/**
 * 任务处理回调过程
 * @param {number} id 任务ID
 * @param {*} message 参数，可以有任意的参数
 */
function TaskProcess(id, message, message2) {
    console.log(`接收到新的处理任务:#${id},参数1:${message},参数2:${message2}`);

    sleep(1000)
    //设置任务处理进度
    Process("tasks.test.Progress", id, id, 100, `当前任务${id}`)

    return `任务处理结果:#${id},成功`
}


function sleep(time) {
    var timeStamp = new Date().getTime();
    var endTime = timeStamp + time;
    while (true) {
        if (new Date().getTime() > endTime) {
            return;
        }
    }
}
/** 
 * OnAdd 添加任务成功后触发的事件
 * @param {number} id 任务ID
 */
function OnAdd(id) {
    console.log(`添加成功事件：OnAdd: #${id}`);
}

/**
 * OnProgress 汇报任何处理进度
 * @param {number} id 任务ID
 * @param {*} current
 * @param {*} total
 * @param {*} message
 */
function OnProgress(id, current, total, message) {
    console.log(`当前进度OnProgress: #${id} ${message} ${current}/${total} `);
}
/**
 * 任务成功进度
 * @param {number} id 任务ID
 * @param {*} res 处理结果
 */
function OnSuccess(id, res) {
    console.log(`处理完成OnSuccess: #${id} ${JSON.stringify(res)}`);
}
/**
 * 异常事件
 * @param {number} id 任务ID
 * @param {*} err 异常
 */
function OnError(id, err) {
    console.log(`任务异常OnError: #${id} ${err}`);
}