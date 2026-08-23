import Bin from "./newBin.js"
import Board from "./newBoard.js"
import Map from './Map.js'

import Loc from '../Loc.js'

import vegdefs from './plants/defs.js'


/** An intuitive way is done to access bit values in bit map.
 * May be too slow for final product but for prototyping saves a lot of effort.
 *  
 * @todo Add water and rock values.
 * 
 * Also somehow add mulch layer to soil. Something for fungi to eat...
 * 
 * With high level of worms increasing soil structure.
 * Fungi eating hard plants and bacteria softer matter. */

const bmap	=
{
	ty	:
	{
		bits	:2
		,
		valsa	:["other", "rock", "soil", "water"]
		,
		_condsub	:
		{
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
					_condsub	:
					{
						veg	:
						{
							ty	:
							{
								bits	:7
								,		
								valsa	:
								[
									"none" ,"umbrtr" ,"sandpedro" , ,"apple" ,

									"cucumber"
								]
							},
							time	:{ bits	:12	}
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
	

	static Bin	=Base.newBin( 1, bmap )

	static bmap	=this.Bin.bmap


	//////////////////////////////////////////////////////////////////////////



	nemptycell_i( ic )
	{
		return this.bin.getval( ic, Ground.Bin.bmap.wsr.ty )
	}



	plantable_i( ic )
	{
		return this.issoil_i( ic) && ! this.isfloor_i( ic) &&

			this.getvegty_i(ic) === "none"
	}



	hasplant_i( ic )
	{
		return( this.issoil_i( ic) || this.iswater_i( ic)) &&
		
			! this.isfloor_i( ic) && this.getvegty_i( ic) !== "none"
	}


	getvegage_i( ic ,def )
	{
		def	??=vegdefs[ this.getvegty_i( ic) ]

		const fulltime	=this.getveglvl_i( ic)=this.getvegtime_i( ic)

		var age	=0

		for( var i =0 ; i < def.growth.length ; i++ )
		{

		}
	}


	///////////////////////////////////////////////////////////////////////////



	issoil_i( ic )
	{
		return this.bin.getval_str( ic ,Ground.Bin.bmap.wsr.ty )=== "soil"
	}


	setsoil_i( ic, lvl )
	{
		this.setwsr_i( ic, "soil" )

		this.setsoilhum_i( ic, lvl )
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


	isveg_i( ic )
	{
		const wsr	=this.getwsr_i( ic )

		return ( wsr === "soil" || wsr === "water" )&&
		
			this.getplfl_i( ic) === "plant"
	}

	setveg_i( ic, type, lvl =0, time =0 )
	{
		this.bin.setval_str( ic, Ground.Bin.bmap.plfl.ty, "plant" )

		this.bin.setval_str( ic, Ground.Bin.bmap.plfl.plant.ty, type )

		this.setveglvl_i( ic, lvl )

		this.bin.setval( ic, Ground.Bin.bmap.plfl.plant.time, time )
	}


	isfloor_i( ic )
	{
		return this.nemptycell_i( ic) &&
		
			this.bin.getval_str( ic ,Ground.Bin.bmap.plfl.ty )=== "floor"
	}



	///////////////////////////////////////////////////////////////////////////

	
	getwsr_i( ic )
	{
		return this.bin.getval_str( ic, Ground.Bin.bmap.wsr.ty )
	}
	setwsr_i( ic, str )
	{
		this.bin.setval_str( ic, Ground.Bin.bmap.wsr.ty, str )
	}

	
	getsoilhum_i(ic)
	{
		return this.bin.getval( ic, Ground.Bin.bmap.wsr.lvl )
	}
	setsoilhum_i(ic, lvl )
	{
		this.bin.setval( ic, Ground.Bin.bmap.wsr.lvl, lvl )
	}


	getwaterlvl_i( ic )
	{
		return this.bin.getval( ic, Ground.Bin.bmap.wsr.lvl ) + 1
	}


	getplfl_i( ic )
	{
		return this.bin.getval_str( ic, Ground.Bin.bmap.plfl.ty )
	}


	getvegty_i( ic )
	{
		return this.bin.getval_str( ic, Ground.Bin.bmap.plfl.plant.ty )
	}

	setvegty_i( ic, type )
	{
		this.bin.setval_str( ic, Ground.Bin.bmap.plfl.plant.ty, type )
	}


	getveglvl_i( ic )
	{
		return this.bin.getval( ic, Ground.Bin.bmap.plfl.plant.lvl )
	}

	setveglvl_i( ic, lvl )
	{
		this.bin.setval( ic, Ground.Bin.bmap.plfl.plant.lvl, lvl )
	}


	getvegtime_i( ic )
	{
		return this.bin.getval( ic, Ground.Bin.bmap.plfl.plant.time )
	}



	getshade_i( ic )
	{
		return this.maps.trees.getleafl_i( ic )
	}


	///////////////////////////////////////////////////////////////////////////


	
	static maxwater()
	{
		return ( this.maxhum() >> 1 ) + 1
	}

	static maxwat		=Ground.maxwater



	static maxhum()
	{
		return this.Bin.getmaxval( Ground.Bin.bmap.wsr.lvl )
	}



	static maxveglvl()
	{
		return Ground.Bin.getmaxval( Ground.Bin.bmap.plfl.plant.lvl )
	}


	static maxvegtime()
	{
		return Ground.Bin.getmaxval( Ground.Bin.bmap.plfl.plant.time )
	}
}