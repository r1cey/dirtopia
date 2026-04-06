import Grid from "./Grid.js"



export default class GridPage	extends Grid
{
	static isinpage	=true


	constructor( dad ,dhold ,griduis ,el )
	{
		super( dad ,el ?? "grid" ,dhold ,griduis )
	}
}