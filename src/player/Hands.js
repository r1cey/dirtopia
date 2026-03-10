import ShHands	from "../../www/game/shared/player/Hands.js"

import{ AddMsg } from "../Msgs.js"



export default class Hands extends ShHands
{
	additem( item ,nav )
	{
		if( this.item )
		{
			var msg	=new AddMsg()
			
			msg.pushed2loc	=this.drop( nav.at(-2) )	
		}
		super.additem( item )

		return msg
	}


	drop( pl )
	{
		const loc	=pl.drop( this.item )

		super.delitem()

		return loc
	}
}
