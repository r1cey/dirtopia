import Client from "./Client.js"

// import './utils.js'



/*****************************************
 * 
 * Main entry point for the web application.
 * 
 * Client-side's Game class is extended in Client
 * class. 
 * 
 ***********************************************/



window.cl	=new Client()

cl.srv.url	='127.0.0.1:8043'

cl.start()

cl.srv.test().then(( res)=>console.log('Is server up: '+res))


// cl.html.can.drawgrid()

// cl.html.menu.setopts( { symb :"a" } )

// cl.html.menu.show()