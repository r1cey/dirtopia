import newGObj from "./newGameObj.js"


export default( Base =newGObj() )=>class InvObj extends Base
{
	constructor( ...args )
	{
		super( ...args )

		this.html.inv	=null
	}
}