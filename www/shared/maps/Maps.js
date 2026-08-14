import Loc from "../Loc.js"

import LocC	from "../LocCell.js"

import newPatha from "../newPathable.js"


/** Maps holds all of the map data.
 * 
 * At the moment, there are only two maps.
 * One for the ground. And one for the tree level.
 * 
 * Is used as root for Nav paths. */


export default class Maps	extends newPatha()
{
	game

	ground	=new this.constructor.Ground( this )
	
	get gr()	{return this.ground }

	trees	=new this.constructor.Trees( this )

	get tr()	{return this.trees }

	/** When getting map obj from JSON, save certain locations here */

	jsonlocs	=
	{
		pl	:{}
	}


	/** Define in derived
	@static
	@var Ground */

	/** Define in derived
	@static
	@var Trees */


	constructor( game )
	{
		super()
		
		this.game	=game
	}



	setpl( pl )
	{
		var loc	=this.jsonlocs.pl?.[pl.name]

		if( loc )	pl.loc.set( loc )

		else loc	=pl.loc

		const map	=this.loc2map( loc )

		var cell	=map.obj.g(loc)

		const ismatch	=cell?.pl === pl.name

		if( ! ismatch )
		{
			loc	=map.getloc4pl( pl.loc ,pl )

			cell	=map.obj.s(loc)

			pl.loc.set(loc)
		}
		cell.pl	=pl

		return ismatch
	}



	movobjp( from ,key ,to )
	{
		const prop	=this.loc2map(from).obj.del( from ,key )

		this.loc2map(to).obj.set( to )[key]	=prop

		return prop
	}

	pmsg2obj( locj )	{return LocC.setj( locj )}


	toJSON()	{return undefined }

	tonavmsg()	{return "maps" }
}


///////////////////////////////////////////////////////////////////////////



Maps.prototype. loc2map	=function( loc )
{
	return this.h2map( loc.h )
}


Maps.prototype. h2map	=function( h )
{
	return h	? this.tr	: this.gr
}

Maps.prototype. fromid	=function( id )
{
	if( id === this.gr.bin.constructor.id )	return this.gr

	if( id === this.tr.bin.constructor.id )	return this.tr

	console.error( "Maps.fromid", id )
}



Maps.prototype. isready	=function()
{
	return this.gr.ready() && this.tr.ready()
}



Maps.prototype. fore	=function( fun )
{
	if( fun( this.gr ))	return
	fun( this.tr )
}


/** @todo If item not found in location, find closest similar item. */

Maps.prototype. getitem	=function( loc )
{
	return this.loc2map(loc).obj.g(loc)?.item
}

Maps.prototype. gitem	=Maps.prototype.getitem


///////////////////////////////////////////////////////////////////////////////



Maps.prototype. canplmov	=function( dest )
{
	return this.loc2map( dest ).canplmov( dest )
}


///////////////////////////////////////////////////////////////////////////////



Maps.prototype. canpushitem	=function( loc )
{
	return this.loc2map( loc ).canpushitem( loc )
}



Maps.prototype. additem	=function( loc ,item )
{
	this.loc2map(loc).additem( loc ,item )
}



Maps.prototype. delitem	=function( loc ,item ,len )
{
	this.loc2map(loc).delitem( loc ,item ,len )
}



Maps.prototype. delpls	=function( pls )
{
	for(var[ pln ,plloc ] of pls )
	{
		delete this.loc2map(plloc).g(plloc).pl
	}
}



Maps.prototype. stck2cnt	=function( loc ,stck ,msg )
{
	return this.loc2map(loc).stck2cnt( loc ,stck ,msg )
}


///////////////////////////////////////////////////////////////////////////////