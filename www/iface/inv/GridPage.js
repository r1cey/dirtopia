import newGrid from "./newGrid.js"

import Div from "../Div.js"



export default class GridPage	extends newGrid( Div)
{
	static isinpage	=true


	constructor( dad ,griduis ,el )
	{
		super( griduis ,dad ,el ?? "grid" )
	}
}