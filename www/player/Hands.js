// import Box	from "./Box.js"
import ShHands from "../shared/player/Hands.js"

import newInvO from "../newInvObj.js"
// import newGridO from "../newGridObj.js"
import newUIO from "../ui/newUIObj.js"

import V from "../shared/Vec.js"


export default class Hands extends /*newGridO(*/ newUIO( ShHands )
{
	static
	{
		this.ui.gridsz	=new V(5,5)
	}


	///////////////////////////////////////////////////////////////////////////



	/*constructor( pl )
	{
		super( pl )		

		delete this.pl
	}*/


	///////////////////////////////////////////////////////////////////////////



	/*get pl()	{return this.dad }

	set pl( pl )	{ this.dad	=pl	}*/


	///////////////////////////////////////////////////////////////////////////

	
/*
	static fromJSON( ...args )
	{
		const inst	=super.fromJSON( ...args )

		inst.item?.dad	=this

		return inst
	}*/
}