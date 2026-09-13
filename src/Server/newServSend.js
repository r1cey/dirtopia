// import NS from '../../www/shared/NSpace.js'

import Loc from "../../www/shared/Loc.js"



export default( Base )=>class SrvSend	extends Base
{

///////////////////////////////////////////////////////////////////////////////


/** @arg {string} act 
 * @arg {array} vals */
/*
out. mapset_	=function( map, act, loc, vals )
{
	for(var n in this.cls.o )
	{
		var cl	=this.cls.o[n]

		if( cl.pl.sees( loc ))
		{
			cl.send("mapset_", map, act, loc, vals )
		}
	}
}

	///////////////////////////////////////////////////////////////////////////

}
