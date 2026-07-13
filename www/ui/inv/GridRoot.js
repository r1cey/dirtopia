import newGrid from "./newGrid.js"

import Div from "../Div.js"



export default class GridPage	extends newGrid( Div)
{
	static isinpage	=true


	constructor( dad ,el )
	{
		super( dad ,el ?? "grid" )

		// adddivs()
	}
}