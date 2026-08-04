import Maps	from "./maps/Maps.js"
import Pls	from "./player/Players.js"

export default class Nav
{
	a

	error	=-1


	constructor( a )
	{
		this.a	=a ?? []
	}


	/** @todo Error handling */

	static frommsg( arr ,game )
	{
		const nav	=new this( arr )

		return nav.frommsg( game )
	}


	///////////////////////////////////////////////////////////////////////////


	last()	{return this.a.at(-1) }

	add( o )	{ this.a.push( o ); return this }

	gloc()
	{
		const arr	=this.a

		if( arr[0] instanceof Maps )	return arr[1]
	
		else if( arr[0] instanceof Pls )	return arr[1].loc
	
		else	console.error( "Nav.gloc" ,arr )
	}
	ggame()	{return this.a[0].game }

	gmap()	{return this.ggame().maps.loc2map( this.gloc() )}


	dad( len =1 )	{return this.at(-len) }

	
	///////////////////////////////////////////////////////////////////////////


	frommsg( game )
	{
		const arr	=this.a
		
		switch( arr[0] )
		{
			case "maps"	:
				
				arr[0]	=game.maps
			break
			case "pls"	:
				
				arr[0]	=game.pls
			break
			default :

				console.error( "Nav.frommsg" ,arr[0] )

				this.error	=0
		}
		const len	=arr.length

		for(var i =1 ;i<len;++i)
		{
			arr[i]	=arr[i-1].pmsg2obj?.( arr[i] ,arr ,i-1 )

			if( ! arr[i] )
			{
				console.error( "Nav.frommsg" ,arr )

				this.error	=i
			}
		}
		return this
	}


	///////////////////////////////////////////////////////////////////////////


	/** Remember that after nav is sent, it's permanently transformed */

	toJSON()
	{
		const arr	=this.a
		
		const len	=arr.length

		for(var i =0 ;i< len ;i++)
		{
			if( arr[i].tonavmsg )	arr[i]	=arr[i].tonavmsg()
		}
		return arr
	}
}