console.log('Renderer Script');



function ucam_signal_send(data) {
    ipcRenderer.send('fire_ucam_channel', data);
}


ipcRenderer.on('ucam_elms_channel', (e, args) => {
    console.log(args);
})