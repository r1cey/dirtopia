import newInv from "./newInv.js";

import { AddMsg } from "../Msgs.js";

import{ suffix as StCnt_suff }	from "./newStackCnt.js"



export default( Base =newInv() )=>class InvSlot extends Base
{
	static allowed  ={}

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
		if( ! super.canadditem( item ))	return 0

		const key	=InvSlot.parsekey( item.gkey() )
		
		const maxlen	=this.constructor.maxlen(key) - this.glen(key)

		const canlen	=Math.min( maxlen, len )

		return canlen //Math.max( canlen ,0 )
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
		
			key.slice( 0 ,- StCnt_suff.length )	: key 
	}
}