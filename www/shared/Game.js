import Maps from "./maps/Maps.js"
import Players from "./player/Players.js"



export default class Game
{
	maps	=new this.constructor.Maps( this )

	pls	=new this.constructor.Pls( this )


	static Maps	=Maps

	static Pls	=Players

	/** @static
	@var items	 */



	newpl( plmsg )
	{
		const g	=this

		const items	=this.constructor.items

		const pl	=this.pls.new( plmsg ,items )

		this.maps.setpl( pl )
		
		return pl
	}



	setpl( pl )
	{
		const maps	=this.maps

		this.pls.s( pl )

		pl.map().obj.g(pl.loc)

		this.maps.setpl( pl )
	}



	additem( to ,item )
	{	
		return to.at(-1).additem( item ,to )
	}


	///////////////////////////////////////////////////////////////////////////

	/**@todo do all of the error handling */

	msg2nav( arr )
	{
		switch( arr[0] )
		{
			case "maps"	:
				
				arr[0]	=this.maps
			break
			case "pls"	:
				
				arr[0]	=this.pls
			break
		}
		const len	=arr.length

		for(var i =1 ;i<len;++i)
		{
			arr[i]	=arr[i-1].pmsg2obj?.( arr[i] ,arr ,i )

			if( ! arr[i] )	return -1
		}
	}
}