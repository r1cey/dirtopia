import newJR	from "./shared/newJsonRevivr.js"

// import Pl from "./player/Player.js"
// import Hands from "./player/Hands.js"
import itTps from "./items/itemTps.js"


/** Adds item types to the JSON reviver */

export default newJR( undefined ,function(){ this.addo( itTps)})


/*
export default class extends newJR
{
	cl



	constructor( cl )
	{
		super()

		this.cl	=cl

		this.addo( itTps )//.adda([ Pl ,Hands ])
	}


	/*revivr( key, val ,str )
	{
		var inst	=super.revivr( key ,val ,str )

		if( this.ifaces[key]?.isroot )	inst.dad	=this.cl

		return inst
	}*/
}