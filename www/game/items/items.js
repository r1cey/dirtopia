import * as cls from "./classes.js"

import newitems from "../shared/items/newitems.js"



var its	=newitems( cls )

its.belt	=class	extends its.belt
{
	static hinv_pth	=this.key

	static size	=[5,2]
}

its.seedbag	=class	extends its.seedbag
{
	static size	=[2,2]
}

its.multi	=class extends its.multi
{
	static size	=[3,1]
}


/*
its.Dewd	=mixin([ sh_its.Dewd ,Item ],class
{
} )*/



export default its