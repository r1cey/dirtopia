import * as baseTps from "./baseTps.js"

import newitTps from "../shared/itemTps/newitemTps.js"

// import V from "../shared/Vec.js"



const itTps	=newitTps( baseTps )

setgridszs( itTps )



///////////////////////////////////////////////////////////////////////////////


function setgridszs( Tps )
{
	const szs   =
	{
		belt    :[5,2]
		,
		seedbag :[2,2]
		,
		multi   :[3,1]
	}
	for(var key in szs)
	{
		var It	=itTps[key]

		if( !It )	continue

		var sz	=szs[key] ?? It.iscnt ? [2,1] : [1,1]

		It.ui.gridsz	=new V( ...sz )
	}
}

/*
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
}*/


/*
its.Dewd	=mixin([ sh_its.Dewd ,Item ],class
{
} )*/



export default itTps