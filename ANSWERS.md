Notice anything new in our .gitignore? There are actually multiple .gitignore files in this project. Where are they? 
The .gitignore files are located in client, server, and top directory. server/.gitignore and client/.gitignore are local 
gitignores. Using gitignore is easier and faster than manually adding files to
 github, with the use of gitignore we can tell the files we don’t want added and the rest 
 can automatically be allowed into the repository, you could also add a working directory 
 filled with files that you never want to commit.
 
 Why might we have more than one?
Different directories with different organization/files to ignore. For example, 
the main directory gitignore could be meant for ignoring programs, while the 
server/gitignore can be used to ignore all files relevant to the server.

How do they interact?
Each of the gitignores have their own job, the organization and their delegated interaction 
lets us get away without version controlling absolutely everything.

Note also that there are now multiple build.gradle files as well! Why is this?
We may want to build independent portions of the project, for example, if we had a 
server running in the real world, it would probably be in our best interest to be 
able to test client/server while the real server is running. 

How does the navigation menu (with Home and Users) work in this project?
The navigation menu opens with an overlay on the left. Clicking users allows 
you to see all of the info in the users.json file with a pretty gui, Home 
allows you to go back to the main page. 

Compare Server.java and app.routes.ts. Both do a kind of routing; what does each accomplish and how?
The redirect routing in Server.Java does work with redirecting within the confines of the 
server on localhost:4567, this includes the api generated pages. App.routes is more of a 
front-end failsafe. For example, you can get to the client home by typing in whatever you 
want after localhost:9000/. (Except for users).

What does the user-list.service.ts do? Why is it not just done in the user-list.component.ts?
User-list.service.ts is independent of user-list.component because of AngularJS injector’s
 ability to compile some markup after the application has been bootstrapped, basically, 
 allows you change the angular implementation while it is running.
 
 
https://github.com/UMM-CSci-3601-S19/lab-3-taylor-and-colt/
