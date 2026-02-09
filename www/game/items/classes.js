import newIt from "./newItem.js"

import newBlock from "../shared/items/newBlock.js"

import newStack from "../shared/items/newStackable.js"

import newOrg	from "../shared/items/newOrganics.js"

import newStCnt from "../shared/items/newStackCnt.js"

import newHold from "../newHolder.js"

// import newInv from "./newInv.js"
import newInv from "../shared/items/newInv.js"

import newCnt from "../shared/items/newContainer.js"

import newSoft from "../shared/items/newSoft.js"

import newHard from "../shared/items/newHard.js"

import newBag from "../shared/items/newBag.js"

import newSlot from "../shared/items/newInvSlot.js"


var Item	=newIt()

export var Block	=newIt(Item)
	
export var Stack	=newStack(Item)

export var Organic	=newOrg( Stack)
	
export var StackCnt	=newStCnt(Stack)

var Cnt	=newCnt(newInv(newHold(Item)))

var ShBag	=newBag(Cnt)
	
export var Bag	=newSoft(ShBag)
	
export var Box	=newHard(ShBag)

var Slot	=newSlot(Cnt)
	
export var SoftRcpt	=newSoft(Slot)
	
export var HardRcpt	=newHard(Slot)


/*var cls	=
{
	"Block"	:newBlock(Item)
	,
	"Stack"	:newStack(Item)
}
cls.Organic	=newOrg(cls.Stack)
	
cls.StackCnt	=newStCnt(cls.Stack)

var Cnt	=newCnt(newInv(Item))

var Bag	=newBag(Cnt)
	
cls.Bag	=newSoft(Bag)
	
cls.Box	=newHard(Bag)

var Slot	=newSlot(Cnt)
	
cls.SoftRcpt	=newSoft(Slot)
	
cls.HardRcpt	=newHard(Slot)


export default cls*/