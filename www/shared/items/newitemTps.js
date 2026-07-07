// import newstacks	from "./newstacks.js"
// import newcnts	from "./newcnts.js"
// import newblocks	from "./newblocks.js"
// import newbags	from "./newbags.js"
import { mm3perunit as mm3pu } from "./Item.js"

// import Loc	from "../Loc.js"
import V	from "../Vec.js"
import{ rnd }	from "../utils.js"


export default({ Block ,Stack ,Organic ,StackCnt ,Bag ,Box ,SoftRcpt ,HardRcpt })=>
{
	const itTps	={}

	addsrcpt( "belt" ,15*15*10 ,
		{
			"multi"	:1,
			"seedbag"	:5
		}
	)
	addbag( "seedbag", 40*25*20 ,55*45*45 ,Bag )

	addst( "cuc_seeds" ,125 )

	addst( "multi" ,30*20*150 )

	addblock( "dewd" ,class Dewd extends Block
		{
			dir


			constructor()
			{
				super()

				this.dir	??=rnd(6)
			}

			sim_rot( ddir )
			{
				return V.roth( this.dir, ddir )
			}
		}
	)
	for(var key in itTps )
	{
		Object.defineProperty( itTps[key] ,'name' ,{ value: key })
	}
	return itTps



	function addst( key ,vol ,Base =Stack )
	{
		itTps[key]	=class extends Base
		{
			static key	=key

			static vol	=Math.ceil( vol / mm3pu )
		}
	}

	function addbag( key ,vol ,bagvol ,Base )
	{
		cnt2stack( itTps[key] =class extends Base
			{
				static key	=key

				static vol	=Math.ceil( vol / mm3pu )

				static boxvol	=Math.ceil( bagvol / mm3pu )
			}
		)
	}

	function addsrcpt( key ,vol ,allow )
	{
		var cl	=itTps[key]	=class extends SoftRcpt
		{
			static key	=key

			static vol	=Math.ceil( vol / mm3pu )

			static allowed	=allow
		}
		cnt2stack( cl )
	}

	function addblock( key ,Base )
	{
		itTps[key]	=class extends Base
		{
			static key	=key
		}
	}



	///////////////////////////////////////////////////////////////////////////


	function cnt2stack( Cnt )
	{
		const SC	=Cnt.newStck( StackCnt )

		itTps[SC.key]	=SC
	}
}