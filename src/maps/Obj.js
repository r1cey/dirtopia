import ShObj	from "../../www/shared/maps/Obj.js"

import * as fs	from '../fs.js'

import Loc from "../../www/shared/Loc.js"
// import items from "../itemTps.js"
import JRev from "../JsonRevivr.js"





export default class Obj extends ShObj
{
	static jrev	=new JRev().add(
		{
			key :"spawns"
			,
			fromJSON :( arr )=> arr.map(( val )=> new Loc().setj(val) )
		}		
	)

	/*constructor( ...args )
	{
		super( ...args )
	}*/
}


/** If successful, returns {[plname]:loc} */

Obj.prototype. read	=async function( path )
{
	const{ map }	=this

	const pllocs	={}

	const h	=this.map.getloc().h

	const o	=await fs.readjson( path+'.json', ( key, val )=>
	{
		if( val?.pl )
		{
			pllocs[ val.pl ]	=new Loc().setvstr( key ,h )

			return val
		}
		else	return this.constructor.jrev.revivr( key, val )
	} )
	if( ! o )	return

	console.log( `Have read map obj file: ${this.map.constructor.name}`)

	this.o	=o

	return pllocs
}


///////////////////////////////////////////////////////////////////////////////



Obj.prototype. newitem2cell	=function( loc ,item )
{
	ShObj.prototype.newitem2cell. call(this ,loc, item )

	this.map.game
}