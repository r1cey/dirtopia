import Div from "./Div.js"
import DivGo	from "./DivGameObj.js"

import V	from "../shared/Vec.js"


///////////////////////////////////////////////////////////////////////////////



class Option	extends Div
{
	check

	run

	str


	/**@arg check -( cell )
	 * @arg run -( client ) */

	constructor( check ,run ,str ,menu )
	{
		super( menu ,"BUTTON" )

		Object.assign( this ,{ check ,run ,str })
	}


	static onclick()
	{
		const gobj	=this.getgo()

		if( ! this.check( gobj ))
		{
			/** @todo recalculate all options */

			return 
		}
		this.run( this.html().ui.game )

		this.dad.del()
	}
}


///////////////////////////////////////////////////////////////////////////////



const newCtxM	=( Base )=> class CtxM	extends Base
{
	pos	=new V()

	opts	=[]


	static Opt	=Option



	constructor( dad ,pos /*,opts*/ ,...args )
	{
		super( ...args ,dad ,"ACTIONS" )

		// if( opts && Array.isArray( opts ))	this.opts	=opts

		this.pos.set( pos )

		this.setopts()

		this.setelpos()
	}


	static frompointev( dad ,pointev ,...args )
	{
		return new this( dad ,new V().setev( pointev ) ,...args )
	}

	
	///////////////////////////////////////////////////////////////////////////


	///////////////////////////////////////////////////////////////////////////



	setopts()
	{
		// debugger

		const{ opts }	=this

		const Class	=this.constructor

		for(const[ check ,run ,str ]of Class.opts )
		{
			if( check( this.gobj ))
			{
				const opt	=new Class.Opt( check ,run ,str ,this )

				opts.push( opt )

				const{ el }	=opt

				el.textContent	=str

				el.onclick	=Class.Opt.onclick.bind( opt )

				this.el.appendChild( el )
			}
		}
	}



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
	constructor( dad ,pos ,gobj /*,opts*/ )
	{
		super( dad ,pos /*,opts*/ ,gobj )

		/*if( gobj.isitem )
		{
			this.addopt( "move" ,()=>
				{	
					gobj.ui.inv.movmod()
				}
			)
		}*/
	}
}


///////////////////////////////////////////////////////////////////////////////