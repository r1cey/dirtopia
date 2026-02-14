import HCnt from "../Cnt.js"

import PlInv	from "./inventory/main.js"



export default class HBelt extends HCnt
{
	constructor( dad ,el ,css ,gbelt )
	{
		super( dad ,el ,css ,gbelt )

		if( gbelt.inv.multi )
		{
			let multiel	=el.getElementsByTagName("multi")[0]

			multiel.appendChild( gbelt.inv.multi.newel() )
		}
		for(var id in gbelt.inv.seedbag )
		{
			
		}
		if( dad instanceof PlInv )
	}
}