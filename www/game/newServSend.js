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



	em_movitem( navfrom ,item ,len ,navto )
	{
		// console.log( JSON.stringify([ navfrom, item, navto ]))

		const len$id	=item.iscnt	? item.id :

			item.isstck	? item.len :
			
				console.error("em_movitem",navfrom,item,navto)

		if( ! len$id )	return []

		return [[ navfrom, item.gkey(), len$id ,navto ]]
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