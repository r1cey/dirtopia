import GridC from "./Cell.js"

// import Drag from "../Drag.js"

import CtxM	from "./ContextMenu.js"


export default class GridItem	extends GridC
{
	// drag 	=new Drag( this )


	constructor( gobj ,dad )
	{
		super( gobj ,dad )

		this.setsize()

		this.el.classList.add( "drag" )

		// this.drag.start()

		this.el.onclick	=( ev )=>
		{
			const ctxm	=CtxM.frompointev( this ,ev )

			if( ctxm.opts.length )	this.ui().setctxm( ctxm )
		}
	}


	///////////////////////////////////////////////////////////////////////////



	gnav()
	{
		return this.dad.gnav().push( this.gobj )
	}



	setdrag()
	{
		// this.elsel.style.touchAction	="none"

		// this.drag	=new Drag( this )

		// this.el.attachEvent( "onpointerdown"	,this.drag.ondown )
	}


	setclick()
	{
		this.el.onclick	=this.onclick.bind(this)
	}


	///////////////////////////////////////////////////////////////////////////


	onclick( ev )
	{
		this.gobj.gcl().html.newctxm( this.gobj ,ev )
	}


	dragto( trgtel )
	{
		const el	=trgtel

		const uito	=this.html().uis.get( el )

		if( ! uito )	return

		this.gobj.dragto( uito.gobj ,this ,uito )
	}


	followp( until )
	{
		window.document.attachEvent( "onpointermove"	,this.drag.onmove )

		this.el.style.position	="absolute"

		var follow	=()=>{
			if( this.drag.down )
			{
				requestAnimationFrame( follow )
			}
			else
			{
				this.el.style.position	=""
			}
		}
		requestAnimationFrame( this.drag.onframe )
	}
}