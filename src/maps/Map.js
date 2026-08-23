import ShMap	from "../../www/shared/maps/Map.js"

import Obj	from "./Obj.js"

import * as fs	from '../fs.js'

import Pl	from '../player/Player.js'

import Loc	from "../../www/shared/Loc.js"

import newBo	from "../../www/shared/maps/newBoard.js"
import newBinMShift	from "../../www/shared/maps/newBinMapShift.js"


/** Adds reading and saving functionality to the map.
 * 
 * Also method for creating "shiftboard" for when a player moves and needs
 * new cells sent. */

export default class Map extends ShMap
{
	/** Used when saving and reading map files.
	 * Define in derived classes.
	@static	@var name */

	static Obj	=Obj



	/*constructor( maps )
	{
		super( maps ,Obj )
	}*/


	/** When saved, some object data is saved separately from map obj data.
	 * We need to make and return a list of these objects so we don't need
	 * to look for them again later.
	 * Also note that because map location is stored in binary data,
	 * we need to add the height to locations read from obj data.
	 * Returns nothing if binary data was not loaded.
	 * @return {{pls:ReadPlLoc[]}|undefined} */

	async load( dir ="" )
	{
		const pa	=dir + this.constructor.name

		const[ buf ,objres ]	=await Promise.all([
			
			fs.readbuf( pa+".bin" ), this.obj.read( pa )])

		if( buf )
		{
			console.log('Has read bin map: '+this.constructor.name )

			this.setbuf( buf )

			const loc	=this.getloc()

			for(let plval of objres.pls )
			{
				plval[1].h	=loc.h
			}
			return objres
		}
	}



	async save( dir ="")
	{
		var pa	=dir+this.constructor.name

		var buf	=this.bin.getbuf()

		var proms	=[]

		if( buf )	proms[0]	=fs.savebuf( pa+'.bin', buf )

		proms[1]	=fs.savejson( pa+'.json' , this.obj.o ,( key, val )=>
			{
				switch( key )
				{
					case 'pl' :

						return val.name
				}
				return val
			})

		return await Promise.allSettled( proms )
	}
}

///////////////////////////////////////////////////////////////////////////



Map.prototype. set_	=function( name, loc, ...vals )
{
	this["set"+name]( loc, ...vals )

	this.game?.server?.sendvis( loc ,"mapset_" ,[ this, name, loc, vals ])
}


/** @arg name	-Name of the set method. "_i" will be added automatically */

Map.prototype. set_ic_	=function( name, ic, loc, ...vals )
{
	this["set"+name+"_i"]( ic, ...vals )

	this.game?.server?.sendvis( loc ,"mapset_" ,[ this, name, loc, vals ])
}



Map.prototype. newshiftboard	=function( loc, r, dir )
{
	var Map	=this.constructor

	var cellslen	=(r << 1) + 1

	var bo	=new Map.MapShiftBo( cellslen, loc, r, dir )

	var ic	=0

	bo.obj.length	=cellslen

	this.fordiredge(( v )=>
	{
		bo.bin.setcell( ic, this.gbincell( v ))
		
		bo.obj[ic]	= this.obj.get(v)

		ic ++

	},	dir, r, loc)

	return bo
}


///////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////


class Grid
{

}


Grid.prototype. make	=function( r )
{
	
}