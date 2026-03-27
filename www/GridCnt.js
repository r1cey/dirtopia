import GridEl from "./GridItem.js"

import newGrid from "./newGrid.js"



export default class GridCnt	extends newGrid( GridEl )
{
	constructor( gobj ,dad )
	{
		super( gobj ,dad )
		
		const cntsym	=document.createElement( "cntsym" )

		this.el.appendChild( cntsym )

		this.fill()
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
		super.setsize( size )
	}
}