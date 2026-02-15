import newJable from "../newJsonable.js"

// import newPathable from "../newPathable.js"


/** A volume unit is 125 cubic mm which is a sunflower seed */

export var mm3perunit	=125

export var key	="item"


export default class It	extends newJable()
{
	static key	=key

	/**@static
	@var vol */
	
	// static mm3pu	=mm3perunit



	vol()	{return this.constructor.vol }

	
	/**@method calcvol */


	toJSON( jkey )
	{
		return jkey===key ? [ this.constructor.key ,this ] : this
	}
}