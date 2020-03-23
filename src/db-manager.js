const Store = require('electron-store')
const store = new Store()

//const remote = require('electron').remote
//const app = remote.app
//filePath = app.getPath('userData')
store.set('Allah', 'One')
function ifRegistered() {
    if(store.get('ucam-creds') != undefined && store.get('elms-creds') != undefined) {
        document.getElementById('creds').style.display = 'none';
        document.getElementById('goto').style.display = 'block';
    } else {
    }
}

function changePassword() {
    
    document.getElementById('creds').style.display = 'block';
    
}



function verify_ucam() {
    console.log('here');
    const id = document.getElementById('ucam-i').value;
    const pass = document.getElementById('ucam-p').value;
    store.set('ucam-creds.username', id);
    store.set('ucam-creds.password', pass);
    console.log(store.get('ucam-creds'));
}

function verify_elms() {
    console.log('here');
    const id = document.getElementById('elms-i').value;
    const pass = document.getElementById('elms-p').value;
    store.set('elms-creds.username', id);
    store.set('elms-creds.password', pass);
    console.log(store.get('elms-creds'));
}

function ucam_fire() {
    const url = "http://ucam.uiu.ac.bd/Security/LogIn.aspx?scMgtMas=upMain%7ClogMain%24Button1&logMain%24UserName="+ store.get('ucam-creds.username') +"&logMain%24Password="+ store.get('ucam-creds.password') +"&__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=%2FwEPDwULLTE5MDk1NjIxMjAPFgIeE1ZhbGlkYXRlUmVxdWVzdE1vZGUCARYCAgMPZBYCAgEPZBYCZg9kFgICAw88KwAKAQAPFgQeC0ZhaWx1cmVUZXh0BSZJbnZhbGlkIExvZ2luLUlELCBFbnRlciB2YWxpZCBMb2dpbi1JRB4IVXNlck5hbWUFDWFhYWFhYWFhYWFhYWFkFgJmD2QWAgIEDw8WAh4EVGV4dAUNYWFhYWFhYWFhYWFhYWRkZGpdzRdsDjE0%2Fv9pQwKkf9xbj6fzsbpxWpijg9YbW5Dl&__VIEWSTATEGENERATOR=A0A15FC2&__PREVIOUSPAGE=ZuiisqBvpW_0hcUNji5ecSkkredq8yDQHG4lecJt6g4AlanF6slDLkiQYH0I4SERfe1Ae3O-5mLXekkIYDMF6EVUFx7kRx12NhFwQ2qKAho1&__ASYNCPOST=true&logMain%24Button1=LOG%20IN";
    // window.location = url;

    ucam_signal_send(store.get('ucam-creds'));
}

function elms_fire() {
    elms_signal_send(store.get('elms-creds'));
}

ifRegistered();