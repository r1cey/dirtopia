// import{ key as ITEMK }	from "./items/Item.js"

const ITEMK	="item"



/** Class template for objects which are commonly read from JSON.
 * 
 * Is used by JsonRevivr to identify the class and transform. */

export default( Base =Object )=>class Jable extends Base
{
	/** That's how class is identified in JSON by JsonReviver: by property key.
	 * For example {loc:[1,2,3]} works because Loc class has "loc" key.
	@static @var {string} key */

	gkey()	{return this.constructor.key }

	/** Is a remnant of trying to list which properties are to be handled
	 * and which ignored.
	@static	@var apprps	=[[ key , def ],[ key ]] */


	///////////////////////////////////////////////////////////////////////////


	/** The based method of converting Json data into the instance.
	 * Many classes override this method to handle their own properties.
	 * @arg {any} msg -For example in json {loc:[1,2,3]} the msg is [1,2,3]
	 * 	But in this particular case, .setj method is overriden by Loc class. */

	setj( msg )
	{
		const inst	=this

		for(var pn in msg )
		{
			// var methn	=pn+"_setj"

			// if( inst.methn )	inst[methn]( msg[pn] )

			if( inst.propertyIsEnumerable( pn ))
			{
				/*
				if( pn === ITEMK )
				{
					inst[pn]	=msg[pn]
				}
				else if( inst[pn]?.setj )
				{
					inst[pn].setj( msg[pn] )
				}
				else*/	inst[pn]	=msg[pn]
			}
		}
		return inst
	}


	/** Is called by JsonRevivr.
	 * @arg {any} userd -User data that can be added for any custom behaviour.
	 * 	It comes from JsonRevivr.userd . */

	static fromJSON( msg ,key ,userd )
	{
		const inst	=new this()

		return inst.setj( msg )
	}
}