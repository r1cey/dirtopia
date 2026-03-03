import UiEl from "./UIElement.js"
import V	from "./game/shared/Vec.js"


export default class CtxM	extends UiEl
{
	pos	=new V()

	opts	=[]



	constructor( gobj ,pointev )
	{
		super( "ACTIONS" ,gobj )

		this.pos.setev(pointev)

		if( gobj.isitem )
		{
			this.addopt( "move" ,()=>
				{	
					gobj.ui.inv.movmod()
				}
			)
		}
		this.setelpos()
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
		var style	=this.el.style

		var pos	=this.pos

		style.left	=`${Math.floor(pos.x)}px`
		style.top	=`${Math.floor(pos.y)}px`
	}
}


///////////////////////////////////////////////////////////////////////////////



class Opt	extends UiEl
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