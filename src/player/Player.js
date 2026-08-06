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

				// this.srv?.send( "plmov" ,this ,oldloc )

				this.cl.send( "clplmov" ,dir )
			}
	}*/


	///////////////////////////////////////////////////////////////////////////



	/*constructor( plmsg, game )
	{
		super( plmsg )
	}*/


	///////////////////////////////////////////////////////////////////////////



	srv()	{return this.pls.game.server }


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


	/** Sends map shift. */

	mov( dir )
	{
		const pl	=this

		const{ loc }	=pl
		
		/** Technically, I can change loc directly here
		 * since super.mov should move there regardless of anything */
		super.mov( scrloc.s(pl.loc).neighh(dir) )

		pl.cl?.send( "shiftmap" ,dir )	

		// this.srv?.send( "plmov" ,this ,oldloc )
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

	this.game.srv?.sendplvis( this ,"plconn" ,[ this ,true ])
}*/


/*
Player.prototype. clclosed	=function()
{
	this.srv?.cls.del( this.name )

	this.cl	=null

	this.srv?.send.plconn( this )
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

	pl.srv?.send_plclimb( pl, hdir )*/
}



Player.prototype. rotobj	=function( loc ,dir ,obj )
{
	obj.dir	=dir

	this.srv?.sendvis( loc ,["rotobj" ,[loc, dir ,obj.constructor.key ]])
}


Player.prototype. actonobj	=function( path, act, params )
{
	if( obj[act]( ...params ) )

		this.srv?.send_plactonobj( this, loc, objkey, act, params )
}

/*
Player.prototype. additem	=function( item, len )
{
	var addl	=ShPl.prototype.additem. call(this, item, len )

	if( addl )
	{
		this.cl?.send( "setclplitem" ,[ item ,addl ])

		this.srv?.sendplvis( this ,"setplitem" ,[ this ,item ,addl ])
	}
	return addl
}


Player.prototype. additemcnt	=function( path ,item ,len )
{
	var addl	=ShPl.prototype.additemcnt. call(this, path ,item, len )

	/** @todo Check if any other circumstance pl.cl can be 0 and the check would return true *

	if( addl )	this.cl?.send("setplitemcnt" ,[ this ,path ,item ,addl ])

	return addl
}


/** From/To root is either a player or map location.
 * from|to{ loc, pln, boxes[str] } *

Player.prototype. movitem	=function( from, item, len, to )
{
	/** @TODO !!! : check that to and from are viable *

	var{ game ,loc }	=this

	if( from.loc().disth( loc ) > 1 || to.loc().disth( loc ) > 1 )
	{
		return false
	}
	return game.movitem( from ,item ,len ,to ,this )


	// ShPl.prototype.movitem. call(this, fromcnt, itemid, len, tocnt )
		

}*/


/*Player.prototype. cl_send	=function( msg )
{
	this.cl.send( JSON.stringify(msg) )
}*/


/** Supply the object dict of players to search in! */


Player.prototype. forseenpls	=function( pls, fun )
{
	for(var n in pls)
	{
		if( pls[n].seespl( this ))	fun( this, pls[n] )
	}
}
/*
Player.prototype. forisseencls	=function( fun )
{
	var pl	=this

	pl.game.srv.forcls(( cl2 )=>
	{
		if( cl2.pl.seespl(pl) )	fun( cl2, pl )
	})
}
*/
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
	var oldlvl	=this.water

	lvl	=ShPl.prototype. setwater.call(this, lvl )

	oldlvl !== lvl && this.cl && this.cl.sendjson([ "plwater" ,[ lvl ]])
}


Player.prototype. setheat	=function( lvl )
{
	var oldlvl	=this.heat

	lvl	=ShPl.prototype. setheat.call(this, lvl )

	oldlvl !== lvl && this.cl && this.cl.sendjson({ plheat: lvl })
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