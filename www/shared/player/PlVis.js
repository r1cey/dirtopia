import PlBase from "./PlBase.js"
import newJable from "../newJsonable.js"

import Hands from "./Hands.js"

import Nav	from "../Nav.js"
import{ nonenum } from "../utils.js"


/** Class for visible players.*/

export default class PlVis	extends PlBase
{

	hands	=new this.constructor.Hands( this )

	speed	=1


	static Hands	=Hands

	/*static apprps	=
	[
		...PlBase.apprps
		,
		[ "hands" ,(pl)=> new this.Hands(pl) ]
		,
		[ "speed" ,()=> 1 ]
	]*/


	///////////////////////////////////////////////////////////////////////////



	constructor( ...args )
	{
		super( ...args )

		nonenum( this ,"handsnav" ,new Nav([ this.pls ,this ,this.hands ]))
	}


	///////////////////////////////////////////////////////////////////////////


	fore( fn )
	{
		const it	=this.hands.item

		// if( it )	fn( it )

		super.fore( fn )
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



	pmsg2obj( key ,nava ,i )
	{
		return key === "hands"	? this.hands	: super.pmsg2obj( key ,nava ,i )
	}
}