const socket = io();

const lblOnline = document.querySelector('#lbl-online');
const lblOffilne = document.querySelector('#lbl-offline');
const txtMsg = document.querySelector('#txt-msg');
const btnSend = document.querySelector('#btn-send');

socket.on('connect', () => {
    lblOffilne.style.display = 'none';
    lblOnline.style.display = ''
});

socket.on('disconnect', () => {
    lblOnline.style.display = 'none'
    lblOffilne.style.display = '';
});

socket.on('send-msg', (payload) => {
    console.log(payload);
});

btnSend.addEventListener('click', () => {
    const msg = txtMsg.value;
    const payload = {
        msg,
        id: '1234ABC',
        date: new Date().getTime()
    }

    socket.emit('send-msg', payload, (id) => {
        console.log('From server', id);
    });

    txtMsg.value = '';
});