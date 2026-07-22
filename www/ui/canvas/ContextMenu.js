import{ CtxMGo }	from "../ContextMenu.js"

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




export default class ContextMenuCanvas	extends CtxMGo
{
	// int	=0

	// _pos	=new Loc.Vec()	//pixels relative to screen


	static opts	=
	[
		[
			function( cell )
			{
				return cell.isclpl()
			},
			function( cl )
			{
				cl.ui.spage( "clplinv" )
			},
			"equipment"
		]
	]



	constructor( can ,pos /*,cell ,opts*/ )
	{
		// opts	??=ContextMenuCanvas.gopts( cell )

		const loc	=can.cansq2loc( possqel )

		const cell	=Cell.frommaps( loc ,can.gmaps() )

		super( html ,pos ,cell /*,opts*/ )		
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



ContextMenuCanvas.prototype. addopt	=function( str, act, check )
{
	const menu	=this

	// this.el	??=document.createElement( "actions" )

	this.opts.push( new Opt( str, ()=>{ act(); menu.del() }, check, this.el ))
}


///////////////////////////////////////////////////////////////////////////////



ContextMenuCanvas.prototype. show	=function()
{
	if( ! this.opts.length )	return

	let{ el }	=this

	var can	=this.can

	// _pos.set(this.pos).tosqc( can )

	this.setelpos()

	can.el.parentElement.appendChild( el )

	this.ready	=true

	// this.int	=window.setInterval( this.check.bind(this), 821 )	//73bpm
}




ContextMenuCanvas.prototype. del	=function()
{
	this.el.remove()

	this.can.ctxmenu	=null
}


///////////////////////////////////////////////////////////////////////////////



ContextMenuCanvas.prototype. setelpos	=function()
{
	var style	=this.el.style

	var pos	=this.pos

	style.left	=`${Math.floor(pos.x)}px`
	style.top	=`${Math.floor(pos.y)}px`
}




ContextMenuCanvas.prototype. mov	=function( d )
{
	this.pos.addv(d)

	this.setelpos()
}




ContextMenuCanvas.prototype. check	=function()
{
	var{ opts }	=this

	for(var opt of opts)
	{
		opt.enable( opt.check() )
	}
}


ContextMenuCanvas.prototype. click	=function( act, ev )
{
	// this.cl().srv.s.act( act, this.pos.roundh() )

	this.can.delmenu()
}


///////////////////////////////////////////////////////////////////////////////


/*
Opt.prototype. enable	=function( bool )
{
	this.el.disabled	=!bool
}
*/

