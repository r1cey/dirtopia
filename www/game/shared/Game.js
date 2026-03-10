import Players from "./player/Players"


export default class Game
{
	maps

	pls


	constructor( Maps ,Pls =Players )
	{
		this.pls	=new Pls( this )

		this.maps	=new Maps( this )
	}
}