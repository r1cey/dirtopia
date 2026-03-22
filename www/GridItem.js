import GridEl from "./GridEl.js"

import Drag from "./Drag.js"


export default class GridItem	extends GridEl
{
	drag 	=new Drag( this )
	// drag


	constructor( gobj ,dad )
	{
		super( gobj ,dad )

		this.el.classList.add( "drag" )

		this.drag.start()

		// this.setclick()
	}


	///////////////////////////////////////////////////////////////////////////



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
		// const gobj	=this.gobj

		const uis	=this.html().uis

		var el	=trgtel

		var trgtui	=uis.get( el )

		if( this.dad.gobj === trgtui?.gobj )	return

		while( el )
		{
			if( trgtui )
			{
				this.gobj.dragto( trgtui.gobj ,trgtui.getnav() )

				break
			}
			el	=el.parentElement; 

			trgtui	=uis.get( el )
		}
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