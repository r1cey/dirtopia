import newBlock from "../../www/game/shared/items/newBlock.js"

import newStack from "../../www/game/shared/items/newStackable.js"

import newOrg	from "../../www/game/shared/items/newOrganics.js"

import newStCnt from "../../www/game/shared/items/newStackCnt.js"

import Cnt from "./Container.js"

import newSoft from "../../www/game/shared/items/newSoft.js"

import newHard from "../../www/game/shared/items/newHard.js"

import newBag from "../../www/game/shared/items/newBag.js"

import newSlot from "../../www/game/shared/items/newInvSlot.js"


var cls	=
{
	"Block"	:newBlock()
	,
	"Stack"	:newStack()
}
cls.Organic	=newOrg(cls.Stack)
	
cls.StackCnt	=newStCnt(class extends cls.Stack
{
	/** creates id */
	
	spawncnt()
	{
		return super.spawncnt().setuniq()
	}
})

var Bag	=newBag(Cnt)
	
cls.Bag	=newSoft(Bag)
	
cls.Box	=newHard(Bag)

var Slot	=newSlot(Cnt)

cls.SoftRcpt	=newSoft(Slot)
	
cls.HardRcpt	=newHard(Slot)


export default cls