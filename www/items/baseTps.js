import Item from "../shared/items/Item.js"

import newBlock from "../shared/items/newBlock.js"

import Stack from "./Stack.js"
// import newStack from "../shared/items/newStackable.js"

import newOrg	from "../shared/items/newOrganics.js"
import newStCnt from "../shared/items/newStackCnt.js"

import Cnt	from "./Cnt.js"
// import newInv   from "../shared/items/newInv.js"
// import newCnt from "../shared/items/newContainer.js"

import newSoft from "../shared/items/newSoft.js"
import newHard from "../shared/items/newHard.js"
import newBag from "../shared/items/newBag.js"

import newSlot from "./newInvSlot.js"



// var Item	=newIt()

export const Block	=newBlock( Item )
	
// export const Stack    =newStack( Item )

export{ Stack }

export const Organic	=newOrg( Stack )
	
export const StackCnt	=newStCnt( Stack )

// const Cnt    =newCnt( newInv( Item ))

const ShBag	=newBag(Cnt)
	
export const Bag	=newSoft(ShBag)
	
export const Box	=newHard(ShBag)

const Slot	=newSlot(Cnt)
	
export const SoftRcpt	=newSoft(Slot)
	
export const HardRcpt	=newHard(Slot)