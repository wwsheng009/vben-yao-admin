import { faker } from '@faker-js/faker/locale/zh_CN';
import fs from 'fs'

function generateDept() {
    let depts = []

    // const status = ["enabled", "disabled"]
    // const gender = ["男", "女"]


    for (let id = 1; id <= 10; id++) {
        const order = faker.datatype.number({
            'min': 1,
            'max': 10 - 1
        });
        let randomNumber = faker.datatype.number({
            'min': 1,
            'max': 10 - 1
        });
        if (id == 1) {
            randomNumber = null
        } else {
            randomNumber = id - 1
        }
        depts.push({
            "name": faker.commerce.department(),
            "parent_id": randomNumber,
            "order": order
        })
    }
    return depts
}

let dataObj = generateDept();

fs.writeFileSync('dept.json', JSON.stringify(dataObj, null, '\t'));
