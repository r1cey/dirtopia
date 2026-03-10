// import PObj from "./newPathable.js";


export default( Base )=>class Holder	extends Base
{
	get isholder()	{return this }
	

	
	canadditem( item ,len )
	{
		return true
	}
		
	/** Defined in derived class
	@method additem( item )	{} */

	/** Defined in derived class
	@method delitem( item, num )	{} */
}