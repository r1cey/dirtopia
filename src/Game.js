import Game	from "../www/shared/Game.js"
// import newPathe	from "../www/shared/newPathable.js"
import Maps	from './maps/Maps.js'
import Srv from './Server/Server.js'
// import Errors from './Errors.js'
import Players from './player/Pls.js'
import Loc	from './Loc.js'
// import { constrainedMemory } from 'process'
// import Con from "./Console.js"
import Nav	from '../www/shared/Nav.js'
// import Pl from "../www/shared/player/Player.js"
// import items from "./itemTps/itemTps.js"



Function.prototype. c	=function(...args)
{
	this.name.split('_').forEach((n)=>
	{

	})
}


// GLBLU


/** SERVER WORRIES ABOUT THE CLIENT WHICH MADE THE ACTION.
 * THE GAME ITSELF UPDATES THE OTHER CLIENTS!
 */


export default class G	extends Game
{
	conf	=
	{
		pa	:'./conf.js'
	}
	time	=
	{
		sec	:{ int	:0, i :0 }
		,
		min15	:{ int	:0, i :0 }
		,
		hour	:{ int	:0, i :0 }
	}
	mode	=null

	// admin	=new Admin( this )
	
	srv	=new Srv( this)

	server	=this.srv

	// con	=new Con(this)


	static Maps	=Maps

	static Pls	=Players

	// static items	=items


	///////////////////////////////////////////////////////////////////////////



	constructor( confpa )
	{
		super()

		// this.start(confpa)
	}


	////////////////////////////////////////////////////////////



	newpl( plmsg )
	{
		console.log( `Creating new player: ${plmsg.name}` )

		const map	=this.maps.gr
		
		var loc	=map.obj.o.spawns[0]

		plmsg.loc	=loc.toJSON()

		const pl	=super.newpl( plmsg )

		map.adddewds4newpl( pl.loc ,this.constructor.items.dewd )
	}


	/** @todo what if no place to move stacks too and lots of error handling!! */

	additem( to ,item )
	{
		const msg	={ item ,to }
		
		super.additem( item ,to ,msg )

		this.srv.sendvis( nav2loc(to) ,"itemadd" ,msg )
	}
}



export function nav2loc( arr )
{
	if( arr[0] instanceof Maps )	return arr[1]
	
	else if( arr[0] instanceof Players )	return arr[1].loc
	
	else	console.error( "Game.nav2loc: GRAVE ERROR!")
}


///////////////////////////////////////////////////////////////////////////////



G.prototype. start	=async function( confpa )
{
	const g	=this

	const{ maps ,pls }	=this

	// var fs	=this.files

	if( confpa )
	{
		try{
			var conf	=await readjson( confpa )

			if( conf.maps )
			{
				let conf	=conf.maps
				
				if( conf.dir )	maps.dir	=conf.dir

				if( conf.size )	maps.size	=conf.size
			}
		}
		catch(e)
		{
			console.error("Couldn't read conf file: "+confpa )
		}
	}
	await Promise.all([ maps.start() ,pls.read() ])

	const pllocs	=maps.jsonlocs.pl

	pls.fore(( pl )=>
		{
			maps.setpl( pl )
		}
	)
	for(var pln in pllocs )
	{
		const loc	=pllocs[pln]

		const obj	=maps.loc2map(loc).obj
		
		if( ! obj.g(loc)?.pl?.ispl )	obj.del( loc ,"pl" )
	}
	maps.jsonlocs.pl	=null

	// g.time.hour.int	=setInterval( g.hour.bind(g), 60*1000*60*1.5 )

	// g.time.min15.int	=setInterval(g.min15.bind(g), 12*60*1000)

	// g.time.sec.int	=setInterval( this.sec.bind(this), 1000*60/73)

	this.server.start()

	console.log(`Game had started!`)

	// console.log( this.maps.getitem(this.pls.g("gavriel").loc,"pl"))

	return true
}



G.prototype. stop	=async function()
{
	var g	=this

	for(var key in this.intervals )
		clearInterval(this.intervals[key])

	g.srv.stop()

	await g.save()

	process.exit()
}


////////////////////////////////////////////////////////////////



G.prototype. save	=async function()
{
	var proms	=
	[
		this.maps.save()
		,
		this.pls.save()
	]
	return await Promise.allSettled( proms )
}


///////////////////////////////////////////////////////////////////////////////


/**@arg {Nav} from
 * @arg {Nav} to */

G.prototype. movitem	=function( from ,item ,len ,to ,mover )
{
	const msg	={ from ,item_ :item ,len ,to ,mover }

	const movitem	= item.isstck && item.len > len ?	item.clone( len )	: item

	to.at(-1).additem( movitem ,to ,msg )

	from.at(-1).delitem( item ,len ,from ,true )

	this.srv.sendvis2( nav2loc(from) ,nav2loc(to) ,"itemmov" ,msg )
}


G.prototype. delitem	=function( from ,item ,len )
{
	this.srv.sendvis( nav2loc(from) ,"itemdel" ,[ from ,item ,len ])

	from.at(-1).delitem( item ,len ,from )
}


///////////////////////////////////////////////////////////////////////////////



G.prototype. rempls	=async function()
{
	return this.conf.pls.max - (await this.files.readdir( this.conf.pls.dir )) 
}


///////////////////////////////////////////////////////////////////////////////



