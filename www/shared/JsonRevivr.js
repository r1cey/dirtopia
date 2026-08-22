import Loc from "./Loc.js"
import Col from "./Color.js"
import Hands from "./player/Hands.js"
import{ key as itemk }	from "./items/Item.js"


/** The heart of converting json objects to instances automatically.
 * 
 * The principle is that the property key defines the class of the value.
 * 
 * It's not always true like with "item" key and more often with arrays.
 * For cases like "item" where different classes can be under the same key,
 * this class has the *template* system, where the first element of the array
 * is the correct key and the second is the value.
 * 
 * In all cases, an interface doesn't have to be a Jable class, enough to have
 * "key" property and "fromJSON" method.
 * 
 * Look inside newJsonable.js for more info.
 * 
 * @borrows JR#addifacea as #adda 
 * @borrows JR#addifaceo as #addo
 * @borrows JR#addtmplkey as #addtmpl
 * @borrows JR#addiface as #add */

export default class JR
{
	/** Array of methods which will be called for each reviver check.
	 * Works a lot like even listeners. Maybe add methods to add and remove
	 * later.
	 * If any method returns a value,
	 * that value will be used as the reviver result.
	 * @type {((key :string ,val :any ,userd :any)=>any)[]} */
	oncheck	=[]

	/**
	 * @type {{[key :string] :Jable}} */
	ifaces	={}

	/** @type {Set<string>} */
	tmpls	=new Set()

	/** Easy way to get bound reviver function for JSON.parse */
	get fn()	{return this.revivr.bind(this) }

	/** User data that can be added for any custom behaviour.
	 * Usually for saving info while reviving a big object. */
	userd


	///////////////////////////////////////////////////////////////////////////


	/** Adds some default interfaces and templates true for back and front end */

	constructor()
	{
		this.addifacea([ Loc ,Col ,Hands ]).addtmpl(itemk)
	}


	///////////////////////////////////////////////////////////////////////////


	/** @arg {Jable[]} arr*/

	addifacea( arr )
	{
		for(var iface of arr )
		{
			this.addiface( iface )
		}
		return this
	}
	static
	{
		this.prototype. adda	=this.prototype.addifacea
	}


	/** @arg {Record<string ,Jable>} o */

	addifaceo( o )
	{
		for(var key in o )
		{
			this.addiface( o[key] )
		}
		return this
	}
	static
	{
		this.prototype. addo	=this.prototype.addifaceo
	}


	addtmplkey( key )
	{
		this.tmpls.add(key)

		return this
	}
	static
	{
		this.prototype. addtmpl	=this.prototype.addtmplkey
	}


	/** @arg {Jable} iface */

	addiface( iface )
	{
		this.ifaces[iface.key]	=iface

		return this
	}
	static
	{
		this.prototype. add	=this.prototype.addiface
	}


	///////////////////////////////////////////////////////////////////////////


	/** The actual reviver function. */

	revivr( key, val, str )
	{
		for(var oncheck of this.oncheck )
		{
			var res	=oncheck( key ,val ,this.userd )

			if( res )	return res
		}
		if( this.tmpls.has(key) )
		{
			if( ! Array.isArray(val) )	return null

			var iface	=this.ifaces[val[0]]

			val	=val[1]
		}
		else	var iface	=this.ifaces[key]

		return iface && val	? iface.fromJSON( val ,key ,this.userd )	: val
	}
}