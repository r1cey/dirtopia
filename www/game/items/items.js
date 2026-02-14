import * as cls from "./classes.js"

import newitems from "../shared/items/newitems.js"



var its	=newitems( cls )

/*its.belt	=class	extends its.belt
{
	constructor(...args)
	{
		super( ...args )
		
		this.html
	}
}*/

its.seedbag	=class	extends its.seedbag
{
	attachhtmlinv( htmlinv )
	{
		this.htmlobj	=htmlinv.addseedbag( this )

		for(var itemn in this.o )
		{
			this.htmlobj.additem( itemn, this.o[itemn] )
		}
	}
} 



its.Dewd	=mixin([ sh_its.Dewd ,Item ],class
{
} )



export default its