G.prototype. sec	=function()
{
	var gr	=this.maps.gr

	//var x, ic, v	=new Loc()

	gr.fore(( loc )=>
	{
		var ic	=gr.ic(loc)

		var o	=gr.obj.g(loc)

		if( o )
		{
			if( o.pl )
			{
				let pl	=o.pl

				pl.addheat( gr.getshade_i(ic) ? -0.01 : 0.01 )
			}
		}
	/*
		if( x =map.gwateri( ic ))
		{
			v.set(loc)

			map.flowcell( v )

			// if no place for water to flow

			if( v.eq(loc) || Loc.rotopph(map.getdir( v )) === map.gdiri(ic) )
			{
				x	=map.forring(( loc )=>
					{
						if( map.gwater( loc ) + 1 < x )
						{
							return loc
						}
					}
					,1 ,v )

				if( x )
				{
					map.addwater( x )

					map.dryi( ic, loc )
				}
			}
			else
			{
				if( map.gwater( v ) < x )
				{
					map.addwater( v )

					map.dryi( ic, loc )
				}
			}
		}*/
	})
}


G.prototype. min15	=function()
{
	var g	=this

	var gr	=g.maps.gr

	var tr	=g.maps.tr

	var itime	=g.time.min15.i

	// DRY

	gr.fore(( loc )=>
	{
		var ic	=gr.ic(loc)

		switch( gr.getwsr_i( ic ))
		{
			case "soil" :

				let lvl	=gr.getsoilhum_i( ic )

				if( lvl > 0 && lvl < 4 && ! gr.getshade_i( ic ) )
				{
					gr.dry_i( ic, loc )
				}
		}
	})
	// HUMIDIFY

	gr.fore(( loc )=>
	{
		// var ic	=gr.ic(loc)

		var o	=gr.obj.g(loc)

		if( o )
		{
			if( o.pl )
			{
				let pl	=o.pl

				if(pl.cl)
				{
					pl.subwater( 0.0208 )
				}
				else
				{
					pl.subwater( 0.007 )
				}
			}
			if( o.dewd )
			{
				let driploc	=new Loc(loc).neighh( o.dewd.dir )

				gr.wet( driploc )
			}
		}
	})
	// GROW		@TODO move growth checks to tree class

	gr.fore(( loc )=>
	{	
		var ic	=gr.ic(loc)

		switch( gr.getplfl_i( ic ))
		{
			case "plant" :

				let vegty	=gr.getvegty_i( ic )

				if( vegty === "none" )	break

				let time	=gr.getvegtime_i( ic )

				if( time === itime )
				{
					let veglvl	=gr.getveglvl_i( ic )

					if( vegty === "umbrtr")
					{
						if( veglvl <= 7 )
						{
							let humlvl	=gr.getsoilhum_i( ic )

							if( humlvl > 0 )	gr.grow( loc, ic, vegty, veglvl )
						}
						else if( veglvl <= 25 )
						{
							gr.grow( loc, ic, vegty, veglvl )
						}
						else
						{
							let humlvl	=gr.getsoilhum_i( ic )

							if( humlvl > 1 )	gr.grow( loc, ic, vegty, veglvl )
						}
					}
				}
		}
	})
	g.time.min15.i	=itime < gr.constructor.maxvegtime()-1 ? ++itime : 0
}



G.prototype. hour	=function()
{
	var g	=this

	var gr	=g.maps.gr

	var tr	=g.maps.tr

	gr.fore(( loc )=>
	{
		var ic	=gr.ic(loc)

		switch( gr.getwsr_i( ic ))
		{
			case "soil" :

				let lvl	=gr.getsoilhum_i( ic )

				if( lvl > 0 && lvl < 4 && gr.getshade_i( ic ) )
				{
					gr.dry_i( ic, loc )
				}
				
		}
	})
}


///////////////////////////////////////////////////////////////////////////////


G.prototype. getobj	=function( key )
{
	switch( key )
	{
		case "map" :

			return this.maps
		break
		case "pl" :

			return this.pls
		break
	}
}


G.prototype. toJSON	=function()
{
	return undefined
}

/*


/** THIS FUNCTION SAVES STATE AND CRASHES!! *

Game.prototype. err	=function( code )
{
	console.error( 'SAVE STATE - TODO! '+code )
}






class Acts
{
	g

	constructor(game)
	{
		this.g	=game
	}
}

/** @arg o
 * @arg o.name
 *

Acts.prototype. login	=function( clid, o )
{
	console.log(`Login attempt: ${o.name}`)

	var game	=this.g

	var srv	=game.srv

	var name	=o.name

	var errs	=game.errs

	var pl	=game.pls[name]

	if( pl )
	{
		if(pl.cl)
		{
			let err	=4013

			console.log(errs[err])

			srv.clclose( clid, err, errs[err])

			return
		}
		else
		{
			console.log(`Login successful.`)

			srv.succlogin( clid, name, false )
		}
	}
	else if( srv.plscreated[name] )
	{
		let err	=811

		console.log(errs[err])

		srv.clclose( clid, err, errs[err])

		return
	}
	else
	{
		if(game.ismaxpls())
		{
			let err	=8
			
			srv.clclose( clid, err, errs[err])

			console.log(errs[err])
		}
		else if( game.ismaxips(cl.ip) )
		{
			let err	=9

			console.log( errs[err], cl.ip )

			srv.clclose( clid, err, errs[err])
		}
		else
		{
			console.log(`Requesting for new player.`)

			srv.plscreated[name]	=true

			srv.s.createpl( clid, name )
		}
	}
}*/