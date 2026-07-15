import Div from "./Div.js"
import DivGo	from "./DivGameObj.js"

import V	from "../shared/Vec.js"



///////////////////////////////////////////////////////////////////////////////



export default class CtxMenuMgr
{
	ui


	constructor( ui )
	{
		this.ui	=ui
	}
}


///////////////////////////////////////////////////////////////////////////////



const newCtxM	=( Base )=> class CtxM	extends Base
{
	pos	=new V()

	opts	=[]



	constructor( dad ,pos ,...args )
	{
		super( ...args ,dad ,"ACTIONS" )

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
		var opt	=new Opt( this.gobj ,str ,act )
		
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
	constructor( dad ,pos ,gobj )
	{
		super( dad ,pos ,gobj )

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



class Opt	extends Div
{
	check



	constructor( gobj ,str ,act ,check )
	{
		super( "button" ,gobj )

		var el	=this.el

		el.textContent	=str
	
		el.onclick	=()=>
			{
				act()

				this.gobj.gcl().html.delctxm()
			}
		this.check	=check
	}
}