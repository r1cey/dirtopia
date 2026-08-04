import newJable from "../newJsonable.js"

// import newPathable from "../newPathable.js"
import newAct	from "../newActionable.js"


/** A volume unit is 125 cubic mm which is a sunflower seed */

export var mm3perunit	=125

export var key	="item"


export default class It	extends newAct( newJable() )
{
	static key	=key

	/**@static
	@var vol */
	
	// static mm3pu	=mm3perunit

	get isitem()	{return this }



	vol()	{return this.constructor.vol }

	
	/**@method calcvol */


	toJSON( jkey )
	{
		return jkey===key ? [ this.constructor.key ,this ] : this
		
			///^\d+$/.test( jkey ) ? this.gkey() : this
	}

	tonavmsg()	{return this.gkey() }
	

	get [Symbol.toStringTag]() {
        return this.constructor.name;
    }
}