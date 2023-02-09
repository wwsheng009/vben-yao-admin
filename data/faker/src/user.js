import { faker } from '@faker-js/faker/locale/zh_CN';
import fs from 'fs'

function generateUsers() {

    let users = []

    const status = ["enabled", "disabled"]
    const gender = ["男", "女"]
    for (let id = 1; id <= 200; id++) {

        const randomNumber = faker.datatype.number({
            'min': 0,
            'max': status.length - 1
        });


        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();
        let name = lastName + firstName;
        let email = faker.internet.email(firstName, lastName);
        faker.setLocale("en")
        let en_name = faker.name.fullName();
        faker.setLocale("zh_CN")
        users.push({
            // "id": id,
            "name": name,
            "email": email,
            "en_name": en_name,
            "job_number": faker.random.numeric(5),
            "union_id": Math.random().toString(36).slice(2),
            "open_id": Math.random().toString(36).slice(2),
            "org_email": email,
            "mobile": faker.phone.number('180########').toString(),
            "telephone": faker.phone.number('########').toString(),
            "avatar": faker.internet.avatar(),
            "position": faker.name.jobTitle(),
            "work_place": faker.name.jobArea(),
            "password": faker.internet.password(),
            "password2nd": faker.internet.password(),
            "nickname": faker.name.middleName(),
            "extra": "",
            "gender": gender[randomNumber],
            // "department_id": faker.commerce.department(),
            "status": status[randomNumber],
            // "deleted_at": faker.date.soon(),
            "created_at": faker.date.soon(),
            // "updated_at": faker.date.soon()
        });
    }

    return users
}

let dataObj = generateUsers();

fs.writeFileSync('data.json', JSON.stringify(dataObj, null, '\t'));


