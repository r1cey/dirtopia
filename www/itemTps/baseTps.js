import Item from "./Item.js"

import newBlock from "../shared/itemTps/newBlock.js"

import newUIO    from "../ui/newUIObj.js"

// import Stack from "./Stack.js"
import newStack from "../shared/itemTps/newStackable.js"

import newOrg	from "../shared/itemTps/newOrganics.js"
import newStCnt from "../shared/itemTps/newStackCnt.js"

// import Cnt	from "./Cnt.js"
import newInv   from "../shared/itemTps/newInv.js"
import newCnt from "../shared/itemTps/newContainer.js"

import newSoft from "../shared/itemTps/newSoft.js"
import newHard from "../shared/itemTps/newHard.js"
import newBag from "../shared/itemTps/newBag.js"

import newSlot from "./newInvSlot.js"



// var Item	=newIt()

export const Block	=newBlock( Item )
	
export const Stack    =newStack( Item )

export const Organic	=newOrg( Stack )
	
export const StackCnt	=newStCnt( Stack )

const Cnt    =newCnt( newInv( Item ))

const ShBag	=newBag(Cnt)
	
export const Bag	=newSoft(ShBag)
	
export const Box	=newHard(ShBag)

const Slot	=newSlot(Cnt)
	
export const SoftRcpt	=newSoft(Slot)
	
export const HardRcpt	=newHard(Slot)