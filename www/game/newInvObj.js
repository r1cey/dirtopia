import newGObj from "./newGameObj.js"


export default( Base =Object )=>class InvObj extends newGObj( Base )
{
	constructor( ...args )
	{
		super( ...args )

		this.html.inv	=null
	}
}