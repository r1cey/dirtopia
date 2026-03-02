import It from "../shared/items/Item.js"
import newIt from "./newItem.js"
import newHold from "../shared/newHolder.js"
import newInv from "../shared/items/newInv.js"
import newCnt from "../shared/items/newContainer.js"

import newGObj from "../newGameObj.js"
import newInvO from "../newInvObj.js"
import newGridO from "../newGridObj.js"
import newDHold from "../newDictHolder.js"



export default class Cnt extends newCnt(newDHold(newInv(newHold(newIt(newGridO(newInvO(newGObj(It))))))))
{
	static fromJSON( val )
	{
		var obj	=super.fromJSON( val )

		if( ! obj.id )
		{
			for(var id in obj )
			{
				obj[id]	=super.fromJSON( obj[id] )
			}
		}
		return obj
	}
}