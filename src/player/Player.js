import ShPl from '../../www/shared/player/Player.js'
import newISlot from '../items/newInvSlot.js'
import Hands from './Hands.js'

import V from '../../www/shared/Vec.js'
import Loc from '../../www/shared/Loc.js'

import * as fs	from '../fs.js'

// import items	from "../../www/shared/items/itemTypes.js"

// import items from '../itemTypes.js'
import JRev from "../JsonRevivr.js"


// var jsontr	=newjsontrans()


const scrloc	=new Loc()
const scrl2	=new Loc()

/*
const SrvPl	=(c) => class extends c
{
	constructor()
	{
		super()

		// delete this.loc
	}

	setwater( lvl )
	{
		ShPl.prototype.setwater. call(this, lvl )
	}
	subwater( lvl )
	{
		ShPl.prototype.subwater. call(this, lvl )
	}
}



class PlSlp extends SrvPl( ShPl.Vis )
{
	// water	=0.5

	constructor(o, json)
	{
		super()

		delete this.cl

		if(o)	this.set(o, json)
	}
}*/


const PlBase	=newISlot( ShPl )


export default class Player extends PlBase
{	
	static Hands	=Hands
	
	static jrev	=new JRev().add(
		{
			key :"cl" , fromJSON :()=> null
		}
	)
	/*static
	{
		this.dupacts()

		this.acts.mov	=
		[
			function test( nav ,pl ,desta )
			{
				const dest	=scrloc.setj( desta )

				const{ pl }	=this
		
				const{ loc }	=pl
		
				if( loc.eq( dest ))
				{
					return	[ false ,"Already there." ]
				}
				loc.forlineh( dest ,( loc2 )=>
				{
					return dest.set( loc2 )
				})
				return PlBase.acts.mov[0].call( this ,nav ,pl ,dest )
			},
			function run( nav ,pl ,desta )
			{
				// const orig	=Loc.set( this.loc )

				const dest	=scrloc.setj( desta )

				PlBase.acts.mov[1].call( this ,nav ,pl, dir )

				// this.gsrv()?.send( "plmov" ,this ,oldloc )

				this.cl.send( "clplmov" ,dir )
			}
	}*/


	///////////////////////////////////////////////////////////////////////////



	/*constructor( plmsg, game )
	{
		super( plmsg )
	}*/


	///////////////////////////////////////////////////////////////////////////



	gsrv()	{return this.pls.game.server }


	///////////////////////////////////////////////////////////////////////////


	static async read( dir ,name ,pls )
	{
		const pa	=dir+name+'.json'
	
		const plo	=await fs.readjson( pa, this.jrev.fn )
					
		if( ! plo )
		{
			console.error( "Error reading player: "+name )
	
			return false
		}
		return	new this( pls ).setj( plo )
	}


	///////////////////////////////////////////////////////////////////////////


	/** Sends map shift.
	 * @todo Sometimes it gets loc instead of dir because shared method gets
	 * loc. I don't know how to fix it.
	*/

	mov( dir )
	{
		const pl	=this

		const oldloc	=scrl2.s( pl.loc )

		var newloc

		if( dir.isloc )
		{
			newloc	=dir

			dir	=Loc.dirv2dirh( scrloc.s(newloc).subv(oldloc) )
		}
		else	newloc	=scrloc.s(oldloc).neighh(dir)

		super.mov( newloc )

		pl.cl?.send( "shiftmap" ,dir )

		this.gsrv()?.sendplvis2( oldloc ,newloc ,pl ,"plmov" ,newloc )
	}

	///////////////////////////////////////////////////////////////////////////
}



///////////////////////////////////////////////////////////////////////////////



Player.prototype. save	=async function( dir )
{
	var pa	=dir+this.name+'.json'

	await fs.savejson( pa, this )
}


/**  *

Player.prototype. conncl	=function( cl )
{
	this.cl	=cl

	cl.send("setclpl")

	cl.send("setmap")

	this.game.gsrv?.sendplvis( this ,"plconn" ,[ this ,true ])
}*/


/*
Player.prototype. clclosed	=function()
{
	this.gsrv()?.cls.del( this.name )

	this.cl	=null

	this.gsrv()?.send.plconn( this )
}*/


///////////////////////////////////////////////////////////////////////////////


/** I can presend location of tree to not look for it every time
 * @arg hdir	- true is up */

Player.prototype. climb	=function( hdir )
{
	/*var pl	=this

	var{ loc }	=pl

	var dest	=new Loc().set(loc)
	
	dest.h	=hdir	? 1	: 0

	var destmap	=pl.game.maps.loc2map( dest )

	if( ! destmap.canplmov( dest ))
	{
		pl.cl?.send.error( "Can't climb there" )

		return
	}

	var map	=pl.map()
	
	var tloc	=new Loc()

	for(var dir=0;dir<6;dir++)
	{
		if( map.climbable( tloc.set(loc).neighh(dir) ))
		{
			break
		}
	}
	if( dir === 6 )
	{
		pl.cl.send.error( `No tree to climb` )

		return
	}

	map.deloprop( loc, "pl" )

	loc.h	=dest.h

	destmap.scello(loc).pl	=pl

	pl.gsrv()?.send_plclimb( pl, hdir )*/
}



Player.prototype. rotobj	=function( loc ,dir ,obj )
{
	obj.dir	=dir

	this.gsrv()?.sendvis( loc ,["rotobj" ,[loc, dir ,obj.constructor.key ]])
}


Player.prototype. actonobj	=function( path, act, params )
{
	if( obj[act]( ...params ) )

		this.gsrv()?.send_plactonobj( this, loc, objkey, act, params )
}


/*
Player.prototype. disconn	=function()
{
	var pl	=this

	pl.cl	=0

	pl.forisseencls(( cl2 )=>
	{
		cl2.s.plconn( pl.name, false )
	})
}
*/

Player.prototype. setwater	=function( lvl )
{
	const oldlvl	=this.water

	lvl	=ShPl.prototype. setwater.call(this, lvl )

	oldlvl !== lvl && this.cl?.send( "plset" ,["water" ,lvl ])
}


Player.prototype. setheat	=function( lvl )
{
	const oldlvl	=this.heat

	lvl	=ShPl.prototype. setheat.call(this, lvl )

	oldlvl !== lvl && this.cl?.send( "plset" ,["heat" ,lvl ])
}


///////////////////////////////////////////////////////////////////////////////



Player.prototype. seesnavf	=function( nav )
{
	var cnt	=nav.last()

	/** @todo add method to nav  */

	if( this.sees( nav.loc() ))
	{
		if( cnt.iscell() || cnt.ischar() )	return true

		else	return cnt.viewing.has( this )
	}
	else	return false
}


Player.prototype. viewscnt	=function( cnt )
{
	/** @todo add these methods to all classes  */

	

}


///////////////////////////////////////////////////////////////////////////////


/*
Player. fromJSON	=function( val )
{
	var{ game }	=this

	var pl	=ShPl.fromJSON. call(this, val, game )

	game.pls.s( pl )

	return pl
}

/*Player. replacer	=function( key, val )
{
	switch( key )
	{
		case "cl" :	return val ? 1 : 0
		break
		case "game" :	return undefined
		break
		default:	return val
	}
}*/