// import GridHold from "./GridHolder.js"

import GridC from "./Cell.js"


export default class GridHands extends GridC
{
    constructor( hands ,dad )
	{
		super( hands ,dad )

		this.el.classList.add( "grid_hands" )

		
	}
}