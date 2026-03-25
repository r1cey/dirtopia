import newStack from "./newStackable.js";

// import newLive	from "../newLiveObj.js"

import { AddMsg } from "../Msgs.js";



export var suffix	="_vc"



export default( Base =newStack() )=>class SC	extends Base
{
	/**@static
	@var Cnt	*/

	static suffix	=suffix

	get isstcnt()	{return true }

	// static Live	=newLive( LiveStackCnt )



	/*constructor( ...args )
	{
		super( ...args )
	}*/




	canadditem( item ,len ,nav )
	{
		var canlen	=this.gCnt().canadditem( item.gkey() ,len )

		if( canlen > 0 && nav.at(-2).canchildadd )
		{
			canlen	=nav.at(-2).canchildadd( item ,canlen ,nav ,nav.length - 2 )
		}
		return canlen
	}


	
	additem( item ,nav ,msg )
	{
		var _i	=nav.length - 1

		var ret	=nav[_i-1].stck2cnt( this ,nav ,_i-1 ,msg )

		var msg	=ret.newcnt.additem( item )

		return msg	? Object.assign( msg ,ret )	: new AddMsg( ret )
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