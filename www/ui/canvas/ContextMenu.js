import CtxM	from "../ContextMenu.js"

// import Cell	from "../../maps/Cell.js"

import Nav	from "../../shared/Nav.js"

import Loc from '../../shared/Loc.js'



const newopt	=CtxM.newoptcfg


export default class ContextMenuCanvas	extends CtxM
{
	loc

	pl


	static optcfgs	=
	[
		newopt(

			"equipment"
			,
			function()
			{
				return this.pl && this.gclpl().canreach( this.pl.loc )
			},
			function( cl )
			{
				this.pl.isclpl ?

					cl.ui.spage( "clplinv" )
					:
					console.log("show pl inv")
			}
		)/*,
		newopt(

			"rotate ↻"
			,
			ifdewd
			,
			function( cl )
			{
				cl.srv.send("rotitem" ,this.loc ,1 )
			}
		),
		newopt(

			"rotate ↺"
			,
			ifdewd
			,
			function( cl )
			{
				cl.srv.send( "rotitem" ,this.loc ,-1 )
			}
		),
		newopt( "move ↑" ,ifdewd ,movitem( 2 ))
		,
		newopt( "move ↗" ,ifdewd ,movitem( 1 ))
		,
		newopt( "move ↘" ,ifdewd ,movitem( 0 ))
		,
		newopt( "move ↓" ,ifdewd ,movitem( 5 ))
		,
		newopt( "move ↙" ,ifdewd ,movitem( 4 ))
		,
		newopt( "move ↖" ,ifdewd ,movitem( 3 ))*/
	]



	constructor( can ,pos )
	{
		// const cell	=Cell.frommaps( loc ,can.gmaps() )

		super( can ,pos )
		
		const loc	=this.loc	=can.cansq2loc( pos )

		var pl	=can.gmap().obj.g( loc )?.pl

		if( ! pl )
		{
			pl	=can.isclpl( pos )
		}
		this.pl	=pl

		this.setopts()
	}



	gcan()	{return this.tgt }

	gcl()	{return this.html().gcl() }

	gmap()	{return this.gcan().gmap()	}

	gclpl()	{return this.gcan().pl }

	gcello()	{return this.gmap().obj.g(this.loc) }

	static{this.prototype. gco	=this.prototype. gcello }



	setopts()
	{
		super.setopts()

		const{ loc ,opts }	=this

		// const cl	=this.gcl()

		const clpl	=this.gclpl()

		const nav	=new Nav([ cl.maps ,loc ])

		const srv	=this.gcl().srv

		const item	=this.gcello()?.item

		nav.add( item )

		if( item )
		{
			const acts	=item.constructor.acts

			for(const actk in acts )
			{
				const act	=acts[actk]

				switch( actk )
				{
					case "drag" :

						for(var dir =0 ;dir< 6 ;dir++)
						{
							if( act[0].call( item ,nav ,clpl ,dir ))
							{
								this.addopta(
								[
									"drag "+arrows[dir]
									,
									act[0].bind( item ,nav ,clpl ,dir )
									,
									srv.senda. bind(srv ,nav ,actk ,dir )
								])
							}
						}
				}

				if( act[0].call( item ,nav ,clpl ))
				{
					this.addopta(
					[
						k2s[actk] || actk
						,
						act[0].bind( item ,nav ,clpl )
						,
						srv.senda. bind(srv, actk ,nav )
					])
				}
			}
		}
	}
}


///////////////////////////////////////////////////////////////////////////////


function ifdewd()
{
	return this.gmap().obj.g(this.loc)?.dewd
}


function movitem( dir )
{
	return function movitem( cl )
	{
		cl.srv.send("movobj" ,this.loc ,dir ,this.gco()?.dewd )
	}
}

///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////


const arrows	=[ "↘" ,"↗" ,"↑" ,"↖" ,"↙" ,"↓" ]

///////////////////////////////////////////////////////////////////////////////