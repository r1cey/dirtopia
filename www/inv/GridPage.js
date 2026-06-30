import newGrid from "./newGrid.js"

import UiEl from "../UIElement.js"



export default class GridPage	extends newGrid( UiEl)
{
	static isinpage	=true


	constructor( dad ,griduis ,el )
	{
		super( griduis ,dad ,el ?? "grid" )
	}
}