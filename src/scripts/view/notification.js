import $ from "jquery";

export const showNotification = (message, type) => {
    let notificationContainer = $('#notification-container');

    notificationContainer.show();
    notificationContainer.text(message);

    let className = 'alert ' + 'alert-' + type;
    notificationContainer.attr('class', className);
};

export const clearNotificationMessage = () => {
    let notificationContainer = $('#notification-container');
    notificationContainer.hide();
    notificationContainer.text('');
};