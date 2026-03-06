import It from "./Item.js"

import newHold from "../shared/newHolder.js"
import newInv from "../shared/items/newInv.js"
import newCnt from "../shared/items/newContainer.js"

import newDHold from "../newDictHolder.js"

import GridCnt from "../../GridCnt.js"



export default class Cnt extends newCnt(newDHold(newInv(newHold(It))))
{
	newgridel()
	{
		return super.newgridel( GridCnt )
	}
}