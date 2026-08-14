import CtxM	from "../ContextMenu.js"

// import Cell	from "../../maps/Cell.js"

import Nav	from "../../shared/Nav.js"

import Loc from '../../shared/Loc.js'
import LocC	from '../../shared/LocCell.js'



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
			function()
			{
				this.pl.isclpl ?

					this.html().ui.spage( "clplinv" )
					:
					console.log("show pl inv")
			}
		),
		newopt(

			"plant"
			,
			function()
			{
				const{ loc }	=this

				return LocC.acts.plant[0]. call(loc,
					
					new Nav([this.gcl().maps ,loc ]), this.gclpl() )
			},
			function()
			{
				const srv	=this.gsrv()

				srv.senda. call(
				
					srv ,new Nav([ this.gcl().maps ,this.loc ]) ,"plant" )
			}
		)
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

	gmap()	{return this.gcan().gmap()	}

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
					break
					case "rot" :

						for(var ddir =-1 ;ddir <= 1 ;ddir += 2 )
						{
							if( act[0].call( item ,nav ,clpl ,ddir ))
							{
								this.addopta(
								[
									"rotate "+( ddir > 0 ? "↺" :"↻" )
									,
									act[0].bind( item ,nav ,clpl ,ddir )
									,
									srv.senda .bind(srv, nav ,"rot" ,ddir )
								])
							}
						}
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