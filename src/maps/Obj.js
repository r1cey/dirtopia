import ShObj	from "../../www/shared/maps/Obj.js"

import * as fs	from '../fs.js'

import Loc from "../../www/shared/Loc.js"
// import items from "../itemTypes.js"
import JRev from "../JsonRevivr.js"


/** Adds method for reading map json file.
 * 
 * Server maps also sometimes have "spawns" object to tell where to
 * spawn new player. */

export default class Obj extends ShObj
{
	/*constructor( ...args )
	{
		super( ...args )
	}*/


	/** Look for Map.read
	 * @return {{pls:{[plname:string]:Loc}}} */

	async read( path )
	{
		const{ map }	=this

		const ret	=
		{
			pls	:{}
		}

		const h	=map.getloc().h

		const o	=await fs.readjson( path+'.json', ( key, val )=>
		{
			if( val?.pl )
			{
				pllocs[ val.pl ]	=new Loc().setvstr( key ,h )

				return val
			}
			else	return jrev.revivr( key, val )
		} )
		if( ! o )	return

		console.log( `Have read map obj file: ${this.map.constructor.name}`)

		this.o	=o

		return pllocs
	}


	///////////////////////////////////////////////////////////////////////////////



	newitem2cell( loc ,item )
	{
		super.newitem2cell( loc, item )

		this.map.game
	}
}

///////////////////////////////////////////////////////////////////////////////



const jrev	=new JRev().add(
{
	key :"spawns"
	,
	fromJSON :( arr )=> arr.map(( val )=> Loc.setj(val) )
})