import newGround	from "./newGround.js"

import BoMS	from "./BoardMShift.js"

import vegdefs	from "./plantdefs.js"


/** Complete Ground class.
 * 
 * Can calculate neighbors.
 * 
 * Also, decided to use this class if same method can have a lower level
 * and higher level versions. Here being the higher level version. */

export default( Map )=>class GroundMap extends newGround(Map)
{
	trees

	get tr()	{return this.trees }


	static MapShiftBo	=newGround( BoMS )


	///////////////////////////////////////////////////////////////////////////


	
	nemptycell( loc )
	{
		return this.nemptycell_i( this.ic(loc) )
	}



	canplmov( dest, pl )
	{
		const ic	=this.ic(dest)

		if( ! this.nemptycell_i(ic) || ! super.canplmov( dest, pl ))
		{
			return false
		}
		const vegty	=this.issoilplant_i( ic )
		
		if( vegty )
		{
			const vegdef	=vegdefs[vegty]

			switch( vegdef.sz )
			{
				case "tree" :

					const age	=this.getsoilvegstage_i( ic ,vegdef )

					if( age > 3 )	return false

				/** @todo Add bush */
			}
		}
		return true
	}


	/** @todo Old. Needs updating. */

	climbable( loc )
	{
		var ic	=this.ic(loc)

		return this.getsoilvegty_i(ic) === "apple" && this.getveglvl_i(ic) > 3
	}


	///////////////////////////////////////////////////////////////////////////


	/** Kill plant if block item is set */

	setitem( loc ,item )
	{
		super.setitem( loc ,item )

		const ic	=this.ic(loc)

		if( item?.isblock && this.isdryplant_i( ic) && this.getveglvl_i( ic) > 0 )
		{
			/** @todo Return nutrients to ground */

			this.setvegty_i( ic ,"none" )
		}
	}

	/**
	@returns	-If player is the only thing potentially stopping the block
		return -1. Otherwise return 1 or 0.*/

	canaddblock( dest )
	{
		switch( this.gettype(dest) )
		{
			case "water" :
			
			case "none" :

				return 0
		}
		const veglvl	=this.getveglvl(dest)

		const desto	=this.obj.g(dest)

		if( veglvl > 1 || desto?.item )	return 0

		if( desto?.pl )	return -1

		return 1
	}


	/////////////////////////////////////////////////////////////////////////////


	/** @todo How many items can be put on ground? */

	canadditem( loc ,item ,len )
	{
		const cello	=this.obj.g(loc)

		const curitem	=cello?.item

		if( ! super.canadditem( loc, item, len, curitem ) ||

			( item.isblock && this.canaddblock(loc) <= 0 ))
		{
			return 0
		}
		switch( this.gettype(loc) )
		{
			case "water" :
			
			case "none" :

				return 0
		}
		const veglvl	=this.getveglvl(loc)

		if( veglvl > 3 )	return 0

		var max	=99

		if( cello?.pl  || veglvl > 0 )	max	=10
 
		if( curitem )	max	-= curitem.len

		return Math.min( len, max < 0 ? 0 : max )
	}



	///////////////////////////////////////////////////////////////////////////


	/** @todo Different items have different allowed len. */

	plantable( loc )
	{
		return this.plantable_i( this.ic( loc )) && this.canplmov( loc )
	}



	issoil( loc )
	{
		return this.issoil_i( this.ic( loc ))
	}


	setsoil( loc, lvl )
	{
		if( lvl < 0 )	lvl	=0

		if( lvl > GroundMap.maxhum() )	lvl	=GroundMap.maxhum()

		this.setsoil_i(this.ic( loc ), lvl )
	}

	

	setwater( loc, lvl )
	{
		if( lvl < 1 )	lvl	=1

		if( lvl > GroundMap.maxwater() )	lvl	=GroundMap.maxwater()

		this.setwater_i(this.ic( loc ), lvl )
	}


	iswater(loc)
	{
		return this.iswater_i(this.ic(loc))
	}


	getwaterlvl( loc )
	{
		var ic	=this.ic(loc)

		return (this.gettype_i(ic) === "water") * this.getwaterlvl_i(ic)
	}


	///////////////////////////////////////////////////////////////////////////



	gettype( loc )
	{
		return this.gettype_i(this.ic(loc))
	}
	settype( loc, str )
	{
		return this.settype_i(this.ic(loc), str )
	}

	
	getsoilhum( loc )
	{
		return this.getsoilhum_i(this.ic( loc ))
	}
	setsoilhum( loc, lvl )
	{
		return this.setsoilhum_i(this.ic( loc ), lvl )
	}



	setveg( loc, type, lvl, age )
	{
		this.setveg_i(this.ic(loc), type, lvl, age )
	}


	/** Can return "none" if not a plant */

	getsoilvegty( loc )
	{
		const ic	=this.ic(loc)

		return this.getsoilvegty_i( ic)
	}


	/**@returns If not a plant, returns -1 */

	getsoilvegage( loc )
	{
		const m	=this

		const ic	=m.ic( loc)

		return m.issoilplant_i( ic)	? m.getsoilvegage_i( ic) :-1
	}

	setveglvl( loc, lvl )
	{
		this.setveglvl_i( this.ic(loc), lvl )
	}


	getshade( loc )
	{
		return this.getshade_i( this.ic(loc) )
	}
}
