import GridEl from "./GridItem.js"

import newGrid from "./newGrid.js"


export default class GridCnt	extends newGrid( GridEl )
{
	constructor( gobj )
	{
		super( gobj )

		this.grid	=new GridCnt( gobj )
		
		this.el.appendChild( this.grid.el )

		var cntsym	=document.createElement( "cntsym" )

		this.el.appendChild( cntsym )

		gobj.fore(( item )=>
		{

		})
	}
}