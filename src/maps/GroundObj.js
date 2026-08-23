import Obj from "./Obj.js"

import Loc from "../Loc.js"


/** Unique because it needs to read the player spawn array */

export default class GroundObj extends Obj
{
	constructor( ...args )
	{
		super( ...args )

		const spawns	=this.jrev.userd.spawns	=[]

		this.jrev.add(
		{
			key :"spawns"
			,
			fromJSON :( arr )=>
			{
				for(var loca of arr ) spawns.push(Loc.setj(loca) )

				return
			}
		})
	}


	/** @return {{pls:{[plname:string]:Vec}, spawns:Loc[]}} *

	async read( path  )
	{
		return super.read( path )
	}*/
}