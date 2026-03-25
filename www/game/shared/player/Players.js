import newPatha from "../newPathable.js"

import Pl from "./Player.js"



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


	/////////////////////////////////////////////////////////////////



	g( n )	{return this.o[n] }

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

		return pl
	}


	pmsg2obj( pln )	{return this.g(pln) }


	toJSON( key )	{return "pls" }
}