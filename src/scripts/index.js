import $ from "jquery";
import '../styles/index.scss';
import { adjustUi, clearAddUserForm } from './view/uiUtil';
import { getAllUsers, saveUser, deteteUser, updateUser } from './models/userModel';
import { renderUserTable, deleteUserRow, updateUserRow } from './view/userList';
import { showNotification, clearNotificationMessage } from './view/notification';

$(document).ready(() => {
    adjustUi('list');
    displayAllUserLists();
    addUsers();
});

const displayAllUserLists = () => {
    const getAllUsersHandlerFunction = (users, errorMessage) => {
        if (users) {
            if (users.length == 0) {
                showNotification('Uff! There are no users. Please add a new user', 'info');
            } else {
                renderUserTable(users);
            }
        }
        if (errorMessage) {
            showNotification('Error while loading user!', 'danger');
        }
    };
    getAllUsers(getAllUsersHandlerFunction);
};

const addUsers = () => {
    const addButton = $('#add-new-user');
    addButton.click(() => {
        clearNotificationMessage();
        adjustUi('add');
    });
    handleAddUser();
};

const handleAddUser = () => {
    const saveUserResultHandler = (user, errorMessage) => {
        if (user) {
            showNotification('User added successfully!', 'success');
            renderUserTable([user]);
            adjustUi('list');
            clearAddUserForm();
        }

        if (errorMessage) {
            showNotification(errorMessage, 'danger');
        }
    };

    const addUsersButton = $('#add-user-button');
    addUsersButton.click(() => {
        const name = $('#name').val();
        const emailAddress = $('#email').val();
        const user = { name, emailAddress };
        saveUser(user, saveUserResultHandler);
    });
};

$(document).ajaxComplete(() => {
    deleteUserHandler();
    updateUserHandler();
    isUpdateAndDeleteHandlerSet = true;
});

const deleteUserHandler = () => {
    $('.delete-user-action').unbind().click((something) => {
        const r = confirm("Are you sure you want to delete this user?");
        const id = something.target.value;
        const deleteUserRequestHandler = (id, errorMessage) => {
            if (id) {
                showNotification('User deleted successfully!', 'success');
                deleteUserRow(id);
            }

            if (errorMessage) {
                showNotification(errorMessage, 'danger');
            }
        };
        if (r == true) {
            // delete user and update the list
            deteteUser(id, deleteUserRequestHandler);
        }
    });
};

const updateUserHandler = () => {
    $('.update-user-action').unbind().click((updateButton) => {
        adjustUi('update');
        const id = updateButton.target.value;
        const rowId = 'user-' + id;

        $('#update-user-id').val(id);
        $('#update-name').val($('#' + rowId + ' td:nth-child(2)').text());
        $('#update-email').val($('#' + rowId + ' td:nth-child(3)').text());


        $('#update-user-button').click(() => {
            const name = $('#update-name').val();
            const emailAddress = $('#update-email').val();

            let userToBeUpdated = { id, name, emailAddress };

            updateUser(userToBeUpdated, updateUserRequestHandler);
        });

        const updateUserRequestHandler = (updatedUser, errorMessage) => {
            if (updatedUser) {
                showNotification('User updated successfully!', 'success');
                adjustUi('list');
                updateUserRow(id, updatedUser);
            } if (errorMessage) {
                showNotification(errorMessage, 'danger');
            }
        };
    });
};
