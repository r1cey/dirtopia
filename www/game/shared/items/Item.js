import newJable from "../newJsonable.js"

// import newPathable from "../newPathable.js"


/** A volume unit is 125 cubic mm which is a sunflower seed */

export var mm3perunit	=125


export default newJable( class It
{
	static key	="item"

	/**@static
	@var vol */
	
	// static mm3pu	=mm3perunit



	vol()	{return this.constructor.vol }

	
	/**@method calcvol */
})