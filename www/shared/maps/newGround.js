import Bin from "./newBin.js"
import Board from "./newBoard.js"
import Map from './Map.js'

import Loc from '../Loc.js'


var bmap	=
[
	{
		name	:"wsr"
		,
		subd	:
		[
			{
				name	:"ty"
				,
				bits	:2
				,
				valsa	:["empty", "rock", "soil", "water"]
			},
			{
				name	:"lvl"
				,
				bits	:4
			}
		]
	},
	{
		name	:"mine"
		,
		subd	:
		[
			{ name: "n", bits	:4 },
			{ name: "p", bits	:4 },
			{ name: "k", bits	:4 },
			{ name: "ca", bits	:4 },
			{ name: "mg", bits	:4 },
			{ name: "na", bits	:4 },
			{ name: "fe", bits	:4 },
			{ name: "cu", bits	:4 },
			/*	S ?	Cl ? Zn	Mn */
		]
	},
	{
		name	:"plfl"
		,
		subd	:
		[
			{
				name	:"ty"
				,
				bits	:1
				,
				valsa	:["plant", "floor"]
			},
			{
				condsubd	:
				{
					"plant"	:
					[
						{
							name	:"ty"
							,
							bits	:7
							,
							valsa	:["none","umbrtr","sandpedro",,"apple","cucumber"]
						},
						{
							name	:"lvl"
							,
							bits	:5	//0-seed,1-tiny,2-walk over,3-difficult walk,
								//4-no walk,no branch, 5-first branch
						},
						{
							name	:"time"
							,
							bits	:7	//12 minutes * 128 = 25.6hours
						}
					]
				}
			}
		]
	},
	{
		name	:"walls"
		,
		subd	:
		[
			{
				name	:"dir"
				,
				bits	:2
			},
			{
				name	:"col"
				,
				bits	:3
			}
		]
	}
]


/** @returns {class} */

export default( Base )=>class Gr extends Base
{
	get isgr()	{return this }
	

	static Bin	=Base.newBin( 1, bmap )

	static bmap	=this.Bin.bmap


	//////////////////////////////////////////////////////////////////////////



	nemptycell_i( ic )
	{
		return this.bin.getval( ic, Gr.Bin.bmap.wsr.ty )
	}



	plantable_i( ic )
	{
		return this.getwsr_i(ic) === "soil" && this.getplfl_i(ic) === "plant" &&
			this.getvegty_i(ic) === "none"
	}

	
	getwsr_i( ic )
	{
		return this.bin.getval_str( ic, Gr.Bin.bmap.wsr.ty )
	}
	setwsr_i( ic, str )
	{
		this.bin.setval_str( ic, Gr.Bin.bmap.wsr.ty, str )
	}


	setsoil_i( ic, lvl )
	{
		this.setwsr_i( ic, "soil" )

		this.setsoilhum_i( ic, lvl )
	}


	issoil_i( ic )
	{
		return this.bin.getval_str( ic, Gr.Bin.bmap.wsr.ty ) === "soil"
	}

	
	getsoilhum_i(ic)
	{
		return this.bin.getval( ic, Gr.Bin.bmap.wsr.lvl )
	}
	setsoilhum_i(ic, lvl )
	{
		this.bin.setval( ic, Gr.Bin.bmap.wsr.lvl, lvl )
	}



	setwater_i( ic, lvl )
	{
		this.bin.setval_str( ic, Gr.Bin.bmap.wsr.ty, "water" )

		this.bin.setval( ic, Gr.Bin.bmap.wsr.lvl, lvl - 1 )
	}

	
	iswater_i( ic )
	{
		return this.bin.getval_str( ic, Gr.Bin.bmap.wsr.ty ) === "water"
	}


	getwaterlvl_i( ic )
	{
		return this.bin.getval( ic, Gr.Bin.bmap.wsr.lvl ) + 1
	}



	setveg_i( ic, type, lvl =0, time =0 )
	{
		this.bin.setval_str( ic, Gr.Bin.bmap.plfl.ty, "plant" )

		this.bin.setval_str( ic, Gr.Bin.bmap.plfl.plant.ty, type )

		this.setveglvl_i( ic, lvl )

		this.bin.setval( ic, Gr.Bin.bmap.plfl.plant.time, time )
	}


	getplfl_i( ic )
	{
		return this.bin.getval_str( ic, Gr.Bin.bmap.plfl.ty )
	}


	getvegty_i( ic )
	{
		return this.bin.getval_str( ic, Gr.Bin.bmap.plfl.plant.ty )
	}


	getveglvl_i( ic )
	{
		return this.bin.getval( ic, Gr.Bin.bmap.plfl.plant.lvl )
	}

	setveglvl_i( ic, lvl )
	{
		this.bin.setval( ic, Gr.Bin.bmap.plfl.plant.lvl, lvl )
	}


	getvegtime_i( ic )
	{
		return this.bin.getval( ic, Gr.Bin.bmap.plfl.plant.time )
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

	static maxwat		=Gr.maxwater



	static maxhum()
	{
		return this.Bin.getmaxval( Gr.Bin.bmap.wsr.lvl )
	}



	static maxveglvl()
	{
		return Gr.Bin.getmaxval( Gr.Bin.bmap.plfl.plant.lvl )
	}


	static maxvegtime()
	{
		return Gr.Bin.getmaxval( Gr.Bin.bmap.plfl.plant.time )
	}
}