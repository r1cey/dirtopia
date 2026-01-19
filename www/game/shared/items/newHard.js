export default( Base )=>class Hard	extends Base
{
	/**@static
	@var boxvol */


	calcvol()	{return this.boxvol() }


	boxvol()	{return this.constructor.boxvol }
}