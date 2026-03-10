import Loc from "../Loc.js"
import Col from '../Color.js'

import Hands from "./Hands.js"

import newISlot	from "../items/newInvSlot.js"

import newJable from "../newJsonable.js"

// import items from "../items/items.js"


/** Class for visible players. Has limited information. */


export default class PlVis extends  newJable(newISlot())
{
	static key	="pl"

	name

	r	= 0.62

	col	=new Col(0, 100, 50)
	
	loc	=new Loc(0,0,0)	//when this is derived on client, it can become a getter function

	cl	=null

	sleep	=0

	hands	=new Hands()

	static allowed	=
	{
		belt	:1
	}


	get ispl()	{return this }



	constructor( pl )
	{
		super()

		if( pl )	this.set(pl)
	}



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



	map( pls )
	{
		return pls.game.maps.loc2map( this.loc )
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
}