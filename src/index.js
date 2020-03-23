const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  dialog,
  screen,
  shell
} = require('electron')
const path = require('path')
const url = require('url')
const cheerio = require('cheerio')
const fs = require('fs')
const Store = require('electron-store')
const store = new Store()
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

//now

let win, subjectWindow
let subjectsExtracted = []
let fileNames = []
let fakibajiOffset = 12
let fileNameCache = []

function getDirectories (srcpath) {
  //console.log('called2');

  return fs
    .readdirSync(srcpath)
    .map(file => path.join(srcpath, file))
    .filter(path => fs.statSync(path).isDirectory());
}

//console.log(getDirectories(store.get('save_location')[0]))
function getFilesArray (folderArray) {
  //console.log('called1');

  let files = []
  for (var i = 0; i < folderArray.length; i++) {
    files.push([
      folderArray[i],
      fs
        .readdirSync(folderArray[i])
        .map(file => path.join(folderArray[i], file))
        .filter(path => !fs.statSync(path).isDirectory())
    ])
  }
  // console.log(files);
  fileNameCache = files
  return files
}

//IPC
ipcMain.on('fire_elms_channel', (e, args) => {
  if (args !== null) {
    openElms(args.username, args.password)
  }

  e.sender.send('fire_elms_channel', 'Received!')
})
ipcMain.on('fire_ucam_channel', (e, args) => {
  if (args !== null) {
        const _width = screen.getPrimaryDisplay().bounds.width
    const _height = screen.getPrimaryDisplay().bounds.height

    const ucam = new BrowserWindow({
      x: _width - 700,
      y: _height / 2 - 300 + fakibajiOffset,
      width: 700,
      height: 600,
      icon: __dirname + '/assets/icons/win/icon.ico',
      webPreferences: { nodeIntegration: false }
    })
    fakibajiOffset += 12;

    ucam.loadURL("http://ucam.uiu.ac.bd/Security/LogIn.aspx?scMgtMas=upMain%7ClogMain%24Button1&logMain%24UserName="+ store.get('ucam-creds.username') +"&logMain%24Password="+ store.get('ucam-creds.password') +"&__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=%2FwEPDwULLTE5MDk1NjIxMjAPFgIeE1ZhbGlkYXRlUmVxdWVzdE1vZGUCARYCAgMPZBYCAgEPZBYCZg9kFgICAw88KwAKAQAPFgQeC0ZhaWx1cmVUZXh0BSZJbnZhbGlkIExvZ2luLUlELCBFbnRlciB2YWxpZCBMb2dpbi1JRB4IVXNlck5hbWUFDWFhYWFhYWFhYWFhYWFkFgJmD2QWAgIEDw8WAh4EVGV4dAUNYWFhYWFhYWFhYWFhYWRkZGpdzRdsDjE0%2Fv9pQwKkf9xbj6fzsbpxWpijg9YbW5Dl&__VIEWSTATEGENERATOR=A0A15FC2&__PREVIOUSPAGE=ZuiisqBvpW_0hcUNji5ecSkkredq8yDQHG4lecJt6g4AlanF6slDLkiQYH0I4SERfe1Ae3O-5mLXekkIYDMF6EVUFx7kRx12NhFwQ2qKAho1&__ASYNCPOST=true&logMain%24Button1=LOG%20IN")

  }

  e.sender.send('fire_elms_channel', 'Received!')
})
ipcMain.on('sendFiles', (e, args) => {
  if (args !== null && args === 999) {
    //openElms(args.username, args.password);

    try {
      e.sender.send(
      'sendFiles',
      getFilesArray(getDirectories(store.get('save_location')[0]))
    );  
    } catch (error) {
      
    }
    
  } else if (args !== null && typeof args === 'string') {
    //console.log(args);

    shell.openItem(fileNameCache[args.split('')[0]][1][args.split('')[1]])
  }
})

ipcMain.on('location', (e, args) => {
  if (args !== null) {
    console.log(
      dialog.showOpenDialog({ properties: ['openDirectory'] }).then(resolve => {
        console.log(e.sender.send('location', resolve.filePaths))
      })
    )
  }

  //e.sender.send('location', location);
})

