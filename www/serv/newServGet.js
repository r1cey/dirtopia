import Loc from '../shared/Loc.js'

// import Pl from './Player.js'

import Maps	from '../maps/Maps.js'


/********
	FRIENDLY REMINDER THAT ALL MESSAGES WILL COME AFTER JSON REVIVER!

	Also, these methods will be called with Server inst. as "this".
* ***/

export default{

	/** Player with name doesn't exist and needs to be created. */

	createpl( name)
	{
		// this.cl.ui.newplcreate( name ,this )

		this.cl.ui.setpage( "createpl" ,this ,name)
	}
,

	///////////////////////////////////////////////////////////////////////////////



	/** This is your player. */

	setclpl( plmsg )
	{
		// debugger

		console.log(plmsg)
		

		this.cl.setpl( plmsg )
	}
,


	/** This is what you see.
	* @arg msg
	* @arg o.loc
	* @arg o.r
	* @arg {obj} o.obj	-{gr, tr}
	*/

	setmap([ obj, loca, r ])
	{
		this.buf.addobj( obj, new Loc().setj(loca), r )
	}
	

	/**	This are the units that you see. 
	* @arg o
	* @arg	o.r
	* @arg {PlVis[]} o.pls
	*

	on. units	=function( o )
	{
		for(var i=0;i<o.pls.length; i++)
		{
			this.cl().genevispl(o.pls[i], true )
		}
	}*/

	,
	act([ nava ,actk ,arg ,testres ])
	{
		const nav	=this.cl.newnav( nava )

		if( nav.error >= 0 )
		{
			return	console.error( "Srvr.onact: bad nav" ,nava )
		}
		const obj	=nav.last()

		const act	=obj.gact( actk )

		if( !act )
		{
			return console.error( "Srvr.onact: no act" ,nava ,actk )
		}
		act[1].call( obj ,nav ,this.cl.pl ,arg ,testres )
	}
 
	,
	actpl([ plname ,nava ,actk ,arg ,testres ])
	{
		const nav	=this.cl.newnav( nava )

		if( nav.error >= 0 )
		{
			return	console.error( "Srvr.onact: bad nav" ,nava )
		}
		const obj	=nav.last()

		const act	=obj.gact( actk )

		if( !act )
		{
			return console.error( "Srvr.onact: no act" ,nava ,actk )
		}
		const pl	=this.cl.pls.g(plname)

		if( ! pl )	return console.error( "Srvr.onact: no pl" ,plname )

		act[1].call( obj ,nav ,pl ,arg ,testres )
	}

	///////////////////////////////////////////////////////////////////////////////

	,
	/** Received a map changing method
	* @arg mapid
	* @arg act	-method name
	* @arg loca
	* @arg {array}	vals */
	
	mapset_([ mapid, loca, act, vals ])
	{
		const map	=this.cl.maps.fromid( mapid )

		const loc	=Loc.setj(loca)

		if( map !== this.cl.maps.loc2map( loc ))
		{
			console.error("srv.mapset_", act, loc, vals )
		}
		map["set"+act]( loc, ...vals )
	}
	
	
	///////////////////////////////////////////////////////////////////////////////
	
	, 
	/** Player walks there */

	mov( desta )
	{
		const{ pl }	=this.cl

		const dest	=Loc.setj(desta)

		pl.mov( dest )

		const mba	=pl.movbuf.a

		if( mba[0]?.eq(dest) )
		{
			mba.shift()
		}
		else
		{
			pl.forcemov( dest )
		}
	}
	
	,
	movrej([ desta ,loca ])
	{
		const{ pl }	=this.cl

		const dest	=Loc.setj(desta)

		const mba	=pl.movbuf.a

		if( mba[0].eq(dest) )
		{
			mba.shift()

			if( ! mba.length )	pl.forcemov( dest.setj(loca) )
		}
		else
		{
			console.error( "movrej" ,dest ,mba )

			pl.forcemov( dest.setj(loca) )
		}
	}


	,
	plset([ prop ,val ])
	{
		this.cl.pl[prop]	=val
	}

,
	/** A visible player moved.
	* If it was seen before, only need name.
	* Otherwise get info on new player.
	* @arg	o
	* @arg	{PlVis}	[o.pl]	- must have old location
	* @arg	o.loc
	* @arg [o.name]
	*/

	plmov( o )
	{
		var vispls	=this.srv.cl.vispls

		var plvis

		if(o.name)
		{
			plvis	=vispls[o.name]

			if( ! plvis )
			{
				this.con().log( 'ERROR [5469]')
				return
			}
		}
		else if(o.pl)
		{
			plvis	=this.cl().newvispl( o.pl )
		}
		else
		{
			this.con().log('ERROR [5470]')
			return
		}

		plvis.dest.setj(o.loc)
	}
,
	/** Player changed connection status.
	*@arg	o
	*@arg	o.name
	*@arg	o.cl
	*/

	plconn( o )
	{
		var cl	=this.cl()

		var name	=o.name

		if( o.cl )
		{
			cl.genepcl( name, true )
		}
		else
		{
			cl.delpcl( name )
		}
	}
,
	/** New player was created. */

	newpl( pl2visa )
	{
		var pl2vis	=new Pl.Vis(pl2visa, true, this.srv.cl )

		this.srv.cl.vispls[plvis.name]	=pl2vis

		this.srv.cl.peercls[plvis.name]	=pl2vis.cl

		return pl2vis	//why??
	}
,
	/** Receive WRTC messages from another client through the server.
	* @arg	o
	* @arg	o.name	- name of the sending player
	* @arg o.msg
	* @arg	[o.msg.offer]
	* @arg	[o.msg.answer]
	* @arg	[o.msg.icecandi]
	*/

	async wrtc( o )
	{
		var pcl	=this.cl().genepcl( o.name, false )

		var msg	=o.msg

		if( msg.offer )
		{
			var answer	=await pcl.getanswer( msg.offer )

			o.msg	={ answer }

			this.srv.s.wrtc( o )
		}
		else if( msg.answer )
		{
			pcl.onanswer( msg.answer )
		}
		else if( msg.icecandi )
		{
			pcl.onicecandi( msg.icecandi )
		}
	}
,


	/** @arg o.newloc
	* @arg o.dir
	*/

	clplclimb( o )
	{
		var pl	=this.cl.pl

		var{ loc, pos, dest }	=pl

		var newloc	=o.newloc

		if( loc.x !== newloc[0] || loc.y !== newloc[1] )
		{
			console.log( `Reset pl map` )
		}

		var desth	=o.dir	? 1	: 0

		loc.h	=desth
		dest.h	=desth
		pos.h	=desth
	}
,
	///////////////////////////////////////////////////////////////////////////


	/** len can be len or id */

	itemmov({ from ,len ,to ,mover ,newcnt ,pushed2loc ,slotnewcnts })
	{
		// debugger

		const{ cl }	=this

		from	=cl.newnav( from )

		to	=cl.newnav( to )

		if( from.error >= 0 || to.error >= 0 )
		{
			console.error( "itemmov" ,from ,to )

			return
		}
		const item	=from.last()

		mover	=cl.pls.g(mover)

		if( pushed2loc )	pushed2loc	=Loc.setj( pushed2loc )

		cl.movitem( from ,len ,to ,mover ,newcnt ,pushed2loc ,slotnewcnts )
	}

	/*rotobj( loca ,key ,dir ,pln )
	{
		var{ cl }	=this

		var loc		=new Loc().setj(loc)

		/**@todo if item moved, fix it *

		var item	=cl.maps.loc2map(loc).obj.g(loc)[key]

		item.rot( dir )
	}*/


	/** { loc, key, act, params } */
,
	actonobj( o )
	{
		var map	=this.cl.maps.loc2map( o.loc )

		map.obj.g(o.loc)[o.key][o.act]( ... o.params )
	}


	,
	error( actid ,msg )
	{
		this.acts.del( actid )

		if( msg )	console.error( "error" ,msg )
	}


	/** As player moves, new map information is sent.
	* @arg {Object}	msg
	* @arg			msg.loc	- new location
	* @arg 			msg.r	- radius of visible map
	* @arg 			msg.dir	- direction of movement
	* @arg {Object} msg.obj
	* @arg {Array}	msg.obj.gr	- cells in order, empty cells are empty entries
	* @arg {Array} 	msg.obj.tr */
	,
	shiftmap([ obj, loca, r, dir ])
	{
		this.buf.addobj( obj ,new Loc().setj(loca) ,r ,dir )
	}
}

