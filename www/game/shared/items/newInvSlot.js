// import newInv from "./newInv.js";

import { AddMsg } from "../Msgs.js";

import{ suffix as StCnt_suff }	from "./newStackCnt.js"



export default( Base )=>class InvSlot extends Base
{
    static allowed  ={}



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

		if( canlen > 0 && nav.at(-2).canchildadd )
		{
			canlen	=nav.at(-2).canchildadd( item ,canlen ,nav ,nav.length - 2 )
		}
		return canlen
	}


	/**@ret {AddMsg} msg */

	additem( item )
	{
		var msg

		if( item.isstcnt )
		{
			msg	=new AddMsg()
			
			msg.newslotcnts	=new Array(item.len)
			
			for(var i =0 ;i< item.len ;++i)
			{
				var cnt	=item.spawncnt()

				msg.newslotcnts[i]	=cnt

				super.additem( cnt )
			}
		}
		else	super.additem( item )

		return msg
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