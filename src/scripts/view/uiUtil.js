import $ from "jquery";

export const adjustUi = (operationName) => {
    if(operationName === 'list'){
        $('#user-management').show();
        $('#add-user').hide();
        $('#update-user').hide();
    }

    if(operationName === 'add'){
        $('#user-management').hide();
        $('#add-user').show();
        $('#update-user').hide();
    }

    if(operationName === 'update'){
        $('#user-management').hide();
        $('#add-user').hide();
        $('#update-user').show();
    }
};

export const clearAddUserForm = () => {
    $('#name').val('');
    $('#email').val('');
};