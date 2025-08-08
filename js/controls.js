document.getElementById('btn-credits').addEventListener('click', () => openDialog('credits'));
document.getElementById('btn-priv-pol').addEventListener('click', () => openDialog('privacyPolice'));

document.getElementById('closeCredits').addEventListener('click', () => closeDialog('credits'));
document.getElementById('closePrivPol').addEventListener('click', () => closeDialog('privacyPolice'));

document.getElementById('credits').addEventListener('click', function(event) {
    if (event.target === this) {
        closeDialog('credits');
    }
});
document.getElementById('privacyPolice').addEventListener('click', function(event) {
    if (event.target === this) {
        closeDialog('privacyPolice');
    }
});