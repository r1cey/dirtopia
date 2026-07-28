// import PObj from "./newPathable.js";


export default( Base )=>class Holder	extends Base
{
	get isholder()	{return this }

	static isholder	=true
	

	/** Defined in derived class
	@method has(item)	{} */
	
	canadditem( item ,len ,nav )
	{
		return item !== this && ! this.has( item )
	}
		
	/** Defined in derived class
	@method additem(item,nav,msg)	{} */

	/** Defined in derived class
	@method delitem(item,len,nav,ismov)	{} */


	/**@method fore(fun) */
}