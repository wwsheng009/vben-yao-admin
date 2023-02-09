


function main() {
    const roleList = (() => {
        const result = [];
        for (let index = 0; index < 4; index++) {
            result.push({
                id: index + 1,
                orderNo: `${index + 1}`,
                roleName: ['超级管理员', '管理员', '文章管理员', '普通用户'][index],
                roleValue: '@first',
                createTime: '@datetime',
                remark: '@cword(10,20)',
                menu: [['0', '1', '2'], ['0', '1'], ['0', '2'], ['2']][index],
                'status|1': ['0', '1'],
            });
        }
        return result;
    })();
    return roleList
}