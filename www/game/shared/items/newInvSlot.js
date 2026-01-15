import newInv from "./newInv.js";

import { AddMsg } from "../Msgs.js";



export default( Base =newInv() )=>class InvSlot extends Base
{
    static allowed  ={}


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


    static canadditem( item ,len )
	{
		var allowlen	=this.allowed[item.gkey()]

		if( ! allowlen )	return 0

		return Math.min( allowlen ,len )
	}



	static newallow( stcks ,cnts )
	{
		var allowed	=Object.assign( {} ,stcks )

		// Object.assign( allowed  )

		for(var k in cnts )
		{
			allowed[k]	=cnts[k]

			allowed[k+this.Stack.suffix]	=cnts[k]
		}
		return allowed
	}
}