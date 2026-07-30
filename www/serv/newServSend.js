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
		// if( loc.eqxy( 49 ,13 ))	debugger

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


	/** @arg item - is optional */

	em_rotitem( loc ,dir ,item )
	{
		item	??=this.cl.maps.gitem( loc )

		return [[ loc ,item.sim_rot( dir ) ,item.gkey() ]]
	}



	em_movitem( from ,item ,len ,to )
	{
		// console.log( JSON.stringify([ navfrom, item, navto ]))

		const msg	=
		{
			from
			,
			key	:item.gkey()
			,
			len$id	:item.iscnt	? item.id :

				item.isstck	? ( len>0 ? len : item.len ) :
			
					console.error( "em_movitem" ,from ,item ,to )
			,
			to
		}
		if( ! msg.len$id )	return []

		return [[msg], ( key ,val )=>
			{
				switch( key )
				{
					case "from" :

					case "to" :

						const len	=val.length

						for(var i =0;i<len;i++)
						{
							val[i]	=val[i].tonavmsg()
						}
				}
				return val
			}]
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