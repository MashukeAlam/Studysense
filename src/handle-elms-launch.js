const {ipcRenderer} = require('electron'); 
console.log('Renderer Script');



function elms_signal_send(data) {
    ipcRenderer.send('fire_elms_channel', data);
}


ipcRenderer.on('fire_elms_channel', (e, args) => {
    console.log(args);
})