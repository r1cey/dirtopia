import newAct	from "./newActionable.js"

import Maps from "./maps/Maps.js"
import Players from "./player/Players.js"

import Nav	from "./Nav.js"
import Loc	from "./Loc.js"



/************************************************
 * 
 * This is the ROOT file of the entire game. Start your familiarization
 * from here!
 * 
 * Look up Game.js on /src for server-side extensions,
 * and at /www for client-side extension.
 * 
 **************************************************/



/** Since back and front-end are done in JS, this shared directory
 * is the root of the game. With Game class being the main class for both
 * server and client.
 * 
 * Anton is considering making it a God object or even a global variable. */

export default class Game
{
	maps	=new this.constructor.Maps( this )

	pls	=new this.constructor.Pls( this )


	/** Child classes can override Maps and Players classes */

	static Maps	=Maps

	static Pls	=Players

	static Nav	=Nav

	static Loc	=Loc

	/** Anton is considering attaching item types collection to Game obj. */

	/** @static
	@var itTps	 */


	///////////////////////////////////////////////////////////////////////////



	setpl( pl )
	{
		const maps	=this.maps

		this.pls.s( pl )

		// pl.gmap().obj.g(pl.loc)

		this.maps.setpl( pl )
	}


	/** It's here just so we can extend it on server and client side 
	 * to also communicate the action.
	 * @return {*}	-Whatever the action returns. */

	runact( nav ,actk ,pl ,arg)
	{
		return nav.at(-1).runact( nav ,actk ,pl ,arg)
	}



	additem( to ,item )
	{	
		return to.at(-1).additem( item ,to )
	}


	///////////////////////////////////////////////////////////////////////////


	/** Specifically creates a new Nav from a MESSAGE array! (strings) */

	newnav( arr )
	{
		const nav	=Nav.frommsg( arr ,this )

		return nav
	}
}