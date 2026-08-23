import ShPls	from "../../www/shared/player/Players.js"
import Pl	from './Player.js'

import Loc	from '../../www/shared/Loc.js'

import * as fs from '../fs.js'

import itTps	from '../items/itemTypes.js'


/** Server side of Players handles saving and reading players from folder.
 * Also handles creation of new players game-wise. */

export default class Pls	extends ShPls
{
	conf	=
	{
		max	:1000
		,
		dir	:'./pls/'
	}


	static Player	=Pl


	/////////////////////////////////////////////////////////////////


	/*constructor( game )
	{
		super( game )
	}*/


	//////////////////////////////////////////////////////////////


	/** Build pls dir if doesn't exist.
	 * Throws error. */

	async init()
	{
		if( ! await fs.ensuredir( this.conf.dir ))
		{
			throw new Error( `Could not make pls dir: ${this.conf.dir}` )
		}
	}


	/**
	 * @arg {ReadPlLoc[]|undefined} pllocs -array of players and
	 * 	their locations to load.
	 * Players which couldn't be read are deleted from Maps.
	 * @return {ReadPlLoc[]} -array of players and their locations
	 * 	which couldn't be read. */

	async load( pllocs )
	{
		if( ! pllocs )	return

		const proms	=[]

		// const files	=await fs.readdir( this.conf.dir )

		for(var plval of pllocs )
		{
			proms.push( this.readpl( plval[0] ))
		}
		const pls	=await Promise.all( proms )

		const failed	=[]

		const maps	=this.gmaps()

		for(var i =0;i< pllocs.length ;i++)
		{
			const[ plk ,loc ]	=pllocs[i]

			const pl	=pls[i]

			if( ! pl )
			{
				console.error( "Couldn't read player: "+plk )

				failed.push( pllocs[i] )

				continue
			}
			pl.loc.set( loc )

			this.s( pl )
		}
		return failed
	}



	async readpl( name )
	{
		return this.constructor.Player.read( this.conf.dir ,name ,this )
	}


	/** As usual, updates both itself and maps.
	 * Gets starting location from map.
	 * Adds inventory items and map tools.
	 * @todo Put new players under a new tree once enough are created. */

	new( plmsg )
	{
		console.log( `Creating new player: ${plmsg.name}` )

		const map	=this.game.maps.gr
		
		const loc	=map.obj.o.spawns[0]

		plmsg.loc	=loc.toJSON()

		const pl	=super.new( plmsg )

		/** add starter items */
		{
			let belt	=new itTps.belt( 1 )
			
			belt.additem( new itTps.multi() )
			
			pl.additem( belt )

			let sbag	=new itTps.seedbag( 1 )
			
			sbag.additem( new itTps.cuc_seeds( 15 ))

			pl.additem( sbag )
		}
		pl.save( this.conf.dir )

		map.addstuff4newpl( pl.loc ,this.constructor.items.dewd )
		
		return pl
	}
}


/*
Pls.prototype. fillmissing	=async function()
{
	var names	=await fs.readdir( this.conf.dir )

	for(var name of names )
	{
		if( ! name.endsWith(".json") )
		{
			continue
		}
		name	=name.slice( 0 ,-5 )

		console.log( "test555: "+name )

		if( this.g(name) )
		{
			return
		}
		var pl	=await this.readpl( name )

		if( ! pl )	continue

		console.log( "Joining missing player: "+name )

		this.s( pl )
	}
}*/



Pls.prototype. rem	=function()
{
	return this.conf.max
}



Pls.prototype. save	=async function()
{
	var proms	=[]

	for(var name in this.o)
	{
		proms.push( this.o[name].save( this.conf.dir ) )
	}
	return await Promise.allSettled(proms)
}


///////////////////////////////////////////////////////////////////////////////

/*
Pls.prototype. newid	=function()
{
	for(var i=0; i<this.conf.max; i++)
	{
		if( ! this.arr[i]) return i + 1
	}
	return 0
}
*/


Pls.prototype. ismaxips	=function( ip )
{
	return this.game.srv.ismaxips.call(this, ip )
}
Pls.prototype. addip	=function( ip )
{
	return this.game.srv.addip.call(this, ip )
}


///////////////////////////////////////////////////////////////////////////////



Pls.prototype. getobj	=function( n )
{
	return this.g( n )
}


///////////////////////////////////////////////////////////////////////////////


/** @return - { err, pl } *

Pls.prototype. add	=function( pln, pl )
{
	console.log( `Adding new player: ${pln}.`)

	var game	=this.game

	var errs	=game.errs

	var pls	=this.o

	if( pls[pln] )
	{
		let err	=11

		console.log( errs[err], pln )

		return { err }
	}
	else if( this.ismaxips( pla.ip ) )
	{
		let err	=9

		console.log( errs[err], pla.ip )

		return {err}
	}
	else if( this.left() <= 0 )
	{
		let err	=8

		console.log( errs[err] )

		return {err}
	}

	let pl	=new Pl( pla, true )

	pls[pln]	=pl

	this.arr[this.newid]

	this.addip( pl.ip )

	return { pl }
}


Pls.prototype. forvispls	=function( pln, fun )
{
	var pl	=this.o[pln]

	this.fore(( n2, pl2 )=>
	{
		if( pl.seespl(pl2) )	fun( n2, pl2, pln, pl )
	})
}

Pls.prototype. setwater	=function( pln, num )
{
	this.game.srv.s.water( pln, this.o[pln].setwater( num ))
}
Pls.prototype. subwater	=function( pln, num )
{
	var water	=this.o[pln].subwater( num )

	this.game.srv.s.water( pln, water )
}

/** !!!newloc will be modified!!! */

Pls.prototype. mov	=function( pln, newloc, pl )
{
	var g	=this.game

	pl	??=g.pls.g(pln)

	var loc	=pl.loc

	if( pl.loc.eq( newloc )) return

	pl.loc.forlineh( newloc, (v)=>
	{
		newloc.set(v)

		return true
	})
	
	g.srv.plmoving( pln, newloc, pl )

	var dv	=newloc.c().subv(pl.loc)

	pl.loc.set(newloc)

	if( pl.cl )	g.srv.s.clplmov( pl.cl-1, V.dirv2dirh( dv ) )

	g.map.fore( ( v ) =>
	{
		if( game.map.water(v) )
		{
			pl.setwater( 1 )

			return true
		}
	}
	, 1, pl.loc )
}