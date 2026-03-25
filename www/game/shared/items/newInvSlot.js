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
		var key	=InvSlot.parsekey( item.key )
		
		let maxlen	=InvSlot.maxlen(key) - this.glen(key)

		var canlen	=Math.min( maxlen, len )
		return canlen
	}


	/**@ret {AddMsg} msg */

	additem( item ,nav ,msg )
	{
		if( item.isstcnt )
		{
			// var msg	=new AddMsg()
			
			msg.slotnewcnts	=new Array(item.len)
			
			for(var i =0 ;i< item.len ;++i)
			{
				var cnt	=item.spawncnt()

				msg.slotnewcnts[i]	=cnt

				super.additem( cnt )
			}
		}
		else	super.additem( item )

		// return msg
	}


	static canadditem( item, len )
	{
		return Math.min( this.maxlen(item.gkey()) ,len )
	}


	glen( key )
	{
		return super.glen( InvSlot.parsekey(key) )
	}


    static maxlen( key )
	{
		return this.allowed[this.parsekey(key)] || 0
	}


	static parsekey( key )
	{
		return key.endsWith( StCnt_suff )	?
		
			key.substring( 0 ,StCnt_suff.length - 3 )	: key 
	}
}