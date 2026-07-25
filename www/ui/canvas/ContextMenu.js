import CtxM	from "../ContextMenu.js"

import Cell	from "../../maps/Cell.js"

import Loc from '../../shared/Loc.js'



/*
class Opt
{
	el

	check



	constructor( str, act, check, parel )
	{
		var el	=document.createElement('button')

		el.textContent	=str
	
		el.onclick	=act

		parel.appendChild( el )
		
		this.el	=el

		this.check	=check
	}
}*/




export default class ContextMenuCanvas	extends CtxM
{
	loc

	pl


	static optcfgs	=
	[
		CtxM.newoptcfg
		(
			"equipment"
			,
			function()
			{
				return this.pl
			},
			function( cl )
			{
				this.pl.isclpl ?

					cl.ui.spage( "clplinv" )
					:
					console.log("show pl inv")
			}
		)
	]



	constructor( can ,pos )
	{
		// const cell	=Cell.frommaps( loc ,can.gmaps() )

		super( can ,pos )
		
		const loc	=this.loc	=can.cansq2loc( pos )

		const pl	=this.pl	=can.gmap().obj.g( loc ).pl

		this.setopts()
	}


	/*static gopts( cell )
	{
		const{ loc ,map }	=cell

		const opts	=[]

		for(var opt of this.opts )
		{
			if( opt.check( cell ))	opts.push( opt )
		}
		return opts
	}*/


	/*

	setpos( possqel, ploc )
	{
		var can	=this.can

		var pos	=this.pos

		pos.set( possqel )

		// pos.set( possqel ).tohexc( can ).addv( can.crn )

		this.loc.set( pos ).tohexc( can ).addv( can.crn ).roundh()
		
		this.loc.h	=ploc.h
	}*/
}


///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////



/*ContextMenuCanvas.prototype. mov	=function( d )
{
	this.pos.addv(d)

	this.setelpos()
}*/

///////////////////////////////////////////////////////////////////////////////


/*
Opt.prototype. enable	=function( bool )
{
	this.el.disabled	=!bool
}
*/

