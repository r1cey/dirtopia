// import './utils.js'

import Client from "./Client.js"

window.cl	=new Client()

cl.srv.url	='127.0.0.1:8043'

cl.start()

cl.srv.test().then(( res)=>console.log('Is server up: '+res))


// cl.html.can.drawgrid()

// cl.html.menu.setopts( { symb :"a" } )

// cl.html.menu.show()