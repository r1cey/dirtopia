export default( Base =Object )=>class Actionable extends Base
{
	/** Define inside .prototype. property of class!
	 * acts[key] =[ test(nav ,pl ,arg ), run(nav ,pl ,arg ,testres)] 
	 * Run gets testres only if it's not a boolean or undefined.
	 * Test function return argument for failure as [ false ,arg ] 
	@static @prop {obj} acts	*/



	actrun( key ,nav ,pl ,arg)
	{
		return this.acts[key][1].call( this ,nav ,pl ,arg)
	}
	static{this.prototype. runact	=this.prototype. actrun}

	testact( key ,nav ,pl ,arg)
	{
		return this.acts[key][0].call( this ,nav ,pl ,arg)
	}
}