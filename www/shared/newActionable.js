/** Generic class for objects which need to communicate
 * between client and server. Methods are put inside
 * .acts objects
 */


export default( Base =Object )=>class Actionable extends Base
{
	/** Define inside .prototype. property of class!
	 * acts[key] =[ test(nav ,pl ,arg ), run(nav ,pl ,arg ,testres)] 
	 * Run gets testres only if it's not a boolean or undefined.
	 * Test function return argument for failure as [ false ,arg ] 
	@static @prop {{[actkey:string]: [Function, Function]}} acts	*/



	/** "run" method can return a special object to help with
	 * communication
	 * @typedef {Object} ActRes
	 * @property {Loc} [loc]	-If an extra location was affected and should
	 * 	be notified.
	 * @property {Loc[]} [locs]	-Same but if multiple.
	 * @property {Object} [data]	-Side effect data to be sent to client. */


	/**@return {ActRes} */

	actrun( key ,nav ,pl ,arg ,testres)
	{
		return this.acts[key][1].call( this ,nav ,pl ,arg ,testres)
	}
	static{this.prototype. runact	=this.prototype. actrun}

	testact( key ,nav ,pl ,arg)
	{
		return this.acts[key][0].call( this ,nav ,pl ,arg)
	}
}