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


	
	new( plmsg ,items =this.game.constructor.items )
	{
		const pl	=new this.constructor.Player( this ).setj( plmsg )
		
		// pl.loc.set( loc )

		// add starter items
		{
			let belt	=new items.belt().su()
			
			belt.additem( new items.multi() )
			
			pl.additem( belt )

			let sbag	=new items.seedbag().su()
			
			sbag.additem( new items.cuc_seeds( 15 ) )

			pl.additem( sbag )
		}
		this.s( pl )

		return pl
	}


	// msg2navo( afrom ,i ,ato )	{ ato.push( this.o[afrom[i]] )}
}