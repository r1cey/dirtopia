import newCnt from "../shared/items/newContainer.js"

import newGObj from "../newGameObj.js"
import newInvO from "../newInvObj.js"
import newGridO from "../newGridObj.js"
import newDHold from "../newDictHolder.js"



export default class Cnt extends newDHold(newIt(newGridO(newInvO(newGObj(newCnt())))))
{
	static fromJSON( val )
	{
		var obj	=super.fromJSON( val )

		if( obj.id )
		{
			obj.fore(( item )=>
			{
				item.dad	=obj
			})
		}
		else
		{
			for(var id in obj )
			{
				var inst	=obj[id]

				inst.fore(( item )=>
				{
					item.dad	=inst
				})
			}
		}
		return obj
	}
}