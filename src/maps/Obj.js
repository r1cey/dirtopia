import ShObj	from "../../www/shared/maps/Obj.js"

import * as fs	from '../fs.js'

import Loc from "../../www/shared/Loc.js"
// import items from "../itemTypes.js"
import JRev from "../JsonRevivr.js"


/** Adds method for reading map json file. */

export default class Obj extends ShObj
{
	static jrev	=new JRev()

	static
	{
		/** Storing player locations as we encounter them.
		 * Player data is stored in separate files. */
		this.jrev.userd	=
		{
			pls	:{}
		}
		this.jrev.oncheck.push( this.onjsonrevive )
	}



	/*constructor( ...args )
	{
		super( ...args )
	}*/


	/** Look for Map.read
	 * @return {{pls:{[plname:string]:Vec}}} */

	async read( path  )
	{
		const{ map }	=this

		const ret	=
		{
			pls	:{}
		}
		const h	=map.getloc().h

		const o	=await fs.readjson( path+'.json' ,( key ,val )=>
		{
			if( val?.pl )
			{
				ret.pls[ val.pl ]	=new Loc().setvstr( key ,h )

				return val
			}
			else	return jrev.revivr( key, val )
		} )
		if( ! o )	return

		console.log( `Have read map obj file: ${this.map.constructor.name}`)

		this.o	=o

		return ret
	}


	///////////////////////////////////////////////////////////////////////////////



	newitem2cell( loc ,item )
	{
		super.newitem2cell( loc, item )

		this.map.game
	}
}

///////////////////////////////////////////////////////////////////////////////

