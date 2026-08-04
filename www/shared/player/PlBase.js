import Loc from "../Loc.js"
import Col from '../Color.js'
import newISlot	from "../items/newInvSlot.js"
import newJable from "../newJsonable.js"
import newAct	from "../newActionable.js"

import Nav	from "../Nav.js"

import{ nonenum } from "../utils.js"


/** Has minimum information, all other Player classes
 * have to build on top of this. */

export default class PlBase	extends newAct( newJable(newISlot()) )
{
	name

	r	=0.62

	col	=new Col(0,100,50)
	
	/** when this is derived on client, it can become a getter function */

	loc	=new Loc(0,0,0)

	/**@var pls -added as hidden */

	/**@var nav -added as hidden */
	

	static key	="pl"

	static allowed	=
	{
		belt	:1
		,
		seedbag	:10
	}
	static
	{
		this.acts["mov"]	=
		[
			function test( nav ,pl ,dir )
			{
				return this.canmov( this.loc.c().neighh( dir ))
			},
			function act( nav ,pl ,dir )
			{
				this.mov( this.loc.c().neighh( dir ))
			}
		]
	}
	

	///////////////////////////////////////////////////////////////////////////


	
	constructor( pls )
	{
		super()

		nonenum( this ,"pls" ,pls )
		
		nonenum( this ,"nav" ,new Nav([ pls ,this ]))
	}


	///////////////////////////////////////////////////////////////////////////
	


	get ispl()	{return this }


	///////////////////////////////////////////////////////////////////////////



	canreach( dest )	{return this.loc.disth( dest ) <= 1 }


	canmov( dest ,map =this.gmap() )
	{
		return this.gmap().canplmov( dest ,this )
	}


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


	actrun( key ,...args )
	{
		return super.actrun( key ,this.nav ,this ,...args )
	}
}