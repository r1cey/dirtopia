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
		const vegty	=this.issoilveg_i( ic )
		
		if( vegty )
		{
			const vegdef	=vegdefs[vegty]

			switch( vegdef.sz )
			{
				case "tree" :

					const stage	=this.getsoilvegstage_i( ic ,vegty)

					if( stage > 3 )	return false

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


	/////////////////////////////////////////////////////////////////////////////



	canadditem( loc ,item ,len)
	{
		const ic	=this.ic(loc)

		const ctype	=this.gettype_i( ic)
		
		switch( ctype)
		{
			case "water" :
			
			case "none" :

				return 0

			case "rock" :

				return super.canadditem( loc ,item ,len)

			case "soil" :

				const veglvl	=this.getsoilvegstage_i( ic)

				if( veglvl > 3)	return 0

				else if( veglvl > 1)
				{
					if( item.isblock)	return 0

					return Math.min( 10 ,super.canadditem( loc ,item ,len))
				}
				else if( veglvl > 0)
				{
					if( item.isblock)	return 1

					return Math.min( 10 ,super.canadditem( loc ,item ,len))
				}
				return super.canadditem( loc ,item ,len)
		}
	}


	/** Kill plant if block item is set */

	additem( loc ,item)
	{
		const ic	=this.ic( loc)

		super.additem( loc ,item)

		if( item.isblock && this.trysoilvegstage_i( ic) > 0)
		{
			/** @todo Return nutrients to ground */

			this.setsoilveg_i( ic ,"none")
		}
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



	setsoilveg( loc ,type ,age )
	{
		this.setsoilveg_i( this.ic( loc) ,type ,age)
	}


	/** Can return "none" if not a plant */

	getsoilvegty( loc )
	{
		const ic	=this.ic(loc)

		return this.getsoilvegty_i( ic)
	}


	/**@returns If not a plant, returns -1 *

	getsoilvegage( loc )
	{
		const m	=this

		const ic	=m.ic( loc)

		return m.issoilveg_i( ic)	? m.getsoilvegage_i( ic) :-1
	}

	/*setveglvl( loc, lvl )
	{
		this.setveglvl_i( this.ic(loc), lvl )
	}*/


	getshade( loc )
	{
		return this.getshade_i( this.ic(loc) )
	}
}
