// import PObj from "./newPathable.js";


export default( Base )=>class Holder	extends Base
{
	get isholder()	{return this }
	

	
	canadditem( item ,len ,nav )
	{
		return true
	}
		
	/** Defined in derived class
	@method additem(item,nav)	{} */

	/** Defined in derived class
	@method delitem(item,len,nav)	{} */
}