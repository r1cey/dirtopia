// import NS from '../../www/shared/NSpace.js'

import items from "../items/itemTypes.js"

import Loc from '../../www/shared/Loc.js'



const scrloc	=new Loc()
const scrl2	=new Loc()



/** IF FUNCTION RETURNS TRUTHY VALUE, SAME MESSAGE WILL BE SENT BACK TO CLIENT
 * IF RETURN VALUE IS NOT BOOLEAN, IT WILL BE APPENDED TO THE MSG ARRAY */



// export default( Base =Object )=>class ClientGet extends Base
export default {



	///////////////////////////////////////////////////////////////////////////


	/** Player acted on an object.
	 * @arg msg	- [ nav[], actkey, arg ]	 */

	act( msga )
	{
		const[ nava ,actk ,arg ]	=msga

		const nav	=this.ggame().newnav( nava )

		if( nav.error >= 0 )
		{ 
			// this.send( "error" ,id ,"Couldn't parse nav" )

			return	console.error( "Client.onmsg: bad nav" ,nava )
		}
		const obj	=nav.last()

		const act	=obj.gact( actk )

		if( !act )
		{
			// this.send( "error" ,id ,"Couldn't find act" )

			return console.error( "Client.onmsg: no act" ,nava ,actk )
		}
		const testres	=act[0].call( obj , nav, this.pl ,arg )
				
		if( testres &&( !Array.isArray(testres) || testres[0] ))
		{
			const isdata =typeof testres !== "boolean"

			const res	=act[1].call(
				
				obj ,nav ,this.pl ,arg
				,
				isdata	? testres : undefined
			)
			if( isdata )	msga.push( testres )

			return true
		}
		/*else
		{
			testres && Array.isArray(testres) ?
			
				this.sendactrej( id ,testres[1] )
				:
				this.sendactrej( id )
		}*/
	}

	,
	/** Player wants to move on own accord */

	mov( desta )
	{
		const{ pl }	=this
		
		const{ loc }	=pl

		const dest	=scrloc.setj( desta )

		if( loc.eq( dest ))
		{
			/** @todo Some kind of error correction?? */

			console.warn( pl.name+".onmov: Already there." ,dest )

			/** Sending this because client still needs to clear
			 * movement queue */
			this.send( "mov" ,dest )
		}
		else if( loc.disth( dest ) > 1 || ! pl.canmov( dest ))
		{
			this.send( "movrej" ,[ dest ,loc ])

			/** @todo What happens with map shift if player
			 * is forced to move???	*/
		}
		else
		{
			pl.mov( Loc.dirv2dirh( scrl2.set(dest).subv(loc) ))

			this.send( "mov" ,dest )
		}
		/*loc.forlineh( dest ,( loc2 )=>
		{
			return dest.set( loc2 )
		})*/
	}
,

	mapshift( dir )
	{
		this.send( "clplmov" ,dir )
	},


	/** Relay WRTC message between clients through the server.
	 * @arg	o
	 * @arg	o.name	- name of the receiving player
	 * @arg {Object}	o.msg
	 */

	wrtc( o )
	{
		var cl2	=this.game.pls[o.name].cl

		if( !cl2 )	return

		let cl	=this.cl

		if( o.msg.offer )
		{
			if( cl2.rtcstate[cl.pl.name] === 1 )	return

			cl.rtcstate[cl2.pl.name]	=1

			cl2.rtcstate[cl.pl.name]	=2
		}

		o.name	=this.cl.pl.name

		cl2.s.wrtc( o )
	}
,
	dig( o )
	{
		var tool	=o

		this.game.dig( tool )
	}
/*

/** @arg o.dir	- true is up
 * @arg o.loc	- pl loc *

get. climb	=function( o )
{
	var pl	=this.pl

	var ploc	=pl.loc,	loca	=o.loc

	if( ploc.x !== loca[0] || ploc.y !== loca[1] )
	{
		console.error("climb: wrong pl loc given: "+pl.name )

		//send error to player

		return
	}

	pl.climb( o.dir )
}*/
,
	/**@todo Handle errors */

	movitem([ froma ,len ,toa ])
	{
		const{ game }	=this

		const from	=game.newnav( froma )

		if( from.error >= 0 )
		{
			console.error( "on_movitem" ,from )
			
			return
		}
		/*const item	=from.at(-1).getitem( key ,len$id )

		if( ! item )
		{
			console.error( "on_movitem" ,from ,key ,len$id )
			
			return
		}*/
		const to	=game.newnav( toa )

		if( to.error >= 0 )
		{
			console.error( "on_movitem" ,to )
			
			return
		}
		// const len	=item.iscnt	? 1	: len$id

		const lenadd	=to.last().canadditem( item ,len ,to )

		if( lenadd <= 0 )
		{
			console.error( this.pl.name+" on_moveitem" ,from ,len ,lenadd ,to )
			
			return
		}
		game.movitem( from ,lenadd ,to ,this.pl )
	}
,

	/**@todo Check that not rotating players on accident... */

	rotobj( loca, dir, key )
	{
		const{ pl, game }	=this

		const loc	=new Loc().setj(loca)

		if( ! pl.canreach( loc ))	return

		const item	=game.maps.getitem( loc )

		if( ! item || item.gkey() !== key )
		{
			this.send("error" ,[ `Object ${key} not found.` ])

			return
		}
		dir	=Loc.steprot( item.dir, dir )

		pl.rotobj( loc, dir, item )
	}


/** path[], act, params[] *

get. actonobj	=function( path, act, params )
{
	var{ game, pl }	=this

	var tgtloc	=game.path2loc(path)

	if( tgtloc.disth( pl.loc ) > 1 )
	{
		this.send("error" ,[ `Distance to ${path.at(-1)} too far.` ])

		return
	}
	pl.actonobj( path, act, params )
}*/
}


///////////////////////////////////////////////////////////////////////////////



// export default get

/*
for(var funn in ClG.prototype)
{
	ClG.prototype["on_"+funn]	=ClG.prototype[funn]

	delete ClG.prototype[funn]
}*/