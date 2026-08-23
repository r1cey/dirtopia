import newPatha from "../newPathable.js"

import Pl from "./Player.js"


/** Since players are rapid moving objects, they get their own management
 * outside of the maps. It creates overhead since their position needs to be
 * updated on the map dictionaries as well.
 * 
 * This class is used as root for Nav paths. */

export default class Players	extends newPatha()
{
	o	={}

	// arr	=[]

	game


	static Player	=Pl


	/////////////////////////////////////////////////////////////


	constructor( game )
	{
		super()

		this.game	=game
	}


	///////////////////////////////////////////////////////////////////////////



	gmaps()	{return this.game.maps }


	///////////////////////////////////////////////////////////////////////////



	g( n )	{return this.o[n] }


	/** Only changes self */
	
	s( pl )
	{
		this.o[pl.name]	=pl

		pl.pls	=this
	}

	fore( fun )	{ for(var pln in this.o )	fun( this.o[pln] )}


	
	new( plmsg )
	{
		const pl	=new this.constructor.Player( this ).setj( plmsg )

		this.s( pl )

		this.game.maps.setpl( pl )
		
		return pl
	}


	pmsg2obj( pln )	{return this.g(pln) }


	toJSON( key )	{return undefined }

	tonavmsg()	{return "pls" }
}