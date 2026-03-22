import Item from "./Item.js"

import newBlock from "../shared/items/newBlock.js"

import Stack from "./Stack.js"

import newOrg	from "../shared/items/newOrganics.js"
import newStCnt from "../shared/items/newStackCnt.js"

import Cnt	from "./Cnt.js"

import newSoft from "../shared/items/newSoft.js"
import newHard from "../shared/items/newHard.js"
import newBag from "../shared/items/newBag.js"
import newSlot from "../shared/items/newInvSlot.js"



// var Item	=newIt()

export const Block	=newBlock(Item)
	
export{ Stack }

export const Organic	=newOrg( Stack)
	
export const StackCnt	=newStCnt(Stack)

const ShBag	=newBag(Cnt)
	
export const Bag	=newSoft(ShBag)
	
export const Box	=newHard(ShBag)

const Slot	=newSlot(Cnt)
	
export const SoftRcpt	=newSoft(Slot)
	
export const HardRcpt	=newHard(Slot)


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