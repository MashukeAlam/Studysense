Hey foolish people (me too) !!
Whassup? 
So this is a electron app made by me which has the following:

	1: A full implementation of main.js, index.html, renderer.js 
	2: Index.html file consists of bootstrap and 'require' modules cdn
	3: This app shows the system info (cpu, ram usage, platform, archi etc) *
	4: Packager/Installer is built in !!!!!!!!!!

After modifying and editing if you want to create an installer for WINDOWS:
	1: ready the folder of your app
	2: run `npm run package-win`
	3: the output file will be in build/ folder, copy that to previous directory...
	4: in previous directory run `npm install electron-winstaller`
	5: create a build.js file that will be given slong with this repo(copy that to previous directory from repo folder)
	6: run `node build.js`


*not in realtime (static)
