import newInv from "./newInv.js";

import { AddMsg } from "../Msgs.js";

import{ suffix as StCnt_suff }	from "./newStackCnt.js"



export default( Base =newInv() )=>class InvSlot extends Base
{
	/**@static
    @var allowed  ={} */

	get isslot()	{return this }



	/*static newallow( stcks ,cnts )
	{
		var allowed	=Object.assign( {} ,stcks )

		// Object.assign( allowed  )

		for(var k in cnts )
		{
			allowed[k]	=cnts[k]

			allowed[k+this.Stack.suffix]	=cnts[k]
		}
		return allowed
	}*/


	canadditem( item ,len ,nav )
	{
		// var dkey	=InvSlot.parse_dkey( item.constructor.dict_key )

		var Item	=item.constructor
		
		let maxlen	=InvSlot.maxlen(Item) - this.glen(Item)

		var canlen	=Math.min( maxlen, len )
		return canlen
	}


	/**@ret {AddMsg} msg */

	additem( item )
	{
		var msg

		if( item.isstcnt )
		{
			msg	=new AddMsg()
			
			msg.slotnewids	=new Array(item.len)
			
			for(var i =0 ;i< item.len ;++i)
			{
				var cnt	=item.spawncnt()

				msg.slotnewids[i]	=cnt.id

				super.additem( cnt )
			}
		}
		else	super.additem( item )

		return msg
	}


	static canadditem( item, len )
	{
		return Math.min( this.maxlen(item.constructor) ,len )
	}


	glen( Item )
	{
		return super.glen( Item.isstcnt ? Item.Cnt : Item )

		// return super.glen( InvSlot.parse_dkey(dkey) )
	}


    static maxlen( Item )
	{
		return this.allowed[ Item.isstcnt ? Item.Cnt.key : Item.key ]

		// return this.allowed[this.parse_dkey(dkey)] || 0
	}


	/*static parse_dkey( dkey )
	{
		return dkey.endsWith( StCnt_suff )	?
		
			dkey.substring( 0 ,dkey.length - StCnt_suff.length )	: dkey 
	}*/
}