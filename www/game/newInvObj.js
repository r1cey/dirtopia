export default( Base =Object )=>class InvObj extends Base
{
	constructor( ...args )
	{
		super( ...args )

		if( ! this.html )	this.html	={}

		this.html.inv	=null
	}
}