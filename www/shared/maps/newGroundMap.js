import newGround	from "./newGround.js"

import BoMS	from "./BoardMShift.js"



export default( Map )=>class GM extends newGround(Map)
{
	trees

	get tr()	{return this.trees }


	static MapShiftBo	=newGround( BoMS )



	climbable( loc )
	{
		var ic	=this.ic(loc)

		return this.getvegty_i(ic) === "apple" && this.getveglvl_i(ic) > 3
	}

	///////////////////////////////////////////////////////////////////////////


	canplmov( dest, pl )
	{
		var ic	=this.ic(dest)

		var plfl	=GM.Bin.bmap.plfl

		var plty	=this.bin.getval_str( ic, plfl.plant.ty )

		return this.nemptycell_i(ic) && Map.prototype.canplmov.call(this, dest, pl ) &&
		
			! ( this.bin.getval_str( ic, plfl.ty ) === "plant" &&
				
				( plty === "apple" || plty === "umbrtr" ) &&
			
				this.bin.getval( ic, plfl.plant.lvl ) > 3 )
	}


	///////////////////////////////////////////////////////////////////////////


	
	nemptycell( loc )
	{
		return this.nemptycell_i( this.ic(loc) )
	}



	plantable( loc )
	{
		const mapo	=this.obj.g(loc)

		const item	=mapo?.item

		return this.plantable_i( this.ic( loc )) && !mapo?.pl && !item?.isblock
	}



	///////////////////////////////////////////////////////////////////////////



	getwsr( loc )
	{
		return this.getwsr_i(this.ic(loc))
	}
	setwsr( loc, str )
	{
		return this.setwsr_i(this.ic(loc), str )
	}



	setsoil( loc, lvl )
	{
		if( lvl < 0 )	lvl	=0

		if( lvl > GM.maxhum() )	lvl	=GM.maxhum()

		this.setsoil_i(this.ic( loc ), lvl )
	}


	issoil( loc )
	{
		return this.issoil_i( this.ic( loc ))
	}

	
	getsoilhum( loc )
	{
		return this.getsoilhum_i(this.ic( loc ))
	}
	setsoilhum( loc, lvl )
	{
		return this.setsoilhum_i(this.ic( loc ), lvl )
	}

	

	setwater( loc, lvl )
	{
		if( lvl < 1 )	lvl	=1

		if( lvl > GM.maxwater() )	lvl	=GM.maxwater()

		this.setwater_i(this.ic( loc ), lvl )
	}


	iswater(loc)
	{
		return this.iswater_i(this.ic(loc))
	}


	getwaterlvl( loc )
	{
		var ic	=this.ic(loc)

		return (this.getwsr_i(ic) === "water") * this.getwaterlvl_i(ic)
	}



	setveg( loc, type, lvl, time )
	{
		this.setveg_i(this.ic(loc), type, lvl, time )
	}


	getvegty( loc )
	{
		return this.getvegty_i( this.ic(loc))
	}


	getveglvl( loc )
	{
		return this.getveglvl_i( this.ic(loc))
	}

	setveglvl( loc, lvl )
	{
		this.setveglvl_i( this.ic(loc), lvl )
	}

	getvegtime( loc )
	{
		return this.getvegtime_i( this.ic(loc) )
	}


	getshade( loc )
	{
		return this.getshade_i( this.ic(loc) )
	}
}
