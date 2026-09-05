import newAct	from "./newActionable.js"

import Maps from "./maps/Maps.js"
import Players from "./player/Players.js"

import Nav from "./Nav.js"


/** Since back and front-end are done in JS, this shared directory
 * is the root of the game. With Game class being the main class for both
 * server and client.
 * 
 * Anton is considering making it a God object or even a global variable. */

export default newAct( class Game
{
	maps	=new this.constructor.Maps( this )

	pls	=new this.constructor.Pls( this )


	/** Child classes can override Maps and Players classes */

	static Maps	=Maps

	static Pls	=Players

	/** Anton is considering attaching item types collection to Game obj. */

	/** @static
	@var itTps	 */



	setpl( pl )
	{
		const maps	=this.maps

		this.pls.s( pl )

		// pl.gmap().obj.g(pl.loc)

		this.maps.setpl( pl )
	}



	additem( to ,item )
	{	
		return to.at(-1).additem( item ,to )
	}


	///////////////////////////////////////////////////////////////////////////



	newnav( arr )
	{
		const nav	=Nav.frommsg( arr ,this )

		return nav
	}
})