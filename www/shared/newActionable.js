export default( Base =Object )=>class Actionable extends Base
{
	/** acts[key] =[ test(nav ,pl ,...args ) ,run(nav ,pl ,...args) ] */
	static acts	={}


	gact( key )
	{
		return this.constructor.acts[key]
	}


	/** Can only be run dy derived class
	 * to preserve the original when modified */

	static dupacts()
	{
		const acts	={}

		for(var k in this.acts )
		{
			acts[k]	=[ ...this.acts[k] ]
		}
		this.acts	=acts
	}


	actrun( key ,nav ,pl ,...args )
	{
		return this.constructor.acts[key][1].call( this ,nav ,pl , ...args )
	}
}