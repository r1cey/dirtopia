// import Box	from "./Box.js"
import Hands from "../shared/player/Hands.js"

import newGObj from "../newGameObj.js"
import newInvO from "../newInvObj.js"
import newGridO from "../newGridObj.js"

import V from "../shared/Vec.js"


export default class Ha extends newGridO(newInvO(newGObj( Hands )))
{
	static size	=new V(5,5)


	///////////////////////////////////////////////////////////////////////////



	constructor( pl )
	{
		super( pl )		

		delete this.pl
	}


	///////////////////////////////////////////////////////////////////////////



	get pl()	{return this.dad }

	set pl( pl )	{ this.dad	=pl	}


	///////////////////////////////////////////////////////////////////////////

	

	static fromJSON( val )
	{
		var inst	=super.fromJSON( val )

		if( inst.item )	inst.item.dad	=this

		return inst
	}
}