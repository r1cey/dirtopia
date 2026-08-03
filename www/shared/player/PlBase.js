import Loc from "../Loc.js"
import Col from '../Color.js'
import newISlot	from "../items/newInvSlot.js"
import newJable from "../newJsonable.js"


/** Has minimum information, all other Player classes
 * have to build on top of this. */

export default class PlBase	extends newJable(newISlot())
{
	name

	r	=0.62

	col	=new Col(0,100,50)
	
	/** when this is derived on client, it can become a getter function */

	loc	=new Loc(0,0,0)
	

	static key	="pl"

	static allowed	=
	{
		belt	:1
		,
		seedbag	:10
	}
	

	///////////////////////////////////////////////////////////////////////////



	/*constructor( name , r =0.62 ,loc =new Loc(0,0,0) ,col =new Col(0,100,50) )
	{
		super({ name ,r , loc ,col })
	}*/


	///////////////////////////////////////////////////////////////////////////
	


	get ispl()	{return this }


	///////////////////////////////////////////////////////////////////////////



	canreach( dest )	{return this.loc.disth( dest ) <= 1 }


	///////////////////////////////////////////////////////////////////////////



	mov( dest )
	{
		const pl	=this

		const{ loc }	=pl

		const map	=pl.gmap()
		
		map.obj.del( loc, "pl" )

		map.obj.set(dest).pl	=this

		loc.set( dest )

		if( dest.h === 0 )
		{
			map.fore(( loc )=>
			{
				if( map.iswater(loc) )
				{
					/**@todo reinstate later */
					// pl.setwater( 1 )

					return true
				}
			}
			,1 ,loc )
		}
	}


	// toJSON( key )	{return  /^\\d+$/.test(key) ? this.name : this 	}

	tonavmsg()	{return this.name }
}