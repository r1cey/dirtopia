// import Box	from "./Box.js"
import ShHands from "../shared/player/Hands.js"

import GridH	from "../ui/inv/GridHand.js"

// import V from "../shared/Vec.js"


export default class Hands extends ShHands
{

	

	///////////////////////////////////////////////////////////////////////////



	/*constructor( pl )
	{
		super( pl )		

		delete this.pl
	}*/


	///////////////////////////////////////////////////////////////////////////


	ui_newgridc( daddiv )
	{
		return new GridH( this ,daddiv )
	}


	///////////////////////////////////////////////////////////////////////////

	
/*
	static fromJSON( ...args )
	{
		const inst	=super.fromJSON( ...args )

		inst.item?.dad	=this

		return inst
	}*/
}