import newStack from "./newStackable.js";

import newLive	from "../newLiveObj.js"
import { AddMsg } from "../Msgs.js";


/** Supposed to inherit from Stack */

export default( Base =newStack() )=>class SC
{
	/**@static
	@var Cnt	*/

	static suffix	="_vc"

	get isstcnt()	{return true }

	static Live	=newLive( LiveStackCnt )



	constructor( ...args )
	{
		super( ...args )
	}




	canadditem( item ,len ,nav ,_i )
	{
		return Math.min(
			
			this.gCnt().canadditem( item ,len )
			,
			nav.g(_i - 1).canchildadditem?.( item ,len ,nav ,_i - 1 ) || 0
		)
	}


	
	additem( item ,nav )
	{
		var _i	=nav.length - 1

		var ret	=nav.at(-1).stck2cnt( this ,nav ,_i - 1 )

		var msg	=ret.newcnt.additem( item )

		return msg	? Object.assign( msg ,ret )	: new AddMsg( ret )
	}



	gCnt()	{return this.constructor.Cnt }


	gLive()	{return this.constructor.Live }



	newcntlive( dad )
	{
		return this.gLive( new this.gCnt().setuniq() ,dad )
	}




	newlive( dad )
	{
		return new this.constructor.Live( this ,dad )
	}
}


///////////////////////////////////////////////////////////////////////////////


class LiveStackCnt
{
	canadditem( item ,len )
	{
		var{ _this ,dad }	=this

		return Math.min(
			
			_this.canadditem( item ,len )
			,
			dad.canchildadditem( this ,item, len )
		)
	}


	additem( item )
	{
		var{ _this ,dad }	=this

		// var livecnt	=new _this.newcntlive()

		this.del(1)

		dad.additem( new _this.newcnt().additem( item ))
	}
}