import newGridUi from "./newGridUI.js"

import Grid from "./Grid.js"



export default class GridCnt	extends newGridUi( Grid )
{
	constructor( gobj ,dad )
	{
		super( gobj ,dad )
		
		const cntsym	=document.createElement( "cntsym" )

		this.el.appendChild( cntsym )

		this.fill()
	}


	finalize()
	{
		this.setsize()

		super.finalize()
	}


	setsize()
	{
		const gobj	=this.gobj

		const size	=gobj.constructor.size.c()

		this.area	=gobj.calcarea()

		if( this.area > size.area() )
		{
			let side	=Math.ceil( Math.sqrt( this.area ) )

			size.setxy( side ,Math.ceil( this.area / side ))
		}
		this.dad.setsize?.()

		super.setsize( size )
	}
}