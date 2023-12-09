const urlUser = '/api/user', currentUser = fetch(urlUser).then(response => response.json());

// Заполнение шапки

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