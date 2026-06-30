// import Box	from "./Box.js"
import Hands from "../../shared/player/Hands.js"

import newGObj from "../newGameObj.js"
import newInvO from "../newInvObj.js"
import newGridO from "../newGridObj.js"

import V from "../../shared/Vec.js"


export default class Ha extends newGridO(newGObj( Hands ))
{
	static size	=new V(5,5)


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