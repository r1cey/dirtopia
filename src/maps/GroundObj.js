import Obj from "./Obj.js"

import Loc from "../Loc.js"


/** Unique because it needs to read the player spawn array */

export default class GroundObj extends Obj
{
	static
	{
		this.jrev.add({	key :"spawns" ,

			fromJSON :( arr )=> arr.map(( val )=> Loc.setj(val) )})
	}
}