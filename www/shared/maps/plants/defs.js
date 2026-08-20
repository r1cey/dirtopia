/** How many minutes each growth tick */

const tick	=15

const day	=Math.round((60/ tick )*24 )

const week	=Math.round((60/ tick )*24*7 )

/** Max ticks is 7 bits for time property and 5 bits for age property */

const max	=(1<<7) + (1<<5) - 1


/**
 * @prop {obj} sprout	-What conditions are ideal for sprouting.
 * Each property is an array of [lvl, importance/5] values.
 * @prop {[]} sprout.texture	-Combination of texture and structure to break through the ground.
 * @prop {[]} growth	-[ baby ,kid ,teen ,mature ,old ,dead ]
 * @prop {"grass"|"medium"|"shrub"|"tree"} sz	-Size of plant. Used for collision detection.
 * @prop {num} fruits	-How many ticks for each fruit to appear. */

export default{

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
	umrtr	:
	{
		/** @todo Look up how much did chatgpt say it takes for the tree to grow? */

		growth	:[ 5*day ,week+2*day ,2*week+2*day ,3*week ,max ,week ]
		,
		sz	:"tree"
	}
}