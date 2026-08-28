import{ calc_bmap_typarrs }from "./newBin.js"

import Map from './Map.js'

import V from "../Vec.js"


/** Is in charge of the upper level of game. Has branches, fruits,
 * everything that's above player */

export const bmap	=
{
	floor	:
	{
		ty	:
		{
			bits	:2
			,
			valsa	:["none", "trunk", "branch", "platform"]
			,
			"branch"	:
			{
				dir	:
				{
					bits	:3
				}
			}
		}
	},
	leaves	:
	{
		low	:
		{
			bits	:1
		},
		top	:
		{
			bits	:1
		}
	}
}

const typarrszs	=calc_bmap_typarrs( bmap )



export default( Base )=>class Tr extends Base
{
	static Bin	=Base.newBin( 2, bmap, typarrszs )


	///////////////////////////////////////////////////////////////////////////////


	/** @todo Eventually make plantable */

	plantable( ic )	{return false }


	///////////////////////////////////////////////////////////////////////////////

	

	setfloorty_i( ic, type )
	{
		this.bin.setval_str( ic, bmap.floor.ty, type )
	}


	getfloorty_i( ic )
	{
		return this.bin.getval_str( ic, bmap.floor.ty )
	}

	

	setbranch_i( ic, dir )
	{
		this.setfloorty_i( ic, "branch" )

		this.setbrdir_i( ic, dir )
	}


	/** Might not be necessary. When using ic for checking this? */

	isnextbr_i( ic, dir )
	{
		return this.getfloorty_i(ic)==="branch" && this.getbrdir_i(ic)===dir
	}


	setbrdir_i( ic, dir )
	{
		this.bin.setval( ic, bmap.floor.ty.branch.dir , dir )
	}

	getbrdir_i( ic )
	{
		return this.bin.getval( ic, bmap.floor.ty.branch.dir )
	}


	setleafl_i( ic, val )
	{
		this.bin.setval( ic, Tr.Bin.bmap.leaves.low, val )
	}
	setleafh_i( ic, val )
	{
		this.bin.setval( ic, Tr.Bin.bmap.leaves.top, val )
	}
	getleafl_i( ic )
	{
		return this.bin.getval( ic, Tr.Bin.bmap.leaves.low )
	}
	getleafh_i( ic )
	{
		return this.bin.getval( ic, Tr.Bin.bmap.leaves.top )
	}
}