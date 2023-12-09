const urlUsers = '/api/admin';
const urlRoles = '/admin/users/roles/';
const admin = '/api/admin';
const users = '/api/user';

const allUsers = fetch(urlUsers).then(response => response.json())
// const allRoles = fetch(urlRoles).then(response => response.json())

const deleteUserModal = new bootstrap.Modal(document.getElementById('deleteModal'))
const editUserModal = new bootstrap.Modal(document.getElementById(`editModal`))

// const on = (element, event, selector, handler) => {
//     element.addEventListener(event, e => {
//         if (e.target.closest(selector)) {
//             handler(e.target)
//         }
//     })
// }
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


    allUsers.then(users => {

            for (let i of users) {
                let roles = ''
                i.roles.forEach(role =>
                    roles += role.name.replace('ROLE_', '') + ' ')
                result += `<tr id="userRow_${i.id}">

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
    // let rolesAddUserValue = ''
    for (let i = 0; i < role.options.length; i++) {
        if (role.options[i].selected) {
            rolesAddUser.push({id: role.options[i].value, name: role.options[i].text
            })
            // rolesAddUserValue += role.options[i].innerHTML + ' '
        }
    }
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
        .then((newUser) => {
            addUserToTable(newUser);
            newUser.reset();


            $('[href="#nav-home"]').tab('show');

        })

})
function addUserToTable(user) {
    let roles = '';
    user.roles.forEach(role => {
        roles += role.name.replace('ROLE_', '') + ' ';
    });

    let newRow = `<tr>
                    <td>${user.id}</td>
                    <td>${user.firstname}</td>
                    <td>${user.lastname}</td>
                    <td>${user.age}</td>
                    <td>${user.email}</td>
                    <td>${roles}</td>
                    <td>
                        <button type="button" class="btn btn-info" data-action="edit" data-toggle="modal"
                            data-target="#editModal" id="editButton" data-uid=${user.id} onclick="editModal(${user.id})">Edit
                        </button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-danger" data-action="delete" data-toggle="modal"
                            data-target="#deleteModal" id="deleteButton" data-uid=${user.id} onclick="deleteModal(${user.id})">Delete
                        </button>
                    </td> 
                </tr>`;

    document.getElementById("users-table").insertAdjacentHTML('beforeend', newRow);
    result = ''
    $('[href="#nav-home"]').tab('show');
}
//
// // Изменение пользователя
const idEdit = document.getElementById('idEdit')
const firstNameEdit = document.getElementById('firstNameEdit')
const lastNameEdit = document.getElementById('lastNameEdit')
const ageEdit = document.getElementById('ageEdit')
const emailEdit = document.getElementById('emailEdit')
const passwordEdit = document.getElementById('passwordEdit')
const rolesEdit = document.getElementById('rolesEdit')

let rowEdit = null
idUser = document.getElementById('idEdit')
function editModal(id) {
    let editForm = document.forms["editForm"];

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


document.getElementById('editModal').addEventListener('submit', (e) => {
    e.preventDefault()
    let role = document.getElementById('rolesEdit')
    let rolesUserEdit = []
    let rolesUserEditValue = ''
    for (let i = 0; i < role.options.length; i++) {
        if (role.options[i].selected) {
            rolesUserEdit.push({ name: role.options[i].text})
            rolesUserEditValue += role.options[i].innerHTML + ' '
        }
    }

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
        .then(response => response.json())
        .then((updatedUser) => {
            updateTableRow(updatedUser);
            $('#editModal').modal('hide')

        })

})
function updateTableRow(updatedUser) {
    let roles = '';
    updatedUser.roles.forEach(role => {
        roles += role.name.replace('ROLE_', '') + ' ';
    });

    let updatedRow = `<td>${updatedUser.id}</td>
                      <td>${updatedUser.firstname}</td>
                      <td>${updatedUser.lastname}</td>
                      <td>${updatedUser.age}</td>
                      <td>${updatedUser.email}</td>
                      <td>${roles}</td>
                      <td>
                          <button type="button" class="btn btn-info" data-action="edit" data-toggle="modal"
                              data-target="#editModal" id="editButton" data-uid=${updatedUser.id} onclick="editModal(${updatedUser.id})">Edit
                          </button>
                      </td>
                      <td>
                          <button type="button" class="btn btn-danger" data-action="delete" data-toggle="modal"
                              data-target="#deleteModal" id="deleteButton" data-uid=${updatedUser.id} onclick="deleteModal(${updatedUser.id})">Delete
                          </button>
                      </td>`;

    // Найти и обновить строку в таблице
    let table = document.getElementById("users-table");
    let rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName("td");
        if (cells.length > 0 && cells[0].innerHTML == updatedUser.id) {
            rows[i].innerHTML = updatedRow;
            break;
        }
    }
}

// Удаление
const idDelete = document.getElementById('idDelete')
const firstNameDelete = document.getElementById('firstNameDelete')
const lastNameDelete = document.getElementById('lastNameDelete')
const ageDelete = document.getElementById('ageDelete')
const emailDelete = document.getElementById('emailDelete')
const passwordDelete = document.getElementById('passwordDelete')
const rolesDelete = document.getElementById('rolesDelete')

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

                    // Скрываем модальное окно после успешного заполнения данных
                    $('#deleteModal').modal('hide');
                    // Показываем модальное окно после закрытия
                    $('#deleteModal').on('hidden.bs.modal', function () {
                        deleteUserModal.show();
                    });

                })
        });
}

document.getElementById('deleteForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const uid = document.getElementById('idDelete').value
    fetch(`/api/admin/${uid}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(() => {
            // Очищаем форму после закрытия модального окна
            deleteForm.reset();
            // Обновляем данные в таблице
            allUser();
        });
});
// function deleteModal(id) {
//     let deleteForm = document.forms["deleteForm"];
//
//     fetch(`/api/admin/` + id)
//         .then(response => {
//             response.json()
//                 .then(u => {
//                     deleteForm.elements.id.value = u.id;
//                     deleteForm.firstname.value = u.firstname;
//                     deleteForm.lastname.value = u.lastname;
//                     deleteForm.age.value = u.age;
//                     deleteForm.email.value = u.email;
//                     deleteForm.password.value = u.password;
//                     deleteForm.roles.value = u.roles;
//
//
//                    deleteUserModal.show()
//
//                 })
//
//         })
// }
//
// document.getElementById('deleteForm').addEventListener('submit', (e) => {
//     e.preventDefault()
//     const uid = document.getElementById('idDelete').value
//     fetch(`/api/admin/${uid}`, {
//         method: 'DELETE'
//     })
//         .then(res => res.json())
//         .then(() => {
//
//             $('#deleteModal').modal('hide')
//             result = ''
//             // allUser()
//             // fetch(urlUsers)
//             //     .then(res => res.json())
//             //     .then(() => allUser())
//             deleteForm.reset();
//             // Обновляем данные в таблице
//             allUser();
//         })
// })

// document.getElementById('deleteModal').addEventListener('submit', (e) => {
//     e.preventDefault()
//     let role = document.getElementById('rolesDelete')
//     let rolesUserDelete = []
//     let rolesUserDeleteValue = ''
//     for (let i = 0; i < role.options.length; i++) {
//         if (role.options[i].selected) {
//             rolesUserDelete.push({id: role.options[i].value, name: role.options[i].text})
//             rolesUserDeleteValue += role.options[i].innerHTML + ' '
//         }
//     }
//
//
//     fetch(urlUsers + '/' + idDelete.value, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             id: idDelete.value,
//             firstname: firstNameDelete.value,
//             lastname: lastNameDelete.value,
//             age: ageDelete.value,
//             email: emailDelete.value,
//             password: passwordDelete.value,
//             roles: rolesUserDelete
//         })
//     })
//         // .then(res => console.log(res))
//         .then(() => {
//             result = ''
//             $('#deleteModal').modal('hide')
//
//
//             // document.getElementById("users-table").reset()
//             // allUser()
//             // result = ''
//             fetch(urlUsers)
//                 .then(res => res.json())
//                 .then(() => allUser())
//             // result = ''
//         })
//      // result = ''
//
// })
// document.getElementById('deleteModal').addEventListener('submit', (e) => {
//     e.preventDefault();
//     let role = document.getElementById('rolesDelete');
//     let rolesUserDelete = [];
//     let rolesUserDeleteValue = '';
//     for (let i = 0; i < role.options.length; i++) {
//         if (role.options[i].selected) {
//             rolesUserDelete.push({id: role.options[i].value, name: role.options[i].text});
//             rolesUserDeleteValue += role.options[i].innerHTML + ' ';
//         }
//     }
//
//     fetch(urlUsers + '/' + idDelete.value, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             id: idDelete.value,
//             firstname: firstNameDelete.value,
//             lastname: lastNameDelete.value,
//             age: ageDelete.value,
//             email: emailDelete.value,
//             password: passwordDelete.value,
//             roles: rolesUserDelete
//         })
//     })
//         .then(() => {
//             // Удаление строки из таблицы на фронтенде
//             let table = document.getElementById("users-table");
//             let rowToDelete = document.getElementById("userRow_" + idDelete.value);
//             table.deleteRow(rowToDelete.rowIndex);
//
//             // Закрытие модального окна
//             // $('#deleteModal').modal('hide');
//             // deleteUserModal.hide();
//         });
//     // deleteUserModal.hide();
//     $('#deleteModal').modal('hide');
//     result = ''
// });


// document.getElementById('deleteModal').addEventListener('submit', (e) => {
//     e.preventDefault();
//     let role = document.getElementById('rolesDelete');
//     let rolesUserDelete = [];
//     let rolesUserDeleteValue = '';
//     for (let i = 0; i < role.options.length; i++) {
//         if (role.options[i].selected) {
//             rolesUserDelete.push({id: role.options[i].value, name: role.options[i].text});
//             rolesUserDeleteValue += role.options[i].innerHTML + ' ';
//         }
//     }
//
//     fetch(urlUsers + '/' + idDelete.value, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             id: idDelete.value,
//             firstname: firstNameDelete.value,
//             lastname: lastNameDelete.value,
//             age: ageDelete.value,
//             email: emailDelete.value,
//             password: passwordDelete.value,
//             roles: rolesUserDelete
//         })
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(() => {
//             // Удаление строки из таблицы на фронтенде
//             let table = document.getElementById("users-table");
//             let rowToDelete = document.getElementById("userRow_" + idDelete.value);
//             table.deleteRow(rowToDelete.rowIndex);
//
//             // Закрытие модального окна
//             $('#deleteModal').modal('hide');
//         })
//         .catch(error => {
//             console.error('There was a problem with the fetch operation:', error);
//         });
// });