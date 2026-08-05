export default( Base =Object )=>class Actionable extends Base
{
	/** acts[key] =[ test(nav ,pl ,arg ), run(nav ,pl ,arg )] 
	 * Test function return argument for failure as [ false ,arg ] */
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


	actrun( key ,nav ,pl ,args )
	{
		return this.constructor.acts[key][1].call( this ,nav ,pl ,args )
	}
	static{this.prototype. runact	=this.prototype. actrun }

	testact( key ,nav ,pl ,args )
	{
		return this.constructor.acts[key][0].call( this ,nav ,pl ,args )
	}
}