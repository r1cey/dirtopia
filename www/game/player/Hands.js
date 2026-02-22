// import Box	from "./Box.js"
import Hands from "../shared/player/Hands.js"

import newHold from "../newHolder.js"


export default class Ha extends newHold( Hands )
{
	static size	=[5,5]



	newhinv( plhinv )
	{
		return super.newhinv( plhinv ,
		
			plhinv.el.getElementsByTagName("hands")[0]
		)
	}
}