ipcMain.on('sendSubjectsToDisplay', (e, args) => {
  if (args !== null && args === 'R') {
    // console.log('Received & Done Successfully')
  } else if (args !== null && args === 'S') {
    e.sender.send('sendSubjectsToDisplay', subjectsExtracted)
  } else if (args !== null) {
    //e.sender.send('sendSubjectsToDisplay', subjectsExtracted);
    // console.log('Subject sent to this channel: ' + args)
    const _width = screen.getPrimaryDisplay().bounds.width
    const _height = screen.getPrimaryDisplay().bounds.height

    let sub = new BrowserWindow({
      x: _width - 700,
      y: _height / 2 - 300 + fakibajiOffset,
      width: 700,
      height: 600,
      icon: __dirname + '/assets/icons/win/icon.ico',
      webPreferences: { nodeIntegration: false }
    })
    fakibajiOffset += 12;

    sub.loadURL(args)

    //TODO

    sub.webContents.session.on('will-download', (event, item, webContents) => {
      var title = sub.getTitle()
      // console.log(store.get('save_location')[0]);
      var dir =
        store.get('save_location')[0] +
        '\\' +
        title.split(': ')[2].split('/')[0]

      // console.log(dir);

      if (!fs.existsSync(dir)) {
        // console.log(45);

        fs.mkdirSync(dir)
      }

      // Set the save path, making Electron not to prompt a save dialog.
      item.setSavePath(dir + '/' + item.getFilename())
      // console.log(item.getSavePath() + '---'  + item.getFilename());

      item.on('updated', (event, state) => {
        if (state === 'interrupted') {
          // console.log('Download is interrupted but can be resumed' + state)
        } else if (state === 'progressing') {
          if (item.isPaused()) {
            // console.log('Download is paused')
          } else {
            // console.log(`Received bytes: ${item.getReceivedBytes()}`)
          }
        }
      })
      item.once('done', (event, state) => {
        if (state === 'completed') {
          // console.log('Download successfully')
        } else {
          // console.log(`Download failed: ${state}`)
        }
      })
    })
  }
});


const createWindow = () => {
  //Browser windows config
  const _width = screen.getPrimaryDisplay().bounds.width
  const _height = screen.getPrimaryDisplay().bounds.height

  win = new BrowserWindow({
    x: 10,
    y: _height / 2 - 300,
    width: 800,
    height: 600,
    icon: __dirname + '/assets/icons/win/icon.ico',
    frame: true,
    webPreferences: { nodeIntegration: true, webviewTag: true }
  })

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  )
  //win.loadURL("http://elms.uiu.ac.bd/login/index.php?sesskey=tYNguu5V6iLog%20in");
  //win.loadURL("javascript:alert('Alhamdulillah')");

  //for devtools //TODO remove devtools
  // win.webContents.openDevTools();

  // quit all window
  win.on('closed', () => {
    app.quit()
  })

  sendFiles()
};



function openElms (username, password) {
  const _width = screen.getPrimaryDisplay().bounds.width
  const _height = screen.getPrimaryDisplay().bounds.height

  elms = new BrowserWindow({
    x: _width - 700,
    y: _height / 2 - 300,
    width: 700,
    height: 600,
    icon: __dirname + '/assets/icons/win/icon.ico',

    webPreferences: { nodeIntegration: false, webviewTag: true }
  })

  elms.loadURL(
    'http://elms.uiu.ac.bd/login/index.php?sesskey=tYNguu5V6iLog%20in'
  )

  const javascriptURL =
    "function s(){document.getElementById('username').value = '" +
    username +
    "'; document.getElementById('password').value ='" +
    password +
    "';document.getElementById('loginbtn').click()}s();"

  elms.webContents.on('did-finish-load', () => {
    elms.loadURL('javascript:' + javascriptURL)
    // console.log('1.1 => Logging in...')
    extract_elms()
  });

  //for devtools //TODO remove devtools
  // elms.webContents.openDevTools()

  //onclose
  elms.on('closed', () => {
    elms = null
  })
}

function extract_elms (jsurl) {
  elms.webContents.on('did-finish-load', () => {
    // console.log('2.1 => Saving page...')

    elms.webContents
      .savePage(__dirname + '/elms_file_data_extracted.html', 'HTMLOnly')
      .then(() => {
        // console.log(
        //   '2.2 => Page saved at ' + __dirname + '/elms_file_data_extracted.html'
        // )
        extract_links()
      })
      .catch(err => {
        // console.log(err)
      })
  })
}

function extract_links () {
  subjectsExtracted = []
  // console.log('3.1 => Extracting Links...')

  const $ = cheerio.load(
    fs.readFileSync(__dirname + '/elms_file_data_extracted.html')
  )

  $('.content')
    .find('a')
    .each((i, e) => {
      //console.log(i + ": " + $(e).attr('title'));
      if (
        $(e)
          .attr('href')
          .includes('http://elms.uiu.ac.bd/course/view.php?id=')
      ) {
        // console.log(i + ': ' + $(e).attr('href'))
        // let newp = new BrowserWindow({
        //   x:10,
        //   y:10,
        //   width: 800,
        //   height: 600,
        //   icon: __dirname + '/assets/icons/win/icon.ico',
        //   webPreferences: { nodeIntegration: false }
        // })

        // newp.loadURL($(e).attr('href'))
        let row = []
        row.push($(e).attr('href'), $(e).html())
        subjectsExtracted.push(row)
      }
      store.set('subjects', subjectsExtracted)
    })
  // console.log('3.2 => Alhamdulillah! Extraction ended');
  displaySubjects(subjectsExtracted)
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


//display subjects
function displaySubjects (subjects) {
  win.webContents.send('there', subjects)
}

function sendFiles () {
  // console.log(4545);

  // console.log(getFilesArray(getDirectories(store.get('save_location')[0])));
try {
  win.webContents.send(
    'filesNames',
    getFilesArray(getDirectories(store.get('save_location')[0]))
  );
} catch (error) {
  
}
  
}
