const urlUser = '/api/user', currentUser = fetch(urlUser).then(response => response.json());

// Заполнение шапки
// currentUser.then(user => {
//         let roles = ''
//         user.roles.forEach(role => {
//             roles += ' '
//             roles += role.name.replace("ROLE_", "")
//         })
//         document.getElementById("navbar-email").innerHTML = user.email
//         document.getElementById("navbar-roles").innerHTML = roles
//     }
// )
//
// // Заполнение информации о пользователе
// currentUser.then(user => {
//         let roles = ''
//         user.roles.forEach(role => {
//             roles += ' '
//             roles += role.name.replace("ROLE_", "")
//         })
//
//         let result = ''
//         result += `<tr>
//                     <td>${user.id}</td>
//                     <td>${user.firstname}</td>
//                     <td>${user.lastname}</td>
//                     <td>${user.age}</td>
//                     <td>${user.email}</td>
//                     <td>${roles}</td>
//                    </tr>`
//         document.getElementById("user-info-table").innerHTML = result
//     }
// )
const users = '/api/user';
let result = '';

fetch(users)
    .then(response => response.json())
    .then(data => {
        let allRole = '';
        data.roles.forEach(role => allRole += role.name.replace('ROLE_', '') + ' ');
        result += `<tr>
                        <td>${data.id}</td>
                        <td>${data.firstname}</td>
                        <td>${data.lastname}</td>
                        <td>${data.age}</td>
                        <td>${data.email}</td>
                        <td>${allRole}</td>
                   </tr>`
        document.getElementById('user-info-table').innerHTML = result;
        document.getElementById('infoUser').innerHTML = `
        <span> ${data.email}</span>
        <span> with roles: </span>
        <span> ${allRole}</span>`
    })