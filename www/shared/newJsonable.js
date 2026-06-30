// import{ key as ITEMK }	from "./items/Item.js"

const ITEMK	="item"



export default( Base =Object )=>class Jable extends Base
{
	/**@static
	@var key */

	gkey()	{return this.constructor.key }

	/**@static
	@var apprps	=[[ key , def ],[ key ]] */



	///////////////////////////////////////////////////////////////////////



	/*constructor( vals )
	{
		super()

		const apprps	=this.constructor.apprps

		if( ! apprps )	return

		for(var prop of apprps )
		{
			var[ key ,def ]	=prop

			if( vals && Object.hasOwn(  vals ,key ))
			{
				this[key]	=vals[key]
			}
			else	this[key]	=def?.( this )
		}
	}*/


	///////////////////////////////////////////////////////////////////////



	setj( msg )
	{
		const inst	=this

		for(var pn in msg )
		{
			var methn	=pn+"_setj"

			if( inst.methn )	inst[methn]( msg[pn] )

			else if( inst.propertyIsEnumerable( pn ))
			{
				if( pn === ITEMK )
				{
					inst[pn]	=msg[pn]
				}
				else if( inst[pn]?.setj )
				{
					inst[pn].setj( msg[pn] )
				}
				else	inst[pn]	=msg[pn]
			}
		}
		return inst
	}



	static fromJSON( msg ,key ,...args )
	{
		const inst	=new this( ...args )

		return inst.setj( msg )
	}
}