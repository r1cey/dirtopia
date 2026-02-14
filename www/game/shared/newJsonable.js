export default( Base =Object )=>class Jable extends Base
{
	/**@static
	@var key */

	gkey()	{return this.constructor.key }


	// constructor(...args)	{ super(...args) }


	set( obj )	{return Object.assign( this, obj ) }

	///////////////////////////////////////////////////////////////////////


	static fromJSON(val, ...args )	{return new this(...args).set( val )}
}