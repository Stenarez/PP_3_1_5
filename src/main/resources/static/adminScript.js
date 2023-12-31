const urlUsers = '/api/admin';
const users = '/api/user';

const deleteUserModal = new bootstrap.Modal(document.getElementById('deleteModal'))
const editUserModal = new bootstrap.Modal(document.getElementById(`editModal`))


fetch(users)
    .then(res => res.json())
    .then((user) => {
        let allRole = '';
        user.roles.forEach(role => allRole += role.name.replace('ROLE_', '') + ' ');
        document.getElementById('adminInfo').innerHTML = `
        <span> ${user.email}</span>
        <span> with roles: </span>
        <span> ${allRole}</span>`
    })
let result = ''
allUser();


// Заполнение таблицы пользователей
function allUser() {


    fetch(urlUsers)
        .then(response => response.json())
        .then(users => {

                for (let i of users) {
                    let roles = ''
                    i.roles.forEach(role =>
                        roles += role.name.replace('ROLE_', '') + ' ')
                    result += `<tr>

                    <td>${i.id}</td>
                    <td>${i.firstname}</td>
                    <td>${i.lastname}</td>
                    <td>${i.age}</td>
                    <td>${i.email}</td>
                    <td>${roles}</td>
                   
                         <td>
                         <button type="button" class="btn btn-info" data-action="edit" data-toggle="modal"
                             data-target="#editModal" id="editButton" data-uid=${i.id} onclick="editModal(${i.id})" >Edit
                         </button>
                         </td>
                         <td>
                         <button type="button" class="btn btn-danger" data-action="delete" data-toggle="modal"
                            data-target="#deleteModal" id="deleteButton" data-uid=${i.id} onclick="deleteModal(${i.id})" >Delete
                         </button>
                         </td> 
                    </tr>`
                }

                document.getElementById("users-table").innerHTML = result;
            }
        )
}

// //Добавление пользователя
newUser = document.getElementById('add');
newUser.addEventListener('submit', (e) => {
    e.preventDefault()
    let role = document.getElementById('addRoles')
    let rolesAddUser = []

    for (let i = 0; i < role.options.length; i++) {
        if (role.options[i].selected) {
            rolesAddUser.push({
                id: role.options[i].value, name: role.options[i].text
            })
        }
    }
    console.log(rolesAddUser)
    fetch(urlUsers, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstname: document.getElementById('firstName').value,
            lastname: document.getElementById('lastName').value,
            age: document.getElementById('age').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            roles: rolesAddUser
        })
    })
        .then(response => response.json())
        .then(() => {

            newUser.reset();
            result = ''
            allUser()

            $('[href="#nav-home"]').tab('show');

        })

})


// // Изменение пользователя
const idEdit = document.getElementById('idEdit')
const firstNameEdit = document.getElementById('firstNameEdit')
const lastNameEdit = document.getElementById('lastNameEdit')
const ageEdit = document.getElementById('ageEdit')
const emailEdit = document.getElementById('emailEdit')
const passwordEdit = document.getElementById('passwordEdit')


idUser = document.getElementById('idEdit')
let editForm = document.forms["editForm"];

function editModal(id) {


    fetch(`/api/admin/` + id)
        .then(response => {
            response.json()
                .then(u => {
                    editForm.elements.id.value = u.id;
                    editForm.firstName.value = u.firstname;
                    editForm.lastName.value = u.lastname;
                    editForm.age.value = u.age;
                    editForm.email.value = u.email;
                    editForm.password.value = u.password;
                    editForm.roles.value = u.roles;


                    editUserModal.show()

                })

        })
}

document.getElementById("editModal").addEventListener('submit', (e) => {
    e.preventDefault()
    let rolesUserEdit = []

    let role = document.getElementById('rolesEdit')

    for (let i = 0; i < role.options.length; i++) {
        if (role.options[i].selected) {
            rolesUserEdit.push({
                id: role.options[i].value,
                name: 'ROLE_' + role.options[i].text
            })
        }
    }
    console.log(rolesUserEdit)
    fetch(urlUsers + '/' + idEdit.value, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: idEdit.value,
            firstname: firstNameEdit.value,
            lastname: lastNameEdit.value,
            age: ageEdit.value,
            email: emailEdit.value,
            password: passwordEdit.value,
            roles: rolesUserEdit

        })
    })

        .then(() => {


            result = ''
            allUser()

            $('#editModal').modal('hide')

        })

})


// Удаление

function deleteModal(id) {
    let deleteForm = document.forms["deleteForm"];

    fetch(`/api/admin/` + id)
        .then(response => {
            response.json()
                .then(u => {
                    deleteForm.elements.id.value = u.id;
                    deleteForm.firstname.value = u.firstname;
                    deleteForm.lastname.value = u.lastname;
                    deleteForm.age.value = u.age;
                    deleteForm.email.value = u.email;
                    deleteForm.password.value = u.password;
                    deleteForm.roles.value = u.roles;

                    deleteUserModal.show();


                })
        });
}

document.getElementById('deleteForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const uid = document.getElementById('idDelete').value
    fetch(`/api/admin/${uid}`, {
        method: 'DELETE'
    })
        .then(() => {
            $('#deleteModal').modal('hide')
            result = ''
            fetch(urlUsers)
                .then(res => res.json())
                .then(() => allUser())
        })
});