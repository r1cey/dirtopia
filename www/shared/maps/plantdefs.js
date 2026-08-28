/** How many minutes each growth tick */
const tick	=11.25

const day	=Math.round((60/ tick )*24 )

const week	=Math.round((60/ tick )*24*7 )

/** Atm can't get bit value directly from Ground's bmap
 * because of circular dependency. Maybe later create a separate
 * file for bmaps */
const max	=(1<<12) - 1

/**  */


/**
 * @prop {obj} sprout	-What conditions are ideal for sprouting.
 * Each property is an array of [lvl, importance/5] values.
 * @prop {[]} sprout.texture	-Combination of texture and structure
 * 	to break through the ground.
 * @prop {[]} growth	-[ baby ,kid ,teen ,mature ,old ,dead ]
 * 	User defines first how many ticks each stage takes and then the module
 * 	automatically changes values to the sums.
 * @prop {"grass"|"medium"|"shrub"|"tree"} sz	-Size of plant. Used for
 * 	collision detection.
 * @prop {num} fruits	-How many ticks for each fruit to appear.
 * @prop {bool}	isimmort	-If true, plant will never die of old age.
 * 	Means mature and old stage ages are irrelevant.
 * @prop {num}	br_pulse	-For trees. How many ticks to grow a branch
 * 	on an adult tree. */

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


/** Doesn't check anything!! Barebone */

export function isbrgrow( ty ,age )
{
	const def	=defs[ty]

	const gr	=def.growth

	return Math.round( ( gr[5] -gr[4]) %def.br_pulse +gr[4]) ===age
}


export default defs


///////////////////////////////////////////////////////////////////////////////



for(const vegk in defs)
{
	const def	=defs[vegk]

	if( def.growth)
	{
		let sum	=0

		def.growth.forEach(( val ,i ,arr)=>
		{
			sum =val +sum

			arr[i]	=/*Math.round*/( sum)
		})
	}
}
