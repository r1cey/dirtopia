import Game	from './shared/Game.js'
import UI	from './ui/UI.js'
import Serv	from './serv/Serv.js'
import Player	from './player/Player.js'
import PCl	from './PeerCl.js'
import Pls from './player/Players.js'
import Maps	from './maps/Maps.js'
import V	from './shared/Vec.js'
import Loc	from "./shared/Loc.js"
// import items from './items/itemTps.js'



export default class Client	extends Game
{
	ui	=new UI( this )

	con()	{return this.html.con }

	srv	=new Serv(this)

	pl

	peercls	={}

	stream


	static Maps	=Maps

	static Pls	=Pls

	// static items	=items


	///////////////////////////////////////////////////////////////////////////



	constructor()
	{
		super()
	}


	///////////////////////////////////////////////////////////////////////////



	async start()
	{
		// this.ui.newlogin( this.srv )

		this.ui.setpage( "login" ,this.srv )

		this.stream	=await navigator.mediaDevices.getUserMedia({audio:true})

		// debugger
	}


	///////////////////////////////////////////////////////////////////////////



	movitem( from ,item ,len ,to ,mover ,newcnt ,pushed2loc ,slotnewcnts )
	{
		const movit	= item.isstck && item.len > len ?	item.clone( len )	: item

		to.at(-1).additem( movit ,to ,newcnt ,pushed2loc ,slotnewcnts )

		from.at(-1).delitem( item ,len ,from )

		this.ui.itemmov( from ,item ,to )
	}


	///////////////////////////////////////////////////////////////////////////



	plmapsloaded()
	{
		const ui	=this.ui

		this.maps.setpl( this.pl )

		this.maps.jsonlocs.pl	=null

		ui.can.runani()

		ui.setpage()
	}


	shiftmap( dir ,mapshiftdets )
	{
		const cl	=this

		const{ pl ,maps }	=cl

		maps.shift( dir ,...mapshiftdets )

		// maps.movobjp( pl.prevloc ,"pl" ,newloc )
	}
}



/*Client.prototype. createpl	=async function( name )
{
	this.html.login.el.className='login'

	var pg	=await this.html.loadp('createpl')
	
	pg.start( name, this.srv.send. bind(this.srv, "newplayer" ) )
}*/


///////////////////////////////////////////////////////////////////////////////



Client.prototype. setpl	=async function( plmsg )
{
	// this.ui.html.deldiv('createpl')

	this.ui.setpage()

	const pl	=this.pl	=this.pls.new( plmsg )

	this.ui.newclplinv( pl )

	const can	=this.ui.can

	can.setpl( pl )

	can.draw()

	if( this.maps.isready() )	this.plmapsloaded()
/*	{
		let map	=this.maps.loc2map(pl.loc)

		let cell	=map.obj.g(pl.loc)

		if( ! cell || ! cell.pl )
		{
			console.error( "setpl:" ,plmsg )

			cell	=map.obj.s(pl.loc)
		}
		cell.pl	=pl

		can.start()
	}*/
}




Client.prototype. setmaps	=function( grbin, grobj, trbin, trobj )
{
	const maps	=this.maps

	maps.gr.setbin( grbin )

	maps.gr.obj.o	=grobj

	maps.tr.setbin( trbin )

	maps.tr.obj.o	=trobj

	maps.sethonpllocs()

	// if( maps.ready() )
	{
		const can	=this.ui.can

		maps.tr.can.width	=can.el.width

		maps.tr.can.height	=can.el.height

		if( can.pl )	this.plmapsloaded()
	}
}



Client.prototype. genevispl	=function( plvisa )
{
	var cl	=this

	var plvis	=new Player.Vis(plvisa, true, this )

	var name	=plvis.name
	
	if( plvis.cl )
	{
		cl.genepcl( name, true, plvis )
	}
	else if( cl.peercls[name] )
	{
		this.con().log( "Weird bug! [9872]" )
	}

	cl.vispls[name]	=plvis

	return plvis
}

Client.prototype. genepcl	=function( name, toconn=false, pl=null )
{
	var cl	=this

	pl	??=cl.vispls[name]

	var pcls	=cl.peercls

	var pcl	=pcls[name]

	if( ! pcl )
	{
		pcl	=new PCl( name, toconn, cl )

		pcls[name]	=pcl
	}

	pcl.pl	=pl

	if(pl)
	{
		pl.cl	=pcl
	}

	return pcl
}

Client.prototype. delpcl	=function( name )
{
	var cl	=this

	var pcls	=cl.peercls

	var pcl	=pcls[name]

	var pl	=cl.vispls[name]

	if(pl)	pl.cl	=0

	if( !pcl )
	{
		this.con().log( `Peer client [${name}] already deleted!`)

		return
	}

	pcl.close()

	delete pcls[name]
}


///////////////////////////////////////////////////////////////////////////////



