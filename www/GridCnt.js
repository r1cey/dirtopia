import GridEl from "./GridItem.js"

import newGrid from "./newGrid.js"


export default class GridCnt	extends newGrid( GridEl )
{
	constructor( gobj ,dad )
	{
		super( gobj ,dad )
		
		var cntsym	=document.createElement( "cntsym" )

		this.el.appendChild( cntsym )

		this.fill()
	}
}