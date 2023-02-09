


function main() {
    const accountList = (() => {
        const result = [];
        for (let index = 0; index < 20; index++) {
            result.push({
                id: `${index}`,
                account: '@first',
                email: '@email',
                nickname: '@cname()',
                role: '@first',
                createTime: '@datetime',
                remark: '@cword(10,20)',
                'status|1': ['0', '1'],
            });
        }
        return result;
    })();
    return accountList
}