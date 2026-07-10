// import GridHold from "./GridHolder.js"

import GridC from "./GridCell.js"


export default class GridHands extends GridC
{
    constructor( hands ,dad )
	{
		super( hands ,dad )

		this.el.classList.add( "grid_hands" )

		
	}
}