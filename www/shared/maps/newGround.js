import{ calc_bmap_typarrs } from "./newBin.js"
import Board from "./newBoard.js"
import Map from './Map.js'

import Loc from '../Loc.js'

import vegdefs from './plantdefs.js'


/** An intuitive way is done to access bit values in bit map.
 * May be too slow for final product but for prototyping saves a lot of effort.
 *  
 * @todo Add water and rock values.
 * 
 * Also somehow add mulch layer to soil. Something for fungi to eat...
 * 
 * With high level of worms increasing soil structure.
 * Fungi eating hard plants and bacteria softer matter. */

export const bmap	=
{
	ty	:
	{
		bits	:2
		,
		valsa	:["other", "rock", "soil", "water"]
		,
		soil	:
		{
			hum	:{ bits	:4 }
			,
			ph	:{ bits	:2 }
			,
			textur	:{ bits	:2 }
			,
			struct	:{ bits	:2 }
			,
			fungi	:{ bits	:2 }
			,
			bacter	:{ bits	:2 }
			,
			smallorg	:{ bits	:2 }
			,
			worms	:{ bits	:2 }
			,
			plfl	:
			{
				bits	:1
				,
				valsa	:[ "veg" ,"floor" ]
				,
				veg	:
				{
					ty	:
					{
						bits	:7
						,
						/** Make sure that "none" is zero index.
						 * Needed to calculate type in canopy map on
						 * Client machine*/
						valsa	:
						[
							"none" ,"umbrtr" ,"sandpedro" , ,"apple" ,

							"cucumber"
						]
					},
					age	:{ bits	:12	}
				},
				floor	:
				{
					floor	:{ bits	:6 }
					,
					compost	:
					{
						unknown	:{ bits	:13 }
					}
				}
			},
			walls	:
			{
				dir	:{ bits	:2 }
				,
				col	:{ bits	:3 }
			}
		},
		water	:
		{
			depth	:{ bits	:3 }
		}
	},
	chem	:
	{
		n	:{ bits	:4 },
		p	:{ bits	:4 },
		k	:{ bits	:4 },
		ca	:{ bits	:4 },
		mg	:{ bits	:4 },
		na	:{ bits	:4 },
		fe	:{ bits	:4 },
		cu	:{ bits	:4 }
		/*	S ?	Cl ? Zn	Mn */
	}
}

const typarrszs	=calc_bmap_typarrs( bmap )


/** Base class for Ground Map. Depending if it extends Map or Board it'll
 * be able to use Locations or not.
 * 
 * In either case, don't use Obj since in Board it's just an array and
 * in Map the access is through Vec strings.
 * 
 * @arg {Board|Map} Base */

export default( Base )=>class Ground extends Base
{
	get isgr()	{return this }
	

	static Bin	=Base.newBin( 1, bmap ,typarrszs )

	static bmap	=this.Bin.bmap


	//////////////////////////////////////////////////////////////////////////



	nemptycell_i( ic )
	{
		return this.bin.getval( ic, bmap.ty )
	}



	plantable_i( ic )
	{
		return this.bin.tryval_str( ic ,bmap.ty.soil.plfl.veg.ty ) === "none"
	}


	/** @return {string|null} -The plant type if present, otherwise null. */

	issoilplant_i( ic )
	{
		const ty	=this.bin.tryval_str( ic ,bmap.ty.soil.plfl.veg.ty )

		return ty && ty !== "none" ? ty : null
	}


	/** Return the current growth stage of the soil plant.
	 * Look in vegdefs.json for more info. */

	getsoilvegstage_i( ic ,vegty =this.getsoilvegty_i( ic ))
	{
		const stages	=vegdefs[vegty].growth

		const curage	=this.getsoilvegage_i( ic )

		var age =0

		for(var i=0,len= stages.length ;i<len;i++)
		{
			age	+= stages[i]

			if( age >curage)	return i
		}
		return i
	}


	///////////////////////////////////////////////////////////////////////////



	issoil_i( ic )
	{
		return this.bin.tryval_str( ic ,bmap.ty )=== "soil"
	}


	setsoil_i( ic, hum =0 )
	{
		this.settype_i( ic, "soil" )

		this.setsoilhum_i( ic, hum )
	}



	setwater_i( ic, lvl )
	{
		this.bin.setval_str( ic ,Ground.Bin.bmap.wsr.ty ,"water" )

		this.bin.setval( ic, Ground.Bin.bmap.wsr.lvl, lvl - 1 )
	}

	
	iswater_i( ic )
	{
		return this.bin.getval_str( ic ,Ground.Bin.bmap.wsr.ty )=== "water"
	}


	setsoilveg_i( ic ,type ,age =0 )
	{
		const{ bin }	=this

		const{ bmap }	=Ground.Bin

		bin.setval_str( ic ,bmap.ty ,"soil" )

		bin.setval_str( ic, bmap.ty.soil.plfl, "plant" )

		bin.setval_str( ic, bmap.ty.soil.plfl.veg.ty, type )

		bin.setval( ic, bmap.ty.soil.plfl.veg.age, age )
	}


	isfloor_i( ic )
	{
		return this.nemptycell_i( ic) &&
		
			this.bin.getval_str( ic ,Ground.Bin.bmap.plfl.ty )=== "floor"
	}



	///////////////////////////////////////////////////////////////////////////

	
	gettype_i( ic )
	{
		return this.bin.getval_str( ic, bmap.ty )
	}
	settype_i( ic, str )
	{
		this.bin.setval_str( ic, bmap.ty, str )
	}

	
	getsoilhum_i( ic )
	{
		return this.bin.getval( ic, bmap.ty.soil.hum )
	}
	setsoilhum_i( ic ,lvl )
	{
		this.bin.setval( ic, bmap.ty.soil.hum, lvl )
	}


	getwaterlvl_i( ic )
	{
		return this.bin.getval( ic, bmap.ty.water.depth ) + 1
	}


	getplfl_i( ic)
	{
		return this.bin.getval_str( ic, bmap.ty.soil.plfl )
	}


	trysoilvegty_i( ic )
	{
		return this.bin.tryval_str( ic ,bmap.ty.soil.plfl.veg.ty)
	}
	getsoilvegty_i( ic )
	{
		return this.bin.getval_str( ic ,bmap.ty.soil.plfl.veg.ty)
	}



	getsoilvegage_i( ic )
	{
		return this.bin.getval( ic, bmap.ty.soil.plfl.veg.age )
	}



	getshade_i( ic )
	{
		return this.maps.trees.getleafl_i( ic )
	}


	///////////////////////////////////////////////////////////////////////////


	
	static maxwaterlvl()
	{
		return this.Bin.getmaxval( bmap.ty.water.depth) +1
	}

	static maxwat		=Ground.maxwater



	static maxsoilhum()
	{
		return this.Bin.getmaxval( bmap.ty.soil.hum)
	}


	static maxvegage()
	{
		return Ground.Bin.getmaxval( bmap.ty.soil.plfl.veg.age )
	}
}