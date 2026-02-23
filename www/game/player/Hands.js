// import Box	from "./Box.js"
import Hands from "../shared/player/Hands.js"

import newGridObj from "../newGridObj.js"

import V from "../shared/Vec.js"


export default class Ha extends newGridObj( Hands )
{
	static size	=new V(5,5)
}