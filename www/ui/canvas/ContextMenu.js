import CtxM	from "../ContextMenu.js"

import Cell	from "../../maps/Cell.js"

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
		),
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
		newopt( "move ↖" ,ifdewd ,movitem( 3 ))
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

	gclpl()	{return this.gcan().pl }

	gcello()	{return this.gmap().obj.g(this.loc) }

	gco	=this.gcello



	setopts()
	{
		super.setopts()

		const{ loc ,opts }	=this

		const cpl	=this.gclpl()

		const{ Opt }	=this.constructor

		if( cpl.canreach( loc ))
		{
			const item	=this.gcello()?.item

			if( item )
			{
				for(var act in item.acts )
				{
					opts.push( new Opt( this ,newopt( )))
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


///////////////////////////////////////////////////////////////////////////////