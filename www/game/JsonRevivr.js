import JRev	from "../shared/JsonRevivr.js"

import Pl from "./player/Player.js"
import Hands from "./player/Hands.js"
import its from "./items/items.js"

export default class extends JRev
{
	cl



	constructor( cl )
	{
		super()

		this.cl	=cl

		this.addo( its )//.adda([ Pl ,Hands ])
	}


	/*revivr( key, val ,str )
	{
		var inst	=super.revivr( key ,val ,str )

		if( this.ifaces[key]?.isroot )	inst.dad	=this.cl

		return inst
	}*/
}