import Pl from "./Player.js"


export default class Players
{
	o	={}

	// arr	=[]

	game


	static Player	=Pl


	/////////////////////////////////////////////////////////////


	constructor( game )
	{
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


	// msg2navo( afrom ,i ,ato )	{ ato.push( this.o[afrom[i]] )}


	toJSON( key )	{return "pls" }
}