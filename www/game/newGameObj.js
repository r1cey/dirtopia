export default( Base =Object )=>class GameObj	extends Base
{
	dad

	html	={}



	constructor( dad ,...args )
	{
		super( ...args )

		this.dad	=dad
	}


	gcl()	{return this.dad.gcl() }
}