import newBlock from "../../www/shared/itemTps/newBlock.js"

import newStack from "../../www/shared/itemTps/newStackable.js"

import newOrg	from "../../www/shared/itemTps/newOrganics.js"

import newStCnt from "../../www/shared/itemTps/newStackCnt.js"

import Cnt from "./Container.js"

import newSoft from "../../www/shared/itemTps/newSoft.js"

import newHard from "../../www/shared/itemTps/newHard.js"

import newBag from "../../www/shared/itemTps/newBag.js"

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