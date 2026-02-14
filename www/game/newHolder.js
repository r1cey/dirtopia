import newHold	from "./shared/newHolder.js"



export default( Base =newHold(Object) )=>class Holder	extends Base
{
	constructor( ...args )
	{
		super( ...args )
		
		if( ! this.html )	this.html	={}

		this.html.inv	=null
	}
}