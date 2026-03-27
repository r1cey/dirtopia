import newBlock from "../../www/game/shared/items/newBlock.js"

import newStack from "../../www/game/shared/items/newStackable.js"

import newOrg	from "../../www/game/shared/items/newOrganics.js"

import newStCnt from "../../www/game/shared/items/newStackCnt.js"

import Cnt from "./Container.js"

import newSoft from "../../www/game/shared/items/newSoft.js"

import newHard from "../../www/game/shared/items/newHard.js"

import newBag from "../../www/game/shared/items/newBag.js"

import newSlot from "./newInvSlot.js"



export const Block	=newBlock()

export const Stack	=newStack()

export const Organic	=newOrg( Stack )

export const StackCnt	=class extends newStCnt( Stack )
	{
		/** creates id */
		
		spawncnt()
		{
			return super.spawncnt().setuniq()
		}
	}

const ShBag	=newBag( Cnt )
	
export const Bag	=newSoft(ShBag)
	
export const Box	=newHard(ShBag)

const Slot	=newSlot( Cnt )

export const SoftRcpt	=newSoft(Slot)
	
export const HardRcpt	=newHard(Slot)