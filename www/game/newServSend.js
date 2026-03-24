// import SG from './ServGet.js'


export default( Base )=>class SS extends Base
{
	constructor(...args)	{ super(...args) }


///////////////////////////////////////////////////////////////////////////////



	em_newplayer( o )
	{
		return[[ o ]]
	}


	///////////////////////////////////////////////////////////////////////////////



	em_mov( loc )
	{
		return[[ loc ]]
	}



	em_wrtc( o )
	{
		return[[ o ]]
	}




	em_climb( dir, loc )
	{
		return[[ dir, loc ]]
	}



	em_rotobj( loc ,dir ,obj )
	{
		return [[ loc, obj.sim_rot( dir ), obj.constructor.key ]]
	}



	em_movitem( navfrom ,item ,navto )
	{
		console.log( JSON.stringify([ navfrom, item, navto ]))

		return [[ navfrom, item, navto ]]
	}



	em_actonobj( path, act, params )
	{
		return[[ path, act, params ]]
	}
}


///////////////////////////////////////////////////////////////////////////////


/*
for(var funn in out)
{
	out["send_"+funn]	=out[funn]

	out["s_"+funn]	=out[funn]

	delete out[funn]
}*/