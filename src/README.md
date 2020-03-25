# Hello everyone !

## So this is the updated (latest) source code for Studysense.


# For source code installation
To test this software -\
	1. `git clone https://github.com/MashukeAlam/Studysense.git`\
	2. `cd Studysense`\
	3. `npm install`\
	4. `npm start`
	

For the third step you must have to have NPM install.
Then you can change/edit the source code. After that for creating a public build - \
	5. `npm run make` 
	
:blush:
	

# Folder/File descriptions:
Inside source folder are the files which is actually responsible for the app's functionality.

Folders: 
	1. /src/extra-packages -> This holds bootstrap styles.\
	2. /src/imgs -> This is redundant. Not used in project.
	
Files:
	1. /src/SystemInfo.html -> This file shows system processors, RAM size etc.\
	2. /src/about.html -> This holds the developer information.\
	3. /src/cursor.cur -> Cursor file for that green cursor that you see in screen.\
	4. /src/db-manager.js -> This manages/store/extracts the password from "electron-store" module. Then it triggers \
		* ucam-signal-send.js -> for UCAM launch \
		* handle-elms.lauch.js -> for ELMS launch. \
	5. /src/home.html -> This is copy of an older version of index.html. Not used in this project.\
	6. /src/index.css -> This file was auto-generated. Hilariously this file is not used in index.html styling. index.html uses inner <style> tags.\
	7. /src/reload.svg -> this is material design icon for reload button.\
	8. /src/renderer.js -> This file is mandatory for electron functionality. Electron holds its technical mumbo-jumbo inside this file temporarily in runtime.\
	9. /src/script.js -> used for linking renderer.js.\
	10. /src/SubjectView.html -> Not used. This is later integrated inside index.html file.

# Some restrictions
Please don't publish your personally modified version of this app to public without my knowledge. :sunglasses: ** You can however use it in your own PC.

<b>And please never mess with these files below:</b>\
	1. /src/about.html\
	2. /src/renderer.js\
	3. /package-lock.json\
	


	
# ** Contacts
** My Email: mjim181145@bscse.uiu.ac.bd
** My FB: Mash Jim
** My Dept. & Roll: CSE - 011-181-145


:green_heart: :green_heart: :green_heart:
:purple_heart: :purple_heart: :purple_heart:
### Thanks
