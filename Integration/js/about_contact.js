var about_button = document.querySelector('#about-btn-dialog'),
    contact_button = document.querySelector('#contact-btn-dialog');

var about_dialog = document.querySelector('#about-dialog'),
    contact_dialog = document.querySelector('#contact-dialog');
about_button.addEventListener('click', function () {
    about_dialog.showModal();
});
about_dialog.querySelector(".close").addEventListener('click', function () {
    about_dialog.close();
});
contact_button.addEventListener('click', function () {
    contact_dialog.showModal();
});
contact_dialog.querySelector(".close").addEventListener('click', function () {
    contact_dialog.close();
});