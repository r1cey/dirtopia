export default class Pls
{
	o	={}

	// arr	=[]

	game


	constructor( game )
	{
		this.game	=game
	}


	g( n )	{return this.o[n] }

	s( pl )
	{
		this.o[pl.name]	=pl

		pl.pls	=this
	}

	new( plmsg ,loc ,Pl )
	{
		const pl	=new Pl( this ).set( plmsg )
		
		pl.loc.set( loc )

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


	msg2navo( afrom ,i ,ato )	{ ato.push( this.o[afrom[i]] )}
}