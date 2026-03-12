import PlBase from "./PlBase.js"
import newJable from "../newJsonable.js"

import Hands from "./Hands.js"


/** Class for visible players.*/

export default class PlVis	extends newJable( PlBase )
{
	static key	="pl"

	hands	=this.newhands()

	speed	=1


	///////////////////////////////////////////////////////////////////////////



	set( pl )
	{
		for(var key in pl )
		{
			if( key in this )
			{
				this[key]	=pl[key]
			}
		}
		return this
	}


	/*additem( item )
	{
		len	??=item.num

		var key	=item.gkey()

		var addedlen

		switch( key )
		{
			case "belt" :

				addedlen	=1

				this.inv.belt	=item.take( addedlen )
			break
			case "seedbag" :

				let bags	=this.inv.seedbags

				let bagsl	=0

				for(var bagid in bags )
				{
					bagsl ++
				}
				addedlen	=Math.min( len, 15 - bagsl )

				if( addedlen <= 0 )	return 0

				for(var i =0;i< addedlen ;i++)
				{
					var newitem	=item.take( 1 )

					if( ! newitem.id )	newitem.setuniq()

					bags[newitem.id]	=newitem
				}
			break
			default :

				addedlen	=0
		}
		return addedlen
	}*/


	///////////////////////////////////////////////////////////////////////////


	/**@arg out	- [next item ,index step ] *

	PlVis.prototype. msg2navo	=function( afrom ,i ,ato )
	{
		if( afrom[i] === "hands" )
		{
			ato.push( this.hands )
		}
		else
		{
			return InvSlot.prototype.msg2navo. call(this, afrom ,i ,ato )
		}
	}*/

	///////////////////////////////////////////////////////////////////////////



	newhands()	{return new Hands( this )}
}