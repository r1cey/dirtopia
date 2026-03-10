import GridEl from "./GridEl.js"

import Drag from "./Drag.js"


export default class GridItem	extends GridEl
{
	drag 	=new Drag( this )
	// drag


	constructor( gobj )
	{
		super( gobj )

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


	dragto( trgt )
	{
		const gobj	=this.gobj

		const uis	=gobj.gcl().html.uis

		let el	=trgt

		let tgtgo

		while ( el )
		{
			tgtgo	=uis.get( el )

			if( tgtgo )
			{
				gobj.dragto( tgtgo )

				break
			}
			el	=el.parentElement; 
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