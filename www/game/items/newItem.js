import ShIt	from "../shared/items/Item.js"
import newGObj from "../newGameObj.js"
import newInvO from "../newInvObj.js"
import newGridO from "../newGridObj.js"

import Cl	from "../Client.js"



export default( Base =newGridO(newInvO(newGObj(ShIt))))=>class Item extends Base
{
	static imgmap

	static img



	draw( can, lov, vbuf )
	{
	}



}
