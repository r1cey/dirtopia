// import Box	from "./Box.js"
import Hands from "../shared/player/Hands.js"

import newHold from "../newHolder.js"


export default class Ha extends newHold( Hands )
{
	newhinv( plhinv )
	{
		return 	plhinv.hands	=super.newhinv( plhinv ,
		
			plhinv.el.getElementsByTagName("hands")[0]
		)
	}
}



Ha.prototype. attachhtmlinv	=function( htmlinv )
{
	this.htmlobj	=htmlinv.hands

	this.htmlobj.plobj	=this
}