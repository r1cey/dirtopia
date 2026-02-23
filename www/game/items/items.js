import * as cls from "./classes.js"

import newitems from "../shared/items/newitems.js"

import V from "../shared/Vec.js"



var its	=newitems( cls )

its.belt	=class	extends its.belt
{
	static size	=new V(5,2)
}

its.seedbag	=class	extends its.seedbag
{
	static size	=new V(2,2)
}

its.multi	=class extends its.multi
{
	static size	=new V(3,1)
}


/*
its.Dewd	=mixin([ sh_its.Dewd ,Item ],class
{
} )*/



export default its