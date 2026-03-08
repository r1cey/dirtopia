import GridEl from "./GridEl.js"

import Drag from "./Drag.js"


export default class GridItem	extends GridEl
{
	drag 	=new Drag( this )
	// drag


	constructor( gobj )
	{
		super( gobj )

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