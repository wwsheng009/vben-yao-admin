/**
 * 增加任务请求
 */
function task_add() {
    for (i = 1; i < 10; i++) {
        console.log(`Web接口任务请求:${i}`)
        Process("tasks.test.Add", `1：${i}`, `2：${i * 2}`);
    }
}