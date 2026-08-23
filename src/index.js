import Game from "./Game.js"

// import repl from 'node:repl'



/** Server is run from here. Modify if you know what you're doing. */



global.game	=new Game( 'conf.json' )

game.maps.conf.dir	='./maps/desert/'

try
{
	await game.init()
}
catch(e)
{
	console.error( e )

	process.exit(1)
}
await game.load()

if( ! game.maps.isready() )
{	
	game.maps.gendesert()
}
game.start()

// game.maps.ground.printarr(0)

// repl.start() 