///////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////


/*
class Mapbuf
{
	srv

	loc

	r

	bins	=[0,0]
	objs	=[0,0]


	constructor( srv )
	{
		this.srv	=srv
	}
}


/** @return {bool} *

Mapbuf.prototype. add	=function( loc, r )
{
	if( this.loc )
	{
		if( ! this.loc.eq(loc) )
		{
			console.error( `Mapbuf.add(${loc},${r})`)

			return false
		}
	}
	else
	{
		this.loc	=loc
	}
	if( this.r )
	{
		if( ! this.r === r )
		{
			console.error( `Mapbuf.add(${loc},${r})`)

			return false
		}
	}
	else
	{
		this.r	=r
	}
	return true
}


Mapbuf.prototype. isready	=function()
{
	for(var val of this.bins )
	{
		if( ! val )	return false
	}
	for(var val of this.objs )
	{
		if( ! val )	return false
	}

	this.srv.cl.setmaps( this.bins[0], this.objs[0],
							this.bins[1], this.objs[1] )

	return true
}


///////////////////////////////////////////////////////////////////////////////



class Mapshbuf extends Mapbuf
{
}


///////////////////////////////////////////////////////////////////////////////



/*for(var funn in get)
{
	get["on_"+funn]	=get[funn]

	delete get[funn]
}*/