import $ from "jquery";

export const renderUserTable = (users) => {
    let userTable = $('#user-table');
    users.forEach(user => {
        userTable.append(`<tr id="user-${user.id}">
        <td>${user.id}</td>
        <td id = "user-name-${user.id}">${user.name}</td>
        <td id = "user-email-${user.id}">${user.emailAddress}</td>
        <td><button value="${user.id}" class="btn btn-primary update-user-action">Update</button>
        <button value="${user.id}" class="btn btn-danger delete-user-action">Delete</button></td>
      </tr>`);
    });
};

export const deleteUserRow = (id) => {
    $('#user-' + id).remove();
};

export const updateUserRow = (id, user) => {
    $('#user-name-' + id).text(user.name);
    $('#user-email-' + id).text(user.emailAddress);
};
