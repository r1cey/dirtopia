import ShHands	from "../../www/game/shared/player/Hands.js"

import{ AddMsg } from "../Msgs.js"



export default class Hands extends ShHands
{
	additem( item )
	{
		const droploc	=super.additem( item )

		if( droploc )
		{
			var msg	=new AddMsg()
			
			msg.pushed2loc	=droploc
		}
		return msg
	}
}
