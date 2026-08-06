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
	/*static
	{
		this.acts["mov"]	=
		[
			function test( nav ,pl ,dest )
			{
				return this.canmov( dest )
			},
			function act( nav ,pl ,dest )
			{
				this.mov( dest )
			}
		]
	}*/
	

	///////////////////////////////////////////////////////////////////////////


	
	constructor( pls )
	{
		super()

		nonenum( this ,"pls" ,pls )
		
		nonenum( this ,"nav" ,new Nav([ pls ,this ]))
	}


	///////////////////////////////////////////////////////////////////////////
	


	get ispl()	{return this }


	ggame()	{return this.pls.game }


	///////////////////////////////////////////////////////////////////////////



	canreach( dest )	{return this.loc.disth( dest ) <= 1 }


	canmov( dest ,map =this.gmap() )
	{
		return this.gmap().canplmov( dest ,this )
	}


	///////////////////////////////////////////////////////////////////////////


	/** Updates map obj too */

	mov( dest )
	{
		const pl	=this

		const{ loc }	=pl

		// const map	=pl.gmap()

		pl.ggame().maps.movobjp( loc ,"pl" ,dest )
		
		loc.set( dest )
/*
		if( dest.h === 0 )
		{
			map.fore(( loc )=>
			{
				if( map.iswater(loc) )
				{
					/**@todo reinstate later *
					// pl.setwater( 1 )

					return true
				}
			}
			,1 ,loc )
		}*/
	}


	// toJSON( key )	{return  /^\\d+$/.test(key) ? this.name : this 	}

	tonavmsg()	{return this.name }

/*
	actrun( key ,arg )
	{
		return super.actrun( key ,this.nav ,this ,arg )
	}

	testrun( key ,arg )
	{
		return super.testact( key ,this.nav ,this ,arg )
	}*/
}