import{ arsum }	from "../utils.js"



/***************************
 * In this file designer makes the initial defs object
 * and then proper classes are created for each plant type and
 * reinserted into the defs object.
 * Then defs is exported as default.
 * ********************************************** */



/** How many minutes each growth tick */
const tick	=11.25

const day	=Math.round((60/ tick )*24 )

const week	=Math.round((60/ tick )*24*7 )

/** Atm can't get bit value directly from Ground's bmap
 * because of circular dependency. Maybe later create a separate
 * file for bmaps */
const max	=(1<<12) - 1



const defs	={

	cucumber	:
	{
		sprout	:
		{
			temp	:[ 0 ,4 ]
			,
			water	:[ 12 ,4 ]
			,
			oxy	:[ 11 ,4 ]
			,
			ph	:[ 1 ,2 ]
			,
			texture	:[ 2 ,2 ]
		},
		growth	:[ 1 ,1 ,1 ,1 ,week ,2*day ]
		,
		sz	:"medium"
		,
		fruits	:1
	},
	umbrtr	:
	{
		/** @todo Look up how much did chatgpt say it takes for the tree to grow? */

		growth	:[ 1.5*day ,2*day ,5*day ,6*day ,max-(17*day) ,2.5*day ]
		,
		sz	:"tree"
		,
		br_pulse	:( max -17*day) /32
	},
	sanped	:
	{
		growth	:[ 1.5*day ,3.5*day ,5*day ,8*day ]
		,
		sz	:"shrub"
		,
		isimmort	:true
	}
}


///////////////////////////////////////////////////////////////////////////////



class VegDef
{
	/** What conditions are ideal for sprouting.
 	 * Each property is an array of [lvl, importance/5] values. */
	sprout	=
	{
		temp	:[,]
		,
		water	:[,]
		,
		oxy	:[,]
		,
		ph	:[,]
		,
		/** Combination of texture and structure to break through the ground.*/
		texture	:[,]
	}

	/** [ baby ,kid ,teen ,mature ,old ,dead ]
	 * 	How many ticks does it take to reach the next stage. */
	growth	=[]

	/** Size of plant. Used for	collision detection.
 	 * @prop {"grass"|"medium"|"shrub"|"tree"} */
	sz
	
	/**  How many ticks for each fruit (or seed?) to appear */
	fruits	=0

	/** If true, plant will never die of old age.
	 * 	Means mature and old stage ages are irrelevant. */
	isimmort	=false


	///////////////////////////////////////////////////////////////////////////


	/** @todo Maybe this is slow? */

	set( def)
	{
		Object.assign( this ,def)
	}


	///////////////////////////////////////////////////////////////////////////


	/** Age to death */

	max()
	{
		return this.st2age( this.growth.length)
	}


	getstage( curage)
	{
		const stages	=this.growth

		var age =0

		for(var i=0,len= stages.length ;i<len;i++)
		{
			age	+=stages[i]

			if( age >curage)	return i
		}
		return i
	}


	/** Stage to age
	 * @todo Maybe remove math.round to save on time? */

	st2age( stage)
	{
		return Math.round( arsum( this.growth ,0 ,stage))
	}
}



class Tree	extends VegDef
{
	sz	="tree"

	/** For trees. How many ticks to grow a branch on an adult tree. */
	br_pulse	=0


	///////////////////////////////////////////////////////////////////////////


	/** How many branches can a tree spawn at most?
	 * NO ERROR CHECKING! */

	maxbrlvl()
	{
		const def	=this

		return Math.floor( def.growth[4] /def.br_pulse)
	}


	/** Gets age, and tells whether it's the time to spawn a branch.
	 * NO ERROR CHECKING! */

	isbrgrow( age)
	{
		const def	=this

		const gr	=def.growth

		return Math.round( gr[4] %def.br_pulse +def.st2age( 4)) ===age
	}


	/** How many times have the tree spawned a new branch?
	 * NO ERROR CHECKING!
	 * @todo Check if the tree is old? Old trees don't spawn new branches. */

	getbrlvl( age)
	{
		const def	=this

		return Math.floor(( age -def.st2age( 4)) /def.br_pulse)
	}


	brlvl2age( brlvl)
	{
		const def	=this

		return Math.round( def.br_pulse *brlvl +def.st2age( 4))
	}
}


///////////////////////////////////////////////////////////////////////////////



for(const ty in defs)
{
	const def	=defs[ty]

	defs[ty]	=def.sz ==="tree"	?new Tree().set( def)	:new VegDef().set( def)
}


export default defs