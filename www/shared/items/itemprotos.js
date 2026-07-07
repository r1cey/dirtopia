import Block	from "./newBlock.js"
import Stack from "./Stackable.js"
import Cont	from "./newContainer.js"
import Bag	from "./newBag.js"
import Loc	from "../Loc.js"
import{ rnd }	from "../utils.js"


const tps	=types	=
{
	"sslot"	:new Set([ "slot" ,"soft" ])
	,
	"stack"	:new Set([ "stack" ])
	,
	"bag"	:new Set([ "bag" ,"soft" ])
}


const arr	=
[
	{
		key	:"belt"
		,
		vol	:15*15*10
		,
		types	:tps.sslot
		,
		allow	:
		{
			"multi"	:1 ,
			"seedbag"	:5
		}
	},
	{
		key	:"seedbag"
		,
		vol	:40*25*20
		,
		types	:tps.bag
		,
		boxvol	:55*45*45
	},
	{
		key	:"cuc_seeds"
		,
		vol	:1
	}
	,
	{
		key	:"multi"
		,
		vol	:30*20*150
	}
	,
	{
		key	:"dewd"
		,
		vol	:500000
		,
		types	:new Set([ "block" ,"dir" ])
	}
]
const obj	={}

for(var i=0; i<arr.length; i++)
{
	var it	=arr[i]

	if( ! it.types )	it.types	=tps.stack

	obj[it.key]	=it
}
export default obj


/*

export default({ Block ,Stack ,Organic ,StackCnt ,Bag ,Box ,SoftRcpt ,HardRcpt })=>
{
	const t	={}


	t.Dewd	=class extends Block
	{
		dir

		static vol	=500000

		static key	="dewd"


		constructor( dewd )
		{
			super( dewd )

			this.dir	??=rnd(6)
		}


		sim_rot( ddir )
		{
			return Loc.roth( this.dir, ddir )
		}


		activate( )
		{
			var cello	=map.obj.g(loc)

			var item	=cello.drop[this.gkey()]

			var actitem	=item.take()

			delete cello.drop[this.gkey()]

			/** @todo push remaining items out of cell *

			actitem.active	=true

			cello.block	=actitem
		}


		draw( can, loc, vbuf )
		{
			var ctx	=can.ctx

			ctx.save()

			vbuf.set(loc).tosqc(can)

			ctx.translate( vbuf.x, vbuf.y )

			ctx.rotate( -Loc.rad60 * (this.dir+1) )

			ctx.translate( -vbuf.x, -vbuf.y )
		
			can.drawimg( loc, can.imgs().o.dewd, 1, vbuf )

			ctx.restore()
		}
	}



	t.Seedbag	=class extends Bag
	{
		static vol	=Math.floor(40*25*20/125)
	
		static boxvol	=Math.floor(55*45*45/125)

		static key	="seedbag"
	}



	t.Multi	=class extends Stack
	{
		static key	="multi"
	}


	t.CucumberSeed	=class extends Stack
	{
		static vol	=1

		static key	="cucumber_seeds"
	}

	///////////////////////////////////////////////////////////////////////////////


export default t*/