export default function( Base )
{
	class Jable extends Base
	{
		/**@static
		@var key */

		gkey()	{return this.constructor.key }

		set( obj )	{return Object.assign( this, obj ) }

		///////////////////////////////////////////////////////////////////////


		static fromJSON(val, ...args )	{return new this(...args).set( val )}
	}
	return Jable
}