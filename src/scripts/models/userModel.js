import $ from "jquery";
import { usersApiBaseUrl } from '../config';

export const getAllUsers = (userResultHandler) => {
    $.get(usersApiBaseUrl)
        .done((users) => {
            userResultHandler(users);
        }).fail((error) => {
            userResultHandler(undefined, 'Error while fetching users');
        });
};

export const saveUser = (user, saveUserResultHandler) => {
    $.ajax({
        type: "POST",
        url: usersApiBaseUrl,
        data: JSON.stringify(user),
        headers: {
            "Content-Type": 'application/json'
        },
        dataType: 'json',
        success: (data) => {
            saveUserResultHandler(data);
        },
        error: (data) => {
            const responseCode = data.responseJSON.status;
            let errorMessage = "An error occurred while saving user";
            if (responseCode == 400) {
                errorMessage = data.responseJSON.message;
            }
            saveUserResultHandler(undefined, errorMessage);
        }
    });
};

export const deteteUser = (id, deleteUserRequestHandler) => {
    $.ajax({
        url: usersApiBaseUrl + '/' + id,
        method: 'DELETE',
        success: () => {
            deleteUserRequestHandler(id);
        },
        error: (error) => {
            let errorMessage = 'An error occured while deleting user!';
            deleteUserRequestHandler(undefined, errorMessage);
        },
    });
};

export const updateUser = (userToBeUpdated, updateUserRequestHandler) => {
    $.ajax({
        type: 'PUT',
        url: usersApiBaseUrl + '/' + userToBeUpdated.id,
        contentType: 'application/json',
        data: JSON.stringify(userToBeUpdated),
    }).done(() => {
        updateUserRequestHandler(userToBeUpdated);
    }).fail((error) => {
        const errorMessage = 'An error occured while updating user!';
        updateUserRequestHandler(undefined, errorMessage);
    });
};