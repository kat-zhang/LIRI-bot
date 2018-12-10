# LIRI-bot

LIRI-bot is a command-line application using node.js to execute server-side JavaScript. 
One of the main node modules featured is Axios which is the server-side equivalent of
an AJAX call in front-end JS. With the **Axios**, LIRI-bot the user is able to give a request
and LIRI-bot returns a response.  

Axios allows for asynchronous processing of JavaScript in conjunction with other tasks or files
such as  **.gitignore** and **.env**. Aside from being able to retrieve information for the client, 
Axios can also protect sensitive information such as API Keys. LIRI-bot uses .gitignore and .env to
hide the API keys needed to provide a response to its user. The file .gitignore lets GitHub know 
what files should be ignored...or excluded from being visible or accesible to the average end-user 
without affecting the functionality of the application.  


# How to use LIRI-bot
LIRI-bot is used to find information on films, songs and concert dates through the terminal. 
To use LIRI-bot:

##### Please note:  LIRI-bot can only respond to one request at a time
1. Open the terminal and navigate the relative path to the file liribot.js. 
2. Start the command by typing *node liribot* and then: 


  - Type *movie-this* followed by a movie title
  - Type *concert-this* followed by musical artist
  - Type *spotify-this-song* followed by a song title
  - To get a surprise DO NOT include a movie, musician or song after the above phrases
  OR type the phrase *do-what-it-says*

  3. Once the user hits enter LIRI-bot will provide a **response** with either information on a movie, upcoming concert dates
  or general information on a song based on the user's **request**. 

  
# Demonstration
###### Click on the thumbnail to see the demonstration
<a href="http://www.youtube.com/watch?feature=player_embedded&v=nSs6IVjA4_g
" target="_blank"><img src="http://img.youtube.com/vi/nSs6IVjA4_g/0.jpg" 
alt="IMAGE ALT TEXT HERE" width="480" height="360" border="10" /></a>


# Future Development

  - Implement the inquirer package so the user can select to either look up a song, movie or concert dates. It would
no longer be necessary for the user to type out the *movie-this*, *concert-this* etc...
  
