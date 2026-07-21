import Div from "./Div.js"
import DivGo	from "./DivGameObj.js"

import V	from "../shared/Vec.js"


///////////////////////////////////////////////////////////////////////////////



class Option
{
	check

	run

	str


	/**@arg check -( cell )
	 * @arg run -( client ) */

	constructor( check ,run ,str )
	{
		Object.assign( this ,{ check ,run ,str })
	}
}


///////////////////////////////////////////////////////////////////////////////



const newCtxM	=( Base )=> class CtxM	extends Base
{
	pos	=new V()

	opts	=[]


	static Opt	=Option



	constructor( dad ,pos ,opts ,...args )
	{
		super( ...args ,dad ,"ACTIONS" )

		if( opts && Array.isArray( opts ))	this.opts	=opts

		this.pos.set( pos )

		this.setelpos()
	}


	static frompointev( dad ,pointev ,...args )
	{
		return new this( dad ,new V().setev( pointev ) ,...args )
	}

	
	///////////////////////////////////////////////////////////////////////////



	addopt( str, act )
	{
		var opt	=new Option( this.gobj ,str ,act )
		
		this.opts.push( opt )

		this.el.appendChild( opt.el )

		return this
	}


	///////////////////////////////////////////////////////////////////////////


	setelpos()
	{
		const style	=this.el.style

		const pos	=this.pos

		style.left	=`${Math.floor(pos.x)}px`
		style.top	=`${Math.floor(pos.y)}px`
	}
}


///////////////////////////////////////////////////////////////////////////////



export class CtxM	extends( Div )
{
	constructor( dad ,pos )
	{
		super( dad ,pos )
	}
}



export class CtxMGo	extends newCtxM( DivGo )
{
	constructor( dad ,pos ,gobj ,opts )
	{
		super( dad ,pos ,opts ,gobj )

		if( gobj.isitem )
		{
			this.addopt( "move" ,()=>
				{	
					gobj.ui.inv.movmod()
				}
			)
		}
	}
}


///////////////////////////////////////////////////////////////////////////////

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