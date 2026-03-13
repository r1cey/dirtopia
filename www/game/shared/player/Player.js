import PV	from "./PlVis.js"

import{ nonenum } from "../utils.js"



export default class Pl extends PV
{
	vision	=50

	water	=1

	heat	=0


	///////////////////////////////////////////////////////////////////////////////


	
	constructor( pls )
	{
		super()

		nonenum( this ,"pls" ,pls )
	}


	///////////////////////////////////////////////////////////////////////////////


	map()
	{
		return this.pls.game.maps.loc2map( this.loc )
	}


	///////////////////////////////////////////////////////////////////////////////


	sees( loc )
	{
		const pl	=this

		const dist	=pl.loc.disth( loc )

		return dist <= pl.vision
	}


	/** Can't see self */

	seespl( pl2 )
	{
		if( this === pl2 )	return false

		return this.sees( pl2.loc )
	}



	subwater( n )
	{
		return this.setwater( this.water - n )
	}


	setwater( lvl )
	{
		lvl	=lvl<0 ? 0 : lvl>1 ? 1 : lvl
		
		return this.water	=lvl
	}



	addheat( n )
	{
		return this.setheat( this.heat + n )
	}


	setheat( lvl )
	{
		lvl	=lvl<0 ? 0 : lvl>1 ? 1 : lvl

		return this.heat	=lvl
	}


	///////////////////////////////////////////////////////////////////////////



	candrop( item )
	{
		return this.map().getloc4item( this.loc )
	}
		
	drop( item )
	{
		const pl	=this

		const map	=pl.map()

		const loc	=map.getloc4item( pl.loc )

		if( loc )
		{
			map.obj.set( loc ).item	=item
		}
		return loc
	}


	/*
	Pl.prototype. additemcnt	=function( path ,item ,len )
	{
		var cnt	=this

		var nextit	=[,]

		for(var i =0, len =path.length;i<len; i += nextit[1] )
		{
			cnt.getobj( path ,i ,nextit )

			cnt	=nextit[0]
		}
		return cnt.additem( item ,len )
	}



	Pl.prototype. delitem	=function( item, num )
	{
		item.del(num)	? delete this.inv[item.constructor.name]	: 0
	}*/




	///////////////////////////////////////////////////////////////////////////
}