// import Box	from "./Box.js"
import Hands from "../shared/player/Hands.js"

import newGObj from "../newGameObj.js"
import newInvO from "../newInvObj.js"
import newGridO from "../newGridObj.js"

import V from "../shared/Vec.js"


export default class Ha extends newGridO(newInvO(newGObj(Hands )))
{
	static size	=new V(5,5)



	static fromJSON( val )
	{
		var inst	=super.fromJSON( val )

		if(inst.item )	inst.item.dad	=this

		return inst
	}
}