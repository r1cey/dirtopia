import newStack from "./newStackable.js";

// import newLive	from "../newLiveObj.js"

import { AddMsg } from "../Msgs.js";



export var suffix	="_vc"



export default( Base =newStack() )=>class SC	extends Base
{
	/**@static
	@var Cnt	*/

	static suffix	=suffix

	static isstcnt	=true

	get isstcnt()	{return true }

	// static Live	=newLive( LiveStackCnt )



	constructor( ...args )
	{
		super( ...args )
	}




	canadditem( item ,len ,nav )
	{
		var canlen	=this.gCnt().canadditem( item.constructor ,len )

		if( canlen > 0 && nav.at(-2).canchildadd )
		{
			canlen	=nav.at(-2).canchildadd( item ,canlen ,nav ,nav.length - 2 )
		}
		return canlen
	}


	
	additem( item ,nav )
	{
		var _i	=nav.length - 1

		var ret	=nav[_i-1].stck2cnt( this ,nav ,_i-1 )	

		var msg	=ret.newcnt.additem( item )

		if( ! msg )	msg	=new AddMsg()

		msg.newcntid	=ret.newcnt.id

		msg.pushed2loc	=ret.pushed2loc

		return msg
	}


	spawncnt()
	{
		this.del( 1 )

		return this.gCnt()
	}



	gCnt()	{return this.constructor.Cnt }


	// gLive()	{return this.constructor.Live }
}


///////////////////////////////////////////////////////////////////////////////


class LiveStackCnt
{

}