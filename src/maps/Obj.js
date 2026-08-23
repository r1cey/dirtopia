import ShObj	from "../../www/shared/maps/Obj.js"

import * as fs	from '../fs.js'

import Loc from "../../www/shared/Loc.js"
// import items from "../itemTypes.js"
import newJRev from "../../www/shared/newJsonRevivr.js"
import JRev from "../JsonRevivr.js"


/** Adds method for reading map json file. */

export default class Obj extends ShObj
{
	jrev	=new (newJRev(JRev))()



	constructor( ...args )
	{
		super( ...args )

		/** Storing player locations as we encounter them.
		 * Because Player data is stored in separate files. */
		this.jrev.userd	=
		{
			pls	:[]
		}
		this.jrev.oncheck.push( this.constructor.onjsonrevive )
	}


	/** Look for more info at Map.read
	 * @return jrev.userd object if read properly */

	async read( path  )
	{
		const{ map }	=this

		const o	=await fs.readjson( path+'.json' , this.jrev.fn )

		if( ! o )	return

		console.log( `Have read map obj file: ${this.map.constructor.name}`)

		this.o	=o

		return this.jrev.userd
	}


	///////////////////////////////////////////////////////////////////////////////



	newitem2cell( loc ,item )
	{
		super.newitem2cell( loc, item )

		this.map.game
	}
}