// import PObj from "./newPathable.js";


/** Important class for moving items!
 * Specifies the protocol for adding and removing items. */

export default( Base )=>class Holder	extends Base
{
	/** @todo Still undecided on whether to use method or static var */

	get isholder()	{return this }

	static isholder	=true
	

	/** A way to find out of holder is holding something. Shallow check.
	@method has(item)	{} */
	

	/** The reason this method MUST have full nav is because soft containers
	 * expand and there can be a chain reaction of expanding containers
	 * and some top one might not fit into a bigger container.
	 * Also because cells are represented by Locs and those are not linked
	 * to maps.
	 * @returns {len} -How many items can be added. */

	canadditem( item ,len ,nav )
	{
		return item!==this && !this.has(item)	? len	:0
	}
		

	/** Server update happens on Game layer.
	 * 
	@method additem(item,nav,msg)

	@arg {obj} msg	-Server methods store side effects
		of adding an item here.
		Client methods receive the data for side effects.
		For server, msg is in arguments to reuse the object.
	@prop {index} msg.newcntid	-For when stackable container stops being empty
		and is turned into individual item with id.
	@prop {Loc} msg.pushed2loc	-For when stackable container stops being empty,
		and lies on the ground. The remaining stack needs to be pushed to
		adjacent cell.
	@prop {index[]} msg.slotnewcntids	-When a stackable cnt is added to a
		slot inventory they need to turn into individual cnts even if empty */


	/** Server update happens on Game layer.
	 * Anton is not sure what's happening with ismov
	 
	@method delitem(item,len,nav,ismov)	{} */


	/** A way to iterate over all items in holder. Shallow.
	 
	@method fore(fun) */
}