import Grid from "./Grid.js"



export default class GridPage	extends Grid
{
	static isinpage	=true


	constructor( dad ,dhold )
	{
		super( dad ,"grid" ,dhold )
	}
}