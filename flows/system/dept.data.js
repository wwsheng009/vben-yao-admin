


function main() {
    const deptList = (() => {
        const result = [];
        for (let index = 0; index < 3; index++) {
            result.push({
                id: `${index}`,
                deptName: ['华东分部', '华南分部', '西北分部'][index],
                orderNo: index + 1,
                createTime: '@datetime',
                remark: '@cword(10,20)',
                'status|1': ['0', '0', '1'],
                children: (() => {
                    const children = [];
                    for (let j = 0; j < 4; j++) {
                        children.push({
                            id: `${index}-${j}`,
                            deptName: ['研发部', '市场部', '商务部', '财务部'][j],
                            orderNo: j + 1,
                            createTime: '@datetime',
                            remark: '@cword(10,20)',
                            'status|1': ['0', '1'],
                            parentDept: `${index}`,
                            children: undefined,
                        });
                    }
                    return children;
                })(),
            });
        }
        return result;
    })();
    return deptList
}