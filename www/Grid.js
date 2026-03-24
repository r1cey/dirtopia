import newGrid from "./newGrid.js"



export default class Grid	extends newGrid()
{
	static isinpage	=true


	constructor( dad ,dhold )
	{
		super( dad ,"grid" ,dhold )
	}